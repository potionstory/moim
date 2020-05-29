const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const app = express();

const {
  getAllOnlines,
  postOnline,
  getOnline,
  deleteOnline,
  likeOnline,
  unlikeOnline,
  commentOnOnline,
} = require("./routes/onlines");

const {
  signup,
  signin,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./routes/users");

// cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Firebase!");
});

// onlines routes
app.get("/onlines", getAllOnlines);
app.post("/online", FBAuth, postOnline);
app.get("/online/:onlineId", getOnline);
app.delete("/online/:onlineId", FBAuth, deleteOnline);
app.get("/online/:onlineId/like", FBAuth, likeOnline);
app.get("/online/:onlineId/unlike", FBAuth, unlikeOnline);
app.post("/online/:onlineId/comment", FBAuth, commentOnOnline);

// users routes
app.post("/signup", signup);
app.post("/signin", signin);
app.get("/user", FBAuth, getAuthenticatedUser);
app.post("/user", FBAuth, addUserDetails);
app.post("/user/image", FBAuth, uploadImage);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/onlines/${snapshot.data().onlineId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            onlineId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.deleteNotificationOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/onlines/${snapshot.data().onlineId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            onlineId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.onUserImageChange = functions.firestore
  .document("/users/{userId}")
  .onUpdate((change) => {
    if (
      change.before.data().userImageUrl !== change.after.data().userImageUrl
    ) {
      console.log("image has changed");
      const batch = db.batch();
      return db
        .collection("onlines")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const online = db.doc(`onlines/${doc.id}`);
            batch.update(online, {
              userImage: change.after.data().userImageUrl,
            });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onOnlineDelete = functions.firestore
  .document("/onlines/{onlineId}")
  .onDelete((snapshot, context) => {
    const onlineId = context.params.onlineId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("onlineId", "==", onlineId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("onlineId", "==", onlineId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("onlineId", "==", onlineId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
