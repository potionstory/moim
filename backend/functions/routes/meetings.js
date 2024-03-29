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
        if (!doc.data().isLock) {
          meetings.push({
            meetingId: doc.id,
            type: doc.data().type,
            title: doc.data().title,
            isLock: doc.data().isLock,
            payInfo: doc.data().payInfo,
            mainImage: doc.data().mainImage,
            description: doc.data().description,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            location: doc.data().location,
            memberNowCount:
              doc.data().memberList.length +
              (doc.data().memberSetting.isSelf ? 1 : 0),
            memberMaxCount: doc.data().memberSetting.count,
            tags: doc.data().tags,
            userId: doc.data().userId,
            userImage: doc.data().userImage,
            userAvatar: doc.data().userAvatar,
            userName: doc.data().userName,
            createdAt: doc.data().createdAt,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount,
          });
        } else {
          meetings.push({
            meetingId: doc.id,
            type: doc.data().type,
            title: doc.data().title,
            isLock: doc.data().isLock,
            payInfo: doc.data().payInfo,
            mainImage: doc.data().mainImage,
            description: doc.data().description,
            memberNowCount:
              doc.data().memberList.length +
              (doc.data().memberSetting.isSelf ? 1 : 0),
            memberMaxCount: doc.data().memberSetting.count,
            tags: doc.data().tags,
            userId: doc.data().userId,
            userImage: doc.data().userImage,
            userAvatar: doc.data().userAvatar,
            userName: doc.data().userName,
            createdAt: doc.data().createdAt,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount,
          });
        }
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
      description,
      payInfo,
      tags,
      startDate,
      endDate,
      location,
      memberSetting,
      userId,
      userImage,
      userAvatar,
      userName,
    } = req.body;

    const newMeeting = {
      type,
      title,
      isLock: JSON.parse(isLock),
      passNumber,
      payInfo: JSON.parse(payInfo),
      imagePath: storageFilepath,
      mainImage,
      description,
      tags: JSON.parse(tags),
      startDate: JSON.parse(startDate),
      endDate: JSON.parse(endDate),
      location: JSON.parse(location),
      memberSetting: JSON.parse(memberSetting),
      memberList: [],
      waiter: [],
      userId,
      userImage: userImage !== "null" ? userImage : null,
      userAvatar: JSON.parse(userAvatar),
      userName,
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

      meetingData = {
        meetingId: doc.id,
        type: doc.data().type,
        title: doc.data().title,
        isLock: doc.data().isLock,
        passNumber: new Array(6).fill(""),
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
        userAvatar: doc.data().userAvatar,
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

// update meeting (thumbnail X)
exports.putMeeting = (req, res) => {
  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Method not defined" });
  }

  const {
    type,
    title,
    isLock,
    passNumber,
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

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      const originPassNumber = doc.data().passNumber;

      db.doc(`/meetings/${req.params.meetingId}`)
        .update({
          type,
          title,
          isLock,
          passNumber:
            passNumber === undefined ? originPassNumber : passNumber.join(""),
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
          db.doc(`/meetings/${req.params.meetingId}`)
            .get()
            .then((doc) => {
              let meetingData = {};

              meetingData = {
                meetingId: doc.id,
                type: doc.data().type,
                title: doc.data().title,
                isLock: doc.data().isLock,
                passNumber: new Array(6).fill(""),
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
                userId: doc.data().userId,
                userImage: doc.data().userImage,
                userAvatar: doc.data().userAvatar,
                userName: doc.data().userName,
                createdAt: doc.data().createdAt,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount,
              };

              return res.json(meetingData);
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.code }); // 500 INTERNAL_SERVER_ERROR
        });
    });
};

// update meeting (thumbnail O)
exports.putMeetingThumb = (req, res) => {
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

    const {
      type,
      title,
      isLock,
      passNumber,
      payInfo,
      description,
      startDate,
      endDate,
      location,
      memberSetting,
      memberList,
      waiter,
      tags,
      mainImage,
    } = req.body;

    db.doc(`/meetings/${req.params.meetingId}`)
      .get()
      .then((doc) => {
        const originPassNumber = doc.data().passNumber;
        const deleteFilePath = doc.data().imagePath;
        bucket.file(deleteFilePath).delete();

        db.doc(`/meetings/${req.params.meetingId}`)
          .update({
            type,
            title,
            isLock: JSON.parse(isLock),
            passNumber:
              passNumber === undefined ? originPassNumber : passNumber,
            payInfo: JSON.parse(payInfo),
            imagePath: storageFilepath,
            mainImage: mainImage === undefined ? thumbImage : mainImage,
            description,
            startDate: JSON.parse(startDate),
            endDate: JSON.parse(endDate),
            location: JSON.parse(location),
            memberSetting: JSON.parse(memberSetting),
            memberList: JSON.parse(memberList),
            waiter: JSON.parse(waiter),
            tags: JSON.parse(tags),
          })
          .then((doc) => {
            db.doc(`/meetings/${req.params.meetingId}`)
              .get()
              .then((doc) => {
                let meetingData = {};

                meetingData = {
                  meetingId: doc.id,
                  type: doc.data().type,
                  title: doc.data().title,
                  isLock: doc.data().isLock,
                  passNumber: new Array(6).fill(""),
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
                  userId: doc.data().userId,
                  userImage: doc.data().userImage,
                  userAvatar: doc.data().userAvatar,
                  userName: doc.data().userName,
                  createdAt: doc.data().createdAt,
                  likeCount: doc.data().likeCount,
                  commentCount: doc.data().commentCount,
                };

                return res.json(meetingData);
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
  const { name, email, mobile, passNumber, userId, userImage, userAvatar } =
    req.body;

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      const memberList = doc.data().memberList;
      let emailIndex =
        memberList.findIndex((member) => email === member.email) || -1;
      let mobileIndex =
        memberList.findIndex((member) => mobile === member.mobile) || -1;

      if (emailIndex === -1 && mobileIndex === -1) {
        const newMember = {
          userId: userId || v4(),
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
          .update({
            memberList: admin.firestore.FieldValue.arrayUnion(newMember),
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
      } else {
        res.status(500).json({ error: "Something went wrong" });
      }
    });
};

exports.postMeetingExit = (req, res) => {
  const { name, email, mobile, passNumber } = req.body;

  db.doc(`/meetings/${req.params.meetingId}`)
    .get()
    .then((doc) => {
      const memberList = doc.data().memberList;
      const memberIndex = memberList.findIndex(
        (member) => name === member.userName
      );

      if (memberIndex === -1) {
        res.status(403).json({ error: "name does not exist" });
      }

      // email or mobile wrong
      if (email !== undefined && memberList[memberIndex].email !== email) {
        return res.status(404).json({ error: "email went wrong" });
      }
      if (mobile !== undefined && memberList[memberIndex].mobile !== mobile) {
        return res.status(404).json({ error: "mobile went wrong" });
      }

      // passNumber wrong
      if (passNumber.join("") !== memberList[memberIndex].passNumber) {
        return res.status(405).json({ error: "passNumber went wrong" });
      }

      db.doc(`/meetings/${req.params.meetingId}`)
        .update({
          memberList: memberList.filter((member) => member.userName !== name),
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
