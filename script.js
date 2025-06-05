// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDHe9tKr240kOwc7QEopo6S5lGlPC0yTBU",
  authDomain: "tamawahinp.firebaseapp.com",
  databaseURL: "https://tamawahinp-default-rtdb.firebaseio.com/",
  projectId: "tamawahinp",
  storageBucket: "tamawahinp.firebasestorage.app",
  messagingSenderId: "441379492772",
  appId: "1:441379492772:web:c0cbcd252a6a65e31ee731",
  measurementId: "G-QS7VVPHVX9"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

// DOM
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");

// Envoi de message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    push(messagesRef, {
      text: text,
      timestamp: Date.now()
    });
    input.value = "";
  }
});

// Réception des messages
onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  const msgEl = document.createElement("div");
  msgEl.textContent = msg.text;
  msgEl.className = "message";
  messagesDiv.appendChild(msgEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
