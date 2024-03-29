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
        if (!doc.data().isLock) {
          communitys.push({
            communityId: doc.id,
            type: doc.data().type,
            title: doc.data().title,
            isLock: doc.data().isLock,
            status: doc.data().status,
            mainImage: doc.data().mainImage,
            userAvatar: doc.data().userAvatar,
            description: doc.data().description,
            url: doc.data().url,
            tags: doc.data().tags,
            userId: doc.data().userId,
            userImage: doc.data().userImage,
            userName: doc.data().userName,
            createdAt: doc.data().createdAt,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount,
          });
        } else {
          communitys.push({
            communityId: doc.id,
            type: doc.data().type,
            title: doc.data().title,
            isLock: doc.data().isLock,
            status: doc.data().status,
            mainImage: doc.data().mainImage,
            userAvatar: doc.data().userAvatar,
            description: doc.data().description,
            tags: doc.data().tags,
            userId: doc.data().userId,
            userImage: doc.data().userImage,
            userName: doc.data().userName,
            createdAt: doc.data().createdAt,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount,
          });
        }
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

    storageFilepath = `${req.body.userName}/${uniqueName + fileext}`;
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
      isLock,
      passNumber,
      status,
      description,
      url,
      tags,
      userId,
      userImage,
      userAvatar,
      userName,
    } = req.body;

    const newCommunity = {
      type,
      title,
      isLock: JSON.parse(isLock),
      passNumber,
      status,
      imagePath: storageFilepath,
      mainImage,
      description,
      url,
      tags: JSON.parse(tags),
      userId,
      userImage: userImage !== "null" ? userImage : null,
      userAvatar: JSON.parse(userAvatar),
      userName,
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

      communityData = {
        communityId: doc.id,
        type: doc.data().type,
        title: doc.data().title,
        isLock: doc.data().isLock,
        passNumber: new Array(6).fill(""),
        status: doc.data().status,
        mainImage: doc.data().mainImage,
        description: doc.data().description,
        url: doc.data().url,
        tags: doc.data().tags,
        userId: doc.data().userId,
        userImage: doc.data().userImage,
        userAvatar: doc.data().userAvatar,
        userName: doc.data().userName,
        createdAt: doc.data().createdAt,
        likeCount: doc.data().likeCount,
        commentCount: doc.data().commentCount,
      };

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

// update community (thumbnail X)
exports.putCommunity = (req, res) => {
  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Method not defined" });
  }

  const { type, title, isLock, passNumber, status, description, url, tags } =
    req.body;

  db.doc(`/communitys/${req.params.communityId}`)
    .get()
    .then((doc) => {
      const originPassNumber = doc.data().passNumber;

      db.doc(`/communitys/${req.params.communityId}`)
        .update({
          type,
          title,
          isLock,
          passNumber:
            passNumber === undefined ? originPassNumber : passNumber.join(""),
          status,
          description,
          url,
          tags,
        })
        .then((doc) => {
          db.doc(`/communitys/${req.params.communityId}`)
            .get()
            .then((doc) => {
              let communityData = {};

              communityData = {
                communityId: doc.id,
                type: doc.data().type,
                title: doc.data().title,
                isLock: doc.data().isLock,
                passNumber: new Array(6).fill(""),
                status: doc.data().status,
                mainImage: doc.data().mainImage,
                description: doc.data().description,
                url: doc.data().url,
                tags: doc.data().tags,
                userId: doc.data().userId,
                userImage: doc.data().userImage,
                userAvatar: doc.data().userAvatar,
                userName: doc.data().userName,
                createdAt: doc.data().createdAt,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount,
              };

              return res.json(communityData);
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.code }); // 500 INTERNAL_SERVER_ERROR
        });
    });
};

// update community (thumbnail O)
exports.putCommunityThumb = (req, res) => {
  if (req.method !== "PUT") {
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

    storageFilepath = `${req.body.userName}/${uniqueName + fileext}`;
    storageFile = bucket.file(storageFilepath);

    file.pipe(storageFile.createWriteStream({ gzip: true, metadata }));
  });

  busboy.on("field", (fieldname, value) => {
    req.body[fieldname] = value;
  });

  busboy.on("finish", () => {
    req.files = files;

    const thumbImage = `https://firebasestorage.googleapis.com/v0/b/${
      config.storageBucket
    }/o/${encodeURIComponent(
      storageFilepath
    )}?alt=media&token=${generatedToken}`;

    const { type, title, isLock, passNumber, status, description, url, tags } =
      req.body;

    db.doc(`/communitys/${req.params.communityId}`)
      .get()
      .then((doc) => {
        const originPassNumber = doc.data().passNumber;
        const deleteFilePath = doc.data().imagePath;
        bucket.file(deleteFilePath).delete();

        db.doc(`/communitys/${req.params.communityId}`)
          .update({
            type,
            title,
            isLock: JSON.parse(isLock),
            passNumber:
              passNumber === undefined ? originPassNumber : passNumber,
            status,
            imagePath: storageFilepath,
            mainImage: thumbImage,
            description,
            url,
            tags: JSON.parse(tags),
          })
          .then((doc) => {
            db.doc(`/communitys/${req.params.communityId}`)
              .get()
              .then((doc) => {
                let communityData = {};

                communityData = {
                  communityId: doc.id,
                  type: doc.data().type,
                  title: doc.data().title,
                  isLock: doc.data().isLock,
                  passNumber: new Array(6).fill(""),
                  status: doc.data().status,
                  mainImage: doc.data().mainImage,
                  description: doc.data().description,
                  url: doc.data().url,
                  tags: doc.data().tags,
                  userId: doc.data().userId,
                  userImage: doc.data().userImage,
                  userAvatar: doc.data().userAvatar,
                  userName: doc.data().userName,
                  createdAt: doc.data().createdAt,
                  likeCount: doc.data().likeCount,
                  commentCount: doc.data().commentCount,
                };

                return res.json(communityData);
              });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code }); // 500 INTERNAL_SERVER_ERROR
          });
      });
  });

  busboy.end(req.rawBody);
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

exports.postCommunityPassNumber = (req, res) => {
  const { passNumber } = req.body;

  db.doc(`/communitys/${req.params.communityId}`)
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
