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
  putCommunity,
  deleteCommunity,
  putCommunityPassnumber,
  likeCommunity,
  unlikeCommunity,
  commentOnCommunity,
} = require("./routes/communitys");

const {
  getAllMeetings,
  postMeeting,
  getMeeting,
  putMeeting,
  deleteMeeting,
  postMeetingJoin,
  postMeetingExit,
  putMeetingPassnumber,
  putPaymentCheck,
  putStaffCheck,
  likeMeeting,
  unlikeMeeting,
  commentOnMeeting,
} = require("./routes/meetings");

const {
  getFirebaseToken,
  socialSignUp,
  signUp,
  signIn,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./routes/users");

// cors
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Hello from Firebase!");
});

// communitys routes
app.get("/communitys", getAllCommunitys);
app.post("/community", FBAuth, postCommunity);
app.get("/community/:communityId", getCommunity);
app.put("/community/:communityId", FBAuth, putCommunity);
app.delete("/community/:communityId", FBAuth, deleteCommunity);
app.delete("/community/:communityId", FBAuth, deleteCommunity);
app.put("/community/passnumber/:communityId", FBAuth, putCommunityPassnumber);
app.get("/community/:communityId/like", FBAuth, likeCommunity);
app.get("/community/:communityId/unlike", FBAuth, unlikeCommunity);
app.post("/community/:communityId/comment", FBAuth, commentOnCommunity);

// meetings routes
app.get("/meetings", getAllMeetings);
app.post("/meeting", FBAuth, postMeeting);
app.get("/meeting/:meetingId", getMeeting);
app.put("/meeting/:meetingId", FBAuth, putMeeting);
app.delete("/meeting/:meetingId", FBAuth, deleteMeeting);
app.put("/meeting/:meetingId/join", postMeetingJoin);
app.put("/meeting/:meetingId/exit", postMeetingExit);
app.put("/meeting/passnumber/:meetingId", FBAuth, putMeetingPassnumber);
app.put("/meeting/paymentCheck/:meetingId", putPaymentCheck);
app.put("/meeting/staffCheck/:meetingId", putStaffCheck);
app.get("/meeting/:meetingId/like", FBAuth, likeMeeting);
app.get("/meeting/:meetingId/unlike", FBAuth, unlikeMeeting);
app.post("/meeting/:meetingId/comment", FBAuth, commentOnMeeting);

// users routes
app.post("/firebase-token", getFirebaseToken);
app.post("/social-signup", socialSignUp);
app.post("/signup", signUp);
app.post("/signin", signIn);
app.get("/user", FBAuth, getAuthenticatedUser);
app.post("/user", FBAuth, addUserDetails);
app.post("/user/image", FBAuth, uploadImage);
app.get("/user/:userName", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createCommunityNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/communitys/${snapshot.data().communityId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userName,
            sender: snapshot.data().userName,
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

exports.createMeetingNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/meetings/${snapshot.data().meetingId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userName,
            sender: snapshot.data().userName,
            type: "like",
            read: false,
            meetingId: doc.id,
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

exports.createCommunityNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/communitys/${snapshot.data().communityId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userName,
            sender: snapshot.data().userName,
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

exports.createMeetingNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/meetings/${snapshot.data().meetingId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userName,
            sender: snapshot.data().userName,
            type: "comment",
            read: false,
            meetingId: doc.id,
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
    if (change.before.data().userImage !== change.after.data().userImage) {
      const batch = db.batch();
      return db
        .collection("communitys")
        .where("userName", "==", change.before.data().userName)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const community = db.doc(`communitys/${doc.id}`);
            batch.update(community, {
              userImage: change.after.data().userImage,
            });
          });
          return db
            .collection("meetings")
            .where("userName", "==", change.before.data().userName)
            .get()
            .then((data) => {
              data.forEach((doc) => {
                const meetings = db.doc(`meetings/${doc.id}`);
                batch.update(meetings, {
                  userImage: change.after.data().userImage,
                });
              });
              return batch.commit();
            });
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

exports.onMeetingDelete = functions.firestore
  .document("/meetings/{meetingId}")
  .onDelete((snapshot, context) => {
    const meetingId = context.params.meetingId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("meetingId", "==", meetingId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("meetingId", "==", meetingId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("meetingId", "==", meetingId)
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
