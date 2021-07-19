const { v4 } = require("uuid");
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
          isLock: doc.data().isLock,
          status: doc.data().status,
          payInfo: doc.data().payInfo,
          mainImage: doc.data().mainImage,
          description: doc.data().description,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          location: doc.data().location,
          memberSetting: doc.data().memberSetting,
          memberList: doc
            .data()
            .memberList.map(
              ({ email, mobile, passNumber, ...member }) => member
            ),
          waiter: doc.data().waiter,
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
  let generatedToken = v4();

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

    storageFilepath = `${req.user.userName}/${uniqueName + fileext}`;
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
      isLock: req.body.isLock,
      status: req.body.status,
      payInfo: req.body.payInfo,
      imagePath: `${req.user.userName}/`,
      mainImage,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      memberSetting: req.body.memberSetting,
      memberList: req.body.memberList,
      waiter: req.body.waiter,
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
        return res.json(resMeeting);
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

      meetingData = {
        meetingId: doc.id,
        type: doc.data().type,
        title: doc.data().title,
        isLock: doc.data().isLock,
        status: doc.data().status,
        payInfo: doc.data().payInfo,
        mainImage: doc.data().mainImage,
        description: doc.data().description,
        startDate: doc.data().startDate,
        endDate: doc.data().endDate,
        location: doc.data().location,
        memberSetting: doc.data().memberSetting,
        memberList: doc
          .data()
          .memberList.map(({ email, mobile, passNumber, ...member }) => member),
        waiter: doc.data().waiter,
        tags: doc.data().tags,
        userId: doc.data().userId,
        userImage: doc.data().userImage,
        userName: doc.data().userName,
        createdAt: doc.data().createdAt,
        likeCount: doc.data().likeCount,
        commentCount: doc.data().commentCount,
      };

      return db
        .collection("comments")
        .where("meetingId", "==", req.params.meetingId)
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

  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Method not defined" });
  }

  const document = db.doc(`/meetings/${req.params.meetingId}`);
  const {
    type,
    title,
    isLock,
    status,
    payInfo,
    description,
    startDate,
    endDate,
    location,
    memberSetting,
    memberList,
    waiter,
    tags,
  } = req.body;

  document.get().then((doc) => {
    document
      .update({
        type,
        title,
        isLock,
        status,
        payInfo,
        description,
        startDate,
        endDate,
        location,
        memberSetting,
        memberList,
        waiter,
        tags,
      })
      .then((doc) => {
        document.get().then((doc) => {
          return res.status(200).json(doc.data()); // 201 CREATED
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code }); // 500 INTERNAL_SERVER_ERROR
      });
  });
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

// meeting join
exports.postMeetingJoin = (req, res) => {
  const { name, email, mobile, passNumber, userImage, userAvatar } = req.body;

  const newMember = {
    userId: v4(),
    userName: name,
    userImage,
    userAvatar,
    email,
    mobile,
    passNumber: passNumber.join(""),
    isPayment: false,
    isClient: false,
    isStaff: false,
    joindAt: new Date().toISOString(),
  };

  db.doc(`/meetings/${req.params.meetingId}`)
    .update({ memberList: admin.firestore.FieldValue.arrayUnion(newMember) })
    .then((data) => {
      db.doc(`/meetings/${req.params.meetingId}`)
        .get()
        .then((doc) => {
          const memberList = doc
            .data()
            .memberList.map(
              ({ email, mobile, passNumber, ...member }) => member
            );

          return res.json(memberList);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};

exports.postMeetingExit = (req, res) => {
  const { name, email, mobile, passNumber } = req.body;

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      const memberValid = {
        name: true,
        email: true,
        mobile: true,
        passNumber: true,
      };
      const memberList = doc.data().memberList;
      const memberIndex = memberList.findIndex(
        (member) => name === member.userName
      );

      if (memberIndex === -1) {
        memberValid.name = false;

        return res.status(403).json(memberValid);
      }

      db.doc(`/meetings/${req.params.meetingId}`)
        .update({
          memberList: memberList.filter(
            (member) =>
              !(
                member.userName === name &&
                member.passNumber === passNumber.join("")
              )
          ),
        })
        .then((data) => {
          db.doc(`/meetings/${req.params.meetingId}`)
            .get()
            .then((doc) => {
              const memberList = doc
                .data()
                .memberList.map(
                  ({ email, mobile, passNumber, ...member }) => member
                );

              return res.json(memberList);
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Something went wrong" });
        });
    });
};

exports.postMeetingPassNumber = (req, res) => {
  const { passNumber } = req.body;

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      if (doc.data().passNumber === passNumber.join("")) {
        res.json({ message: "pass number update successfully" });
      } else {
        res.status(403).json({ error: "Passnumber do not match" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};

exports.putMeetingPassNumber = (req, res) => {
  const { passNumber } = req.body;

  db.doc(`/meetings/${req.params.meetingId}`)
    .update({ passNumber: passNumber.join("") })
    .then(() => {
      res.json({ message: "pass number update successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};

// payment check
exports.putPaymentCheck = (req, res) => {
  const { userId } = req.body;

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      const memberList = doc.data().memberList;

      db.doc(`/meetings/${req.params.meetingId}`)
        .update({
          memberList: memberList.map((member) => {
            if (member.userId === userId) {
              member.isPayment = !member.isPayment;
            }

            return member;
          }),
        })
        .then((data) => {
          db.doc(`/meetings/${req.params.meetingId}`)
            .get()
            .then((doc) => {
              const memberList = doc
                .data()
                .memberList.map(
                  ({ email, mobile, passNumber, ...member }) => member
                );

              return res.json(memberList);
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Something went wrong" });
        });
    });
};

// staff check
exports.putStaffCheck = (req, res) => {
  const { userId } = req.body;

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      const memberList = doc.data().memberList;

      db.doc(`/meetings/${req.params.meetingId}`)
        .update({
          memberList: memberList.map((member) => {
            if (member.userId === userId) {
              member.isStaff = !member.isStaff;
            }

            return member;
          }),
        })
        .then((data) => {
          db.doc(`/meetings/${req.params.meetingId}`)
            .get()
            .then((doc) => {
              const memberList = doc
                .data()
                .memberList.map(
                  ({ email, mobile, passNumber, ...member }) => member
                );

              return res.json(memberList);
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Something went wrong" });
        });
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
            return res.json(meetingData);
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
      return res.json(newComment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};
