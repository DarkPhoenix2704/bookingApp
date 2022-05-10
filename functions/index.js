const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = admin.initializeApp();
const realtime = app.database();

module.exports.onNewUser = functions.auth.user().onCreate((userData) => {
    const uid = userData.uid;
    const user = {
        email:userData.email,
        balance:100
    }
    realtime.ref(`/users/${uid}`).update(user);
})
module.exports.onDeleteUser = functions.auth.user().onDelete((user) => {
    realtime.ref(`/users/${user.uid}`).remove();
})
module.exports.onTicketBooked = functions.database.ref("/tickets/{ticketId}").onCreate((snapshot, context)=> {
    const { person, dest, date, source } = snapshot.val();
    const tickets = {
        date: date,
        source: source,
        dest: dest,
        person: person
    }
    realtime.ref(`/users/${person}/tickets/${context.params.ticketId}`).update(tickets);
});