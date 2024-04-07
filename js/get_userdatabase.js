  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, ref, child, onValue, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth();

    var stdNo =0;
    var tbody = document.getElementById('tbody1')
    function AddItemToTable(username, email, passwd){
        let trow = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        td1.innerHTML=++stdNo;
        td2.innerHTML= username;
        td3.innerHTML= email;
        td4.innerHTML= passwd;
        td5.innerHTML = '<button onclick="edit()">Sửa</button><button onclick="del()">Xoá</button>';

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);

        tbody.appendChild(trow);
    }
    function AddAllItemToTable(UserList){
        stdNo=0;
        tbody.innerHTML="";
        UserList.forEach(element => {
            AddItemToTable(element.username,element.email,element.password)
        });
    };

    function GetAllDataOnce(){
        const databaseRef = ref (database);

        get(child(databaseRef, "users"))
        .then((snapshot)=>{
            var usrs = [];

            snapshot.forEach(childSnapshot => {
                usrs.push(childSnapshot.val());
            });

            AddAllItemToTable(usrs);
        })
    }
    window.onload = GetAllDataOnce;