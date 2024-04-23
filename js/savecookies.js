// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, set, ref, update, child, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
    var uid = user.uid;;

    const databaseRef = ref(database);
    get(child(databaseRef, "users/" + user.uid))
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
            const username_profile = usrs[8];
            const filename_profile = usrs[4];
            const id_profile = user.uid;
            const url_profile = usrs[7] //Lấy giá trị của urlavatar
                // console.log("UID:", uid);
                // console.log("Email:", email_profile);
                // console.log("Username:", username_profile);
                // console.log("Password:", password_profile);
                // console.log("Name:",hoten_profile);
            // console.log("Sdt:",sdt_profile);
            
    const values = {
        id_profile,
        email_profile,
        hoten_profile,
        password_profile,
        sdt_profile,
        username_profile,
        filename_profile,
        url_profile
        };

    Object.keys(values).forEach(key => {
        document.cookie = `${key}=${values[key]}`;
    });
            })          
    } else {
        // User is signed out
        window.location.replace("login.html")
    }
});
function UpdateURL() {
    function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

    // Sử dụng hàm để lấy giá trị từ cookies
    const uidProfile = getCookie("id_profile")
    const emailProfile = getCookie("email_profile");
    const hotenProfile = getCookie("hoten_profile");
    const passwordProfile = getCookie("password_profile");
    const sdtProfile = getCookie("sdt_profile");
    const usernameProfile = getCookie("username_profile");
    const filenameProfile = getCookie("filename_profile");
    const URLProfile = getCookie("url_profile");
    update(ref(database, "users/" + uidProfile), {
        urlavatar: URLProfile
    })

}

onAuthStateChanged(auth, (user) => {
    if (user) { 
        //Nếu hôatj động thì chạy funtion để lấy url avatar người dùng
        UpdateURL();
    } else {
        // User is signed out
        // window.location.replace("login.html")
    }
});