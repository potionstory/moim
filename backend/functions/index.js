const firebase = require("firebase");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");
const config = require("./util/config");

firebase.initializeApp(config);

const app = express();

const {
  getAllCommunitys,
  postCommunity,
  getCommunity,
  deleteCommunity,
  likeCommunity,
  unlikeCommunity,
  commentOnCommunity,
} = require("./routes/communitys");

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

// communitys routes
app.get("/communitys", getAllCommunitys);
app.post("/community", FBAuth, postCommunity);
app.get("/community/:communityId", getCommunity);
app.delete("/community/:communityId", FBAuth, deleteCommunity);
app.get("/community/:communityId/like", FBAuth, likeCommunity);
app.get("/community/:communityId/unlike", FBAuth, unlikeCommunity);
app.post("/community/:communityId/comment", FBAuth, commentOnCommunity);

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
      .doc(`/communitys/${snapshot.data().communityId}`)
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
            communityId: doc.id,
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
      .doc(`/communitys/${snapshot.data().communityId}`)
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
            communityId: doc.id,
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
        .collection("communitys")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const community = db.doc(`communitys/${doc.id}`);
            batch.update(community, {
              userImage: change.after.data().userImageUrl,
            });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onCommunityDelete = functions.firestore
  .document("/communitys/{communityId}")
  .onDelete((snapshot, context) => {
    const communityId = context.params.communityId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("communityId", "==", communityId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db
          .collection("likes")
          .where("communityId", "==", communityId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("communityId", "==", communityId)
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
