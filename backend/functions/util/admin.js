const admin = require("firebase-admin");
const BusBoy = require("busboy");
const serviceAccount = require("../serviceAccountKey.json");
const config = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
});

const db = admin.firestore();

module.exports = { admin, BusBoy, db };
