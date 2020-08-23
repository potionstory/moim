const https = require("https");
const firebase = require("firebase");
const { uuid } = require("uuidv4");
const { admin, BusBoy, db } = require("../util/admin");
const config = require("../util/config");
const {
  validateSignUpData,
  validateSignInData,
  reduceUserDetails,
} = require("../util/validators");

function updateOrCreateUser(userId, displayName, photoURL) {
  const updateParams = {
    provider: "KAKAO",
    displayName: displayName,
  };
  if (displayName) {
    updateParams["displayName"] = displayName;
  }
  if (photoURL) {
    updateParams["photoURL"] = photoURL;
  }
  return admin
    .auth()
    .updateUser(userId, updateParams)
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        updateParams["uid"] = userId;
        return admin.auth().createUser(updateParams);
      }
      throw error;
    });
}

function createFirebaseToken(user) {
  const { id, nickname, userImageUrl } = user;

  const userId = `kakao:${id}`;

  if (!userId) {
    return res
      .status(404)
      .send({ message: "There was no user with the given access token." });
  }
  return updateOrCreateUser(userId, nickname, userImageUrl).then(
    (userRecord) => {
      const uid = userRecord.uid;

      return admin.auth().createCustomToken(uid, { provider: "KAKAO" });
    }
  );
}

exports.getFirebaseToken = (req, res) => {
  const token = req.body.token;
  const user = {
    id: req.body.id,
    nickname: req.body.nickname,
    userImageUrl: req.body.userImageUrl,
  };

  if (token) {
    createFirebaseToken(user).then((firebaseToken) => {
      res.send({ token: firebaseToken });
    });
  } else {
    return res
      .status(400)
      .send({ error: "There is no token." })
      .send({ message: "Access token is a required parameter." });
  }
};

// social signUp user
exports.socialSignUp = (req, res) => {
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

    storageFilepath = `user/${req.body.userName}/${uniqueName + fileext}`;
    storageFile = bucket.file(storageFilepath);

    file.pipe(storageFile.createWriteStream({ gzip: true, metadata }));
  });

  busboy.on("field", (fieldname, value) => {
    req.body[fieldname] = value;
  });

  busboy.on("finish", () => {
    req.files = files;

    const userImageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      config.storageBucket
    }/o/${encodeURIComponent(
      storageFilepath
    )}?alt=media&token=${generatedToken}`;

    const newSocialUser = {
      email: req.body.email,
      userName: req.body.userName,
      userImage:
        req.body.userImageFile !== "undefined"
          ? userImageUrl
          : req.body.userImageUrl,
      userId: req.body.userId,
      token: req.body.token,
    };

    db.doc(`/users/${newSocialUser.userName}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res
            .status(400)
            .json({ userName: "this user name is already taken" });
        } else {
          const userCredentials = {
            userId: newSocialUser.userId,
            email: newSocialUser.email,
            userName: newSocialUser.userName,
            userImagePath: storageFilepath,
            userImage: newSocialUser.userImage,
            createdAt: new Date().toISOString(),
          };
          return db
            .doc(`/users/${newSocialUser.userName}`)
            .set(userCredentials);
        }
      })
      .then(() => {
        const { userId, email } = newSocialUser;

        admin
          .auth()
          .getUser(userId)
          .then((userRecord) => {
            const user = userRecord.toJSON();

            if (user.email === undefined) {
              admin.auth().updateUser(userId, {
                email,
              });
            }
          });
        return res.status(201).json({ token: newSocialUser.token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res
            .statusMessage(400)
            .json({ email: "Email is already in use" });
        } else {
          return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
        }
      });
  });
  busboy.end(req.rawBody);
};

// signUp user
exports.signUp = (req, res) => {
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

    storageFilepath = `user/${req.body.userName}/${uniqueName + fileext}`;
    storageFile = bucket.file(storageFilepath);

    file.pipe(storageFile.createWriteStream({ gzip: true, metadata }));
  });

  busboy.on("field", (fieldname, value) => {
    req.body[fieldname] = value;
  });

  busboy.on("finish", () => {
    req.files = files;

    const userImage = `https://firebasestorage.googleapis.com/v0/b/${
      config.storageBucket
    }/o/${encodeURIComponent(
      storageFilepath
    )}?alt=media&token=${generatedToken}`;

    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      userName: req.body.userName,
    };

    const { valid, errors } = validateSignUpData(newUser);

    if (!valid) return res.status(400).json(errors);

    let token, userId;

    db.doc(`/users/${newUser.userName}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res
            .status(400)
            .json({ userName: "this user name is already taken" });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          userId,
          email: newUser.email,
          userName: newUser.userName,
          userImagePath: storageFilepath,
          userImage: req.body.userImageFile !== "undefined" ? userImage : null,
          createdAt: new Date().toISOString(),
        };
        return db.doc(`/users/${newUser.userName}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res
            .statusMessage(400)
            .json({ email: "Email is already in use" });
        } else {
          return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
        }
      });
  });

  busboy.end(req.rawBody);
};

// signIn user
exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateSignInData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      // auth/wrong-password
      // auth/user-not-user
      return res
        .status(403)
        .json({ general: "Wrong credentials, pleasw try again" });
    });
};

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.userName}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userName", "==", req.user.userName)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection("notifications")
        .where("recipient", "==", req.user.userName)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          communityId: doc.data().communityId,
          type: doc.data().type,
          read: doc.data().read,
          notifications: doc.id,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Add user details
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.userName}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.userName}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("communitys")
          .where("userName", "==", req.params.userName)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .then((data) => {
      userData.communitys = [];
      data.forEach((doc) => {
        userData.communitys.push({
          name: doc.data().name,
          url: doc.data().url,
          createdAt: doc.data().createdAt,
          userName: doc.data().userName,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          communityId: doc.id,
        });
      });
      return db
        .collection("meetings")
        .where("userName", "==", req.params.userName)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((data) => {
      userData.meetings = [];
      data.forEach((doc) => {
        userData.meetings.push({
          name: doc.data().name,
          url: doc.data().url,
          createdAt: doc.data().createdAt,
          userName: doc.data().userName,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          meetingId: doc.id,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Upload a profile image for user
exports.uploadImage = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not defined" });
  }

  let busboy = new BusBoy({ headers: req.headers }); // add {limits: {files: 1}} to limit to only a single file upload

  let bucket = admin.storage().bucket();
  let generatedToken = uuid();

  let storageFilepath;
  let storageFile;

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

    storageFilepath = `user/${req.user.userName}/${uniqueName + fileext}`;
    storageFile = bucket.file(storageFilepath);

    file.pipe(storageFile.createWriteStream({ gzip: true, metadata }));
  });

  busboy
    .on("finish", () => {
      if (!storageFile) {
        res.status(400).json({ error: "expected file" });
        return;
      }

      const userImage = `https://firebasestorage.googleapis.com/v0/b/${
        config.storageBucket
      }/o/${encodeURIComponent(
        storageFilepath
      )}?alt=media&token=${generatedToken}`;

      db.doc(`/users/${req.user.userName}`)
        .get()
        .then((doc) => {
          const deleteFilePath = doc.data().userImagePath;
          bucket.file(deleteFilePath).delete();
          db.doc(`/users/${req.user.userName}`)
            .update({ userImage, userImagePath: storageFilepath })
            .then(() => {
              res.status(201).json({ message: "Image uploaded successfully" }); // 201 CREATED
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.code }); // 500 INTERNAL_SERVER_ERROR
            });
        });
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });

  busboy.end(req.rawBody);
};

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: "Notifications marked read" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
