const { v4 } = require("uuid");
const { admin, BusBoy, db } = require("../util/admin");
const config = require("../util/config");

// get all communitys
exports.getAllCommunitys = (req, res) => {
  db.collection("communitys")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let communitys = [];
      data.forEach((doc) => {
        communitys.push({
          communityId: doc.id,
          type: doc.data().type,
          title: doc.data().title,
          status: doc.data().status,
          mainImage: doc.data().mainImage,
          description: doc.data().description,
          url: doc.data().url,
          tags: doc.data().tags,
          userImage: doc.data().userImage,
          userName: doc.data().userName,
          createdAt: doc.data().createdAt,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
        });
      });
      return res.json(communitys);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// create one community
exports.postCommunity = (req, res) => {
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

    const newCommunity = {
      type: req.body.type,
      title: req.body.title,
      status: req.body.status,
      imagePath: `${req.user.userName}/`,
      mainImage,
      description: req.body.description,
      url: req.body.url,
      tags: req.body.tags,
      userImage: req.user.userImage,
      userName: req.user.userName,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
    };

    db.collection("communitys")
      .add(newCommunity)
      .then((doc) => {
        const resCommunity = newCommunity;
        resCommunity.communityId = doc.id;
        res.json(resCommunity);
      })
      .catch((err) => {
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
      });
  });

  busboy.end(req.rawBody);
};

// get one community
exports.getCommunity = (req, res) => {
  let communityData = {};
  db.doc(`/communitys/${req.params.communityId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Community not found" });
      }
      communityData = doc.data();
      communityData.communityId = doc.id;
      return db
        .collection("comments")
        .where("communityId", "==", req.params.communityId)
        .get();
    })
    .then((data) => {
      communityData.comments = [];
      data.forEach((doc) => {
        communityData.comments.push(doc.data());
      });
      return res.json(communityData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// update community
exports.putCommunity = (req, res) => {
  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Method not defined" });
  }

  const document = db.doc(`/communitys/${req.params.communityId}`);
  const { type, title, status, mainImage, description, url, tags } = req.body;

  document.get().then((doc) => {
    document
      .update({
        type,
        title,
        status,
        mainImage,
        description,
        url,
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

// delete one community
exports.deleteCommunity = (req, res) => {
  const document = db.doc(`/communitys/${req.params.communityId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Community not found" });
      }
      if (doc.data().userName !== req.user.userName) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Community deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// like one community
exports.likeCommunity = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userName)
    .where("communityId", "==", req.params.communityId)
    .limit(1);

  const communityDocument = db.doc(`/communitys/${req.params.communityId}`);

  let communityData;

  communityDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        communityData = doc.data();
        communityData.communityId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Community not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            communityId: req.params.communityId,
            userName: req.user.userName,
          })
          .then(() => {
            communityData.likeCount++;
            return communityDocument.update({
              likeCount: communityData.likeCount,
            });
          })
          .then(() => {
            return res.json(communityData);
          });
      } else {
        return res.status(400).json({ error: "Community already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// unlike one community
exports.unlikeCommunity = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userName)
    .where("communityId", "==", req.params.communityId)
    .limit(1);

  const communityDocument = db.doc(`/communitys/${req.params.communityId}`);

  let communityData;

  communityDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        communityData = doc.data();
        communityData.communityId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Community not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Community not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            communityData.likeCount--;
            return communityDocument.update({
              likeCount: communityData.likeCount,
            });
          })
          .then(() => {
            res.json(communityData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// comment one community
exports.commentOnCommunity = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Comment must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    communityId: req.params.communityId,
    userName: req.user.userName,
    userImage: req.user.userImage,
  };

  db.doc(`/communitys/${req.params.communityId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Community not found" });
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
