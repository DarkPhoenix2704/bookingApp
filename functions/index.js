const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = admin.initializeApp();
const realtime = app.database();

module.exports.onNewUser = functions.auth.user().onCreate((userData) => {
    const uid = userData.uid;
    const usersRef = realtime.ref("/users");
    const user = {};
    user[uid] = {
        email:userData.email,
        balance:100
    }
    usersRef.set(user);
})
module.exports.onDeleteUser = functions.auth.user().onDelete((user) => {
    realtime.ref(`/users/${user.uid}`).remove();
})