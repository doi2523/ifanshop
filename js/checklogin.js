// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, set, ref, update, child, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, 
        createUserWithEmailAndPassword, 
        signOut, 
        signInWithEmailAndPassword, 
        onAuthStateChanged,
        updateEmail,
        reauthenticateWithCredential,
        sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
    const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // location.replace("auth.userpage.html")
        // ...
        // console.log(user)
        var uid = user.uid;
        // var email = user.email;
        // var username = user.username;

        const databaseRef = ref(database); // Bạn đã quên dấu "," ở giữa "users/" và "user.uid"
        
        get(child(databaseRef, "users/" + user.uid)) // Bạn cần thêm dấu "+" để nối chuỗi "users/" và user.uid
            .then((snapshot) => {
                var usrs = [];
                snapshot.forEach((childSnapshot) => {
                    usrs.push(childSnapshot.val());
                });
                console.log("User data:", usrs);

                const email_profile = usrs[0];
                const hoten_profile = usrs[1];
                const password_profile = usrs[5];
                const sdt_profile = usrs[6];
                const username_profile = usrs[7];
                const filename_profile = usrs[4];
                // console.log("UID:", uid);
                // console.log("Email:", email_profile);
                // console.log("Username:", username_profile);
                // console.log("Password:", password_profile);
                // console.log("Name:",hoten_profile);
                // console.log("Sdt:",sdt_profile);

                // Đẩy các giá trị vào các trường trong form
                document.getElementById("uid").value = uid;
                document.getElementById("username").value = username_profile;
                document.getElementById("email").value = email_profile;
                document.getElementById("password").value = password_profile;
                document.getElementById("hoten").value = hoten_profile;
                document.getElementById("sdt").value = sdt_profile;

                const usernameElement = document.getElementById('txt-username');
                usernameElement.textContent = "@"+username_profile;
                const filenameElement = document.getElementById('name-avatar');
                filenameElement.textContent = filename_profile;

                const uidd = document.getElementById('uid');
                const usernm = document.getElementById('username');
                const emaill = document.getElementById('email');
                const passwd = document.getElementById('password');
                const hotenn = document.getElementById('hoten');
                const sdtt = document.getElementById('sdt');
                // Gán giá trị cho phần tử
                uidd.textContent =uid;
                usernm.textContent= username_profile;
                emaill.textContent= email_profile;
                passwd.textContent= password_profile;
                hotenn.textContent= hoten_profile;
                sdtt.textContent= sdt_profile;
                
                  
                
                const updateButton = document.getElementById('xacminhemail');
                updateButton.addEventListener('click', function(event) {
                event.preventDefault();
                sendEmailVerification(auth.currentUser)
                .then(() => {
                  // Email verification sent!
                  // ...
                  alert("Một email xác minh đã được gửi");
                  const xacminh = document.getElementById('xacminhemail');
                  xacminh.textContent = "Đã gửi Email";
                  xacminh.style.backgroundColor = 'green';
                });             
            });
            })        
        
    } else {
        // User is signed out
        window.location.replace("login.html")
    }
});