import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

import app  from "./app.js"
const auth = getAuth(app);
const database = getDatabase(app);
const userName = document.getElementById("userName");
const balance = document.getElementById("balance");
const balanceInput = document.getElementById("balanceInput");
const btnUpdate = document.getElementById("btnUpdateBalance");
const btnBookTicket = document.getElementById("btnBookTicket");
const sourceSelect = document.getElementById("sourceSelect");
const destSelect = document.getElementById("destSelect");
const dateSelect = document.getElementById("dateSelect");
const Useruid = sessionStorage.getItem("uid");
const errText = document.getElementById("errorTxt");
userName.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("uid");
    window.location.pathname = "/login";
})
userName.innerHTML = sessionStorage.getItem("email");
const userRef = ref(database, "users/" + sessionStorage.getItem("uid") + "/balance");
onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    balance.innerHTML = data 
})
btnUpdate.addEventListener("click", (event) => {
    event.preventDefault();
    updateBalance(balanceInput.value);
})
btnBookTicket.addEventListener("click", (event) => {
    event.preventDefault();
    const currBal = balance.innerHTML
    console.log(currBal);
    if( currBal < 50 ) {
        errText.innerHTML = "Insufffiient Balance";
        return;
    }
    errText.innerHTML = ""
    updateBalance(currBal - 50)
    const source = sourceSelect.value;
    const dest = destSelect.value;
    const date = dateSelect.value;
    const tickets = {};
    const uuid = self.crypto.randomUUID();
    tickets[`/tickets/${uuid}`] = {
        date:date,
        source: source,
        dest: dest,
        person: Useruid
    }
    update(ref(database), tickets);
})

function updateBalance(balance) {
    const updates = {};
    updates[`/users/${sessionStorage.getItem("uid")}/balance`] = parseInt(balance);
    update(ref(database), updates);
}
function getTickets() {
    const ticketRef = ref(`/users/${Useruid}/tickets`);
    onValue(ticketRef, (snapshot) => {
        console.log(snapshot.val());
    })
}
getTickets();