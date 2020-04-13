const functions = require('firebase-functions');
const express = require('express');
const app = express();
const { getAllUsers, addNewUser } = require('./controller');
const cors = require('cors');
app.use( cors({ origin: true }) );

/** API Routes */
app.get('/users', getAllUsers);
app.post('/users', addNewUser)

/** Export the Rest API to Firebase Cloud Functions  */
exports.app = functions.https.onRequest(app);