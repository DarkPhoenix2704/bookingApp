import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyBvebkGXgu9WQw63zt0CCeOJn3S4rcx5cE",
  authDomain: "bookingsite-a982c.firebaseapp.com",
  databaseURL: "https://bookingsite-a982c-default-rtdb.firebaseio.com",
  projectId: "bookingsite-a982c",
  storageBucket: "bookingsite-a982c.appspot.com",
  messagingSenderId: "880361418828",
  appId: "1:880361418828:web:d78e4618153ada88f504e9"
};
const app = initializeApp(firebaseConfig);
const userCred = sessionStorage.getItem("authId");
if(!userCred && window.location.pathname != "/login"){
    if (window.location.pathname === "/register") {
        console.log("Register Page");
    } else {
        //window.location.pathname = "/register";
    }
}

export default app;