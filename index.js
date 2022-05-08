import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

import app  from "./app.js"
const auth = getAuth(app);
const database = getDatabase(app);
const userName = document.getElementById("userName");
const balance = document.getElementById("balance");
const balanceInput = document.getElementById("balanceInput");
const btnUpdate = document.getElementById("btnUpdateBalance");
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
    balance.innerHTML = "Rs" + data 
})
btnUpdate.addEventListener("click", (event) => {
    event.preventDefault();
    const updates = {};
    updates[`/users/${sessionStorage.getItem("uid")}/balance`] = balanceInput.value;
    update(ref(database), updates);
})