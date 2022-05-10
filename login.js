import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
import app  from "./app.js"
const auth = getAuth(app);
const loginBtn = document.getElementById("btnLogin");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passField");
loginBtn.addEventListener("click",(event) => {
    event.preventDefault();
    const email = emailField.value;
    const password = passwordField.value;
    signInWithEmailAndPassword(auth,email,password).then((credential) => {
        sessionStorage.setItem("email",credential.user.email)
        sessionStorage.setItem("uid",credential.user.uid)
        window.location.pathname = "/";
    }).catch((error) => {
        console.log(error);
    })
})