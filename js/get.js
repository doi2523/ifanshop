// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, set, ref, update, child, get, onChildAdded } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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

        const database = getDatabase();
        const uid = user.uid;

        const databaseRef = ref(database);
        const userRef = child(databaseRef, "users/" + uid);

        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();

                    const email = userData.email;
                    const password = userData.password;
                    const hoten = userData.hoten;
                    const username = userData.username;
                    const sdt = userData.sdt;
                    const last_login = userData.last_login;
                    const last_logout = userData.last_logout;
                    const nameavatar = userData.nameavatar;
                    const urlavatar = userData.urlavatar;
                    const uid_user = uid;

                    console.log("Email:", email);
                    console.log("Password:", password);
                    console.log("Họ tên:", hoten);
                    console.log("Số điện thoại:", sdt);
                    console.log("Last login:", last_login);
                    console.log("Last logout:", last_logout);
                    console.log("Tên avatar:", nameavatar);
                    console.log("URL avatar:", urlavatar);
                    console.log("UID:", uid_user);
                    console.log("Username:", username)
        const values = {
        uid_user,
        email,
        hoten,
        password,
        sdt,
        username,
        filename,
        url //8 giá trị
        };

    Object.keys(values).forEach(key => {
        document.cookie = `${key}=${values[key]}`;
    });
                } else {
                    console.log("Không tìm thấy dữ liệu cho người dùng có ID là", uid);
                }
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu người dùng: ", error);
            })



    }
});
function UpdateURL() {
    function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

    // Sử dụng hàm để lấy giá trị từ cookies
    const uidProfile = getCookie("uid_user")
    const emailProfile = getCookie("email");
    const hotenProfile = getCookie("hoten");
    const passwordProfile = getCookie("password");
    const sdtProfile = getCookie("sdt");
    const usernameProfile = getCookie("username");
    const filenameProfile = getCookie("filename");
    const URLProfile = getCookie("url");
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
        window.location.replace("login.html")
    }
});
UpdateURL();