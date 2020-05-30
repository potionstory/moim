const { db } = require("../util/admin");

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
          name: doc.data().name,
          url: doc.data().url,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          userImage: doc.data().userImage,
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

  const newCommunity = {
    name: req.body.name,
    url: req.body.url,
    userHandle: req.user.handle,
    userImage: req.user.userImageUrl,
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
        .orderBy("createdAt", "desc")
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

// delete one community
exports.deleteCommunity = (req, res) => {
  const document = db.doc(`/communitys/${req.params.communityId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Community not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
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
    .where("userHandle", "==", req.user.handle)
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
            userHandle: req.user.handle,
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
    .where("userHandle", "==", req.user.handle)
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
    userHandle: req.user.handle,
    userImage: req.user.userImageUrl,
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
