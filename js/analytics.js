// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, set, ref, update, child, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCnZzlFSm-61oaNvO2TTJyef2PMc6iU8DY",
        authDomain: "user-inifanshop.firebaseapp.com",
        databaseURL: "https://user-inifanshop-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "user-inifanshop",
        storageBucket: "user-inifanshop.appspot.com",
        messagingSenderId: "104690936940",
        appId: "1:104690936940:web:5398fbb0edae0c7a76bc49",
        measurementId: "G-NLBDR28748"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
const auth = getAuth();
    const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');
const user = auth.currentUser;

console.log(analytics)
fetch('https://analytics.google.com/analytics/web/?authuser=0#/p434931265/reports/intelligenthome?params=_u..nav%3Dmaui')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(html => {
    document.getElementById('target-element').innerHTML = html;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
