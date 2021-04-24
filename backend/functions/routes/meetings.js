const { uuid } = require("uuidv4");
const { admin, BusBoy, db } = require("../util/admin");
const config = require("../util/config");

// get all meetings
exports.getAllMeetings = (req, res) => {
  db.collection("meetings")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let meetings = [];
      data.forEach((doc) => {
        meetings.push({
          meetingId: doc.id,
          type: doc.data().type,
          title: doc.data().title,
          status: doc.data().status,
          cost: doc.data().cost,
          mainImage: doc.data().mainImage,
          description: doc.data().description,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          location: doc.data().location,
          tags: doc.data().tags,
          userImage: doc.data().userImage,
          userName: doc.data().userName,
          createdAt: doc.data().createdAt,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
        });
      });
      return res.json(meetings);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// create one meeting
exports.postMeeting = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not defined" });
  }

  let busboy = new BusBoy({ headers: req.headers });

  let bucket = admin.storage().bucket();
  let generatedToken = uuid();

  let storageFilepath;
  let storageFile;

  let files = {};
  req.body = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }

    const metadata = {
      contentType: mimetype,
      metadata: {
        firebaseStorageDownloadTokens: generatedToken,
      },
    };
    let fileext = filename.match(/\.[0-9a-z]+$/i)[0];
    let uniqueName = admin.database().ref().push().key;

    storageFilepath = `meeting/${uniqueName + fileext}`;
    storageFile = bucket.file(storageFilepath);

    file.pipe(storageFile.createWriteStream({ gzip: true, metadata }));
  });

  busboy.on("field", (fieldname, value) => {
    req.body[fieldname] = value;
  });

  busboy.on("finish", () => {
    req.files = files;

    const mainImage = `https://firebasestorage.googleapis.com/v0/b/${
      config.storageBucket
    }/o/${encodeURIComponent(
      storageFilepath
    )}?alt=media&token=${generatedToken}`;

    const newMeeting = {
      type: req.body.type,
      title: req.body.title,
      status: req.body.status,
      cost: req.body.cost,
      mainImagePath: "meeting/",
      mainImage,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      tags: req.body.tags,
      userImage: req.user.userImage,
      userName: req.user.userName,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
    };

    db.collection("meetings")
      .add(newMeeting)
      .then((doc) => {
        const resMeeting = newMeeting;
        resMeeting.meetingId = doc.id;
        res.json(resMeeting);
      })
      .catch((err) => {
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
      });
  });

  busboy.end(req.rawBody);
};

// get one meeting
exports.getMeeting = (req, res) => {
  let meetingData = {};
  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Meeting not found" });
      }
      meetingData = doc.data();
      meetingData.meetingId = doc.id;
      return db
        .collection("comments")
        .where("meetingId", "==", req.params.meetingId)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((data) => {
      meetingData.comments = [];
      data.forEach((doc) => {
        meetingData.comments.push(doc.data());
      });
      return res.json(meetingData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// update meeting
exports.putMeeting = (req, res) => {
  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Method not defined" });
  }

  let busboy = new BusBoy({ headers: req.headers });

  let bucket = admin.storage().bucket();
  let generatedToken = uuid();

  let storageFilepath;
  let storageFile;

  let files = {};
  req.body = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    const metadata = {
      contentType: mimetype,
      metadata: {
        firebaseStorageDownloadTokens: generatedToken,
      },
    };
    let fileext = filename.match(/\.[0-9a-z]+$/i)[0];
    let uniqueName = admin.database().ref().push().key;

    storageFilepath = `meeting/${uniqueName + fileext}`;
    storageFile = bucket.file(storageFilepath);

    file.pipe(storageFile.createWriteStream({ gzip: true, metadata }));
  });

  busboy.on("field", (fieldname, value) => {
    req.body[fieldname] = value;
  });

  busboy.on("finish", () => {
    req.files = files;

    const mainImage = `https://firebasestorage.googleapis.com/v0/b/${
      config.storageBucket
    }/o/${encodeURIComponent(
      storageFilepath
    )}?alt=media&token=${generatedToken}`;

    const {
      type,
      title,
      status,
      cost,
      description,
      startDate,
      endDate,
      location,
      tags,
    } = req.body;

    db.doc(`/meetings/${req.params.meetingId}`)
      .get()
      .then((doc) => {
        const deleteFilePath = doc.data().mainImagePath;
        bucket.file(deleteFilePath).delete();
        db.doc(`/meetings/${req.params.meetingId}`)
          .update({
            type,
            title,
            status,
            cost,
            mainImagePath: storageFilepath,
            mainImage,
            description,
            startDate,
            endDate,
            location,
            tags,
          })
          .then(() => {
            res.status(201).json({ message: "meeting update successfully" }); // 201 CREATED
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code }); // 500 INTERNAL_SERVER_ERROR
          });
      });
  });

  busboy.end(req.rawBody);
};

// delete one meeting
exports.deleteMeeting = (req, res) => {
  const document = db.doc(`/meetings/${req.params.meetingId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Meeting not found" });
      }
      if (doc.data().userName !== req.user.userName) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Meeting deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// like one meeting
exports.likeMeeting = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userName)
    .where("meetingId", "==", req.params.meetingId)
    .limit(1);

  const meetingDocument = db.doc(`/meetings/${req.params.meetingId}`);

  let meetingData;

  meetingDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        meetingData = doc.data();
        meetingData.meetingId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Meeting not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            meetingId: req.params.meetingId,
            userName: req.user.userName,
          })
          .then(() => {
            meetingData.likeCount++;
            return meetingDocument.update({
              likeCount: meetingData.likeCount,
            });
          })
          .then(() => {
            return res.json(meetingData);
          });
      } else {
        return res.status(400).json({ error: "Meeting already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// unlike one meeting
exports.unlikeMeeting = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userName)
    .where("meetingId", "==", req.params.meetingId)
    .limit(1);

  const meetingDocument = db.doc(`/meetings/${req.params.meetingId}`);

  let meetingData;

  meetingDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        meetingData = doc.data();
        meetingData.meetingId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Meeting not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Meeting not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            meetingData.likeCount--;
            return meetingDocument.update({
              likeCount: meetingData.likeCount,
            });
          })
          .then(() => {
            res.json(meetingData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// comment one meeting
exports.commentOnMeeting = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Comment must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    meetingId: req.params.meetingId,
    userName: req.user.userName,
    userImage: req.user.userImage,
  };

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Meeting not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};
