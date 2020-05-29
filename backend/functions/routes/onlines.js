const { db } = require("../util/admin");

exports.getAllOnlines = (req, res) => {
  db.collection("onlines")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let onlines = [];
      data.forEach((doc) => {
        onlines.push({
          onlineId: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          userImage: doc.data().userImage,
        });
      });
      return res.json(onlines);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postOnline = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not defined" });
  }

  const newOnline = {
    name: req.body.name,
    url: req.body.url,
    userHandle: req.user.handle,
    userImage: req.user.userImageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("onlines")
    .add(newOnline)
    .then((doc) => {
      const resOnline = newOnline;
      resOnline.onlineId = doc.id;
      res.json(resOnline);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

// Fetch one online
exports.getOnline = (req, res) => {
  let onlineData = {};
  db.doc(`/onlines/${req.params.onlineId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Online not found" });
      }
      onlineData = doc.data();
      onlineData.onlineId = doc.id;
      return db
        .collection("comments")
        .where("onlineId", "==", req.params.onlineId)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((data) => {
      onlineData.comments = [];
      data.forEach((doc) => {
        onlineData.comments.push(doc.data());
      });
      return res.json(onlineData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteOnline = (req, res) => {
  const document = db.doc(`/onlines/${req.params.onlineId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Online not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Online deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.likeOnline = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("onlineId", "==", req.params.onlineId)
    .limit(1);

  const onlineDocument = db.doc(`/onlines/${req.params.onlineId}`);

  let onlineData;

  onlineDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        onlineData = doc.data();
        onlineData.onlineId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Online not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            onlineId: req.params.onlineId,
            userHandle: req.user.handle,
          })
          .then(() => {
            onlineData.likeCount++;
            return onlineDocument.update({ likeCount: onlineData.likeCount });
          })
          .then(() => {
            return res.json(onlineData);
          });
      } else {
        return res.status(400).json({ error: "Online already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unlikeOnline = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("onlineId", "==", req.params.onlineId)
    .limit(1);

  const onlineDocument = db.doc(`/onlines/${req.params.onlineId}`);

  let onlineData;

  onlineDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        onlineData = doc.data();
        onlineData.onlineId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Online not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Online not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            onlineData.likeCount--;
            return onlineDocument.update({ likeCount: onlineData.likeCount });
          })
          .then(() => {
            res.json(onlineData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.commentOnOnline = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Comment must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    onlineId: req.params.onlineId,
    userHandle: req.user.handle,
    userImage: req.user.userImageUrl,
  };

  db.doc(`/onlines/${req.params.onlineId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Online not found" });
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
