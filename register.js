import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
import app  from "./app.js"
const auth = getAuth(app);
const btnRegister = document.getElementById("btnRegister");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passField");
const passwordConfField = document.getElementById("passConfField");
const errTxt = document.getElementById("errorTxt");
btnRegister.addEventListener("click", (event) => {
    event.preventDefault();
    const email = emailField.value;
    const pass = passwordField.value;
    const passConf = passwordConfField.value;
    if(pass != passConf) {
        errTxt.innerHTML = "Password Doesn't Match";
        return;
    }
    errTxt.innerHTML = "";
    createUserWithEmailAndPassword(auth, email, pass).then((credential) => {
        sessionStorage.setItem("email",credential.user.email)
        sessionStorage.setItem("uid",credential.user.uid)
        window.location.pathname = "/";
    }).catch((error) => {
        console.log(error);
    })
});