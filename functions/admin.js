const admin = require('firebase-admin');
const serviceAccount = require("./permission.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mt-test-42640.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db };