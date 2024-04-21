  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, ref, child, onValue, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth();

var userList = document.getElementById('userList');

function AddItemToList(uid, hoten) {
    let listItem = document.createElement("li");
    listItem.textContent = `UID: ${uid}, Hoten: ${hoten}`;
    userList.appendChild(listItem);
}

function AddAllItemsToList(userData) {
    userData.forEach(user => {
        AddItemToList(user.uid, user.hoten);
    });
}

function GetAllDataOnce() {
    const databaseRef = ref(database);

    get(child(databaseRef, "users")).then((snapshot) => {
        const userData = [];
        snapshot.forEach((childSnapshot) => {
            const uid = childSnapshot.key;
            const hoten = childSnapshot.val().hoten; // Assuming "hoten" is a direct child of the snapshot
            userData.push({ uid, hoten });
        });
        console.log("All user data:", userData);
        AddAllItemsToList(userData);
    }).catch((error) => {
        console.error("Error fetching user data:", error);
    });
}

GetAllDataOnce();
