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
function SavaToCookies() {
    const user = auth.currentUser;
    const databaseRef = ref(database);
    const userRef = child(databaseRef, "users/" + user.uid);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();

                    const email_profile = userData.email;
                    const hoten_profile = userData.hoten;
                    const password_profile = userData.password;
                    const sdt_profile = userData.sdt;
                    const username_profile = userData.username;
                    const filename_profile = userData.nameavatar;
                    const id_profile = user.uid;
                    const url_profile = userData.urlavatar //Lấy giá trị của urlavatar
                    const last_login = userData.last_login;
                    const last_logout = userData.last_logout;


                    // console.log("Email:", email_profile);
                    // console.log("Password:", password_profile);
                    // console.log("Họ tên:", hoten_profile);
                    // console.log("Số điện thoại:", sdt_profile);
                    // console.log("Last login:", last_login);
                    // console.log("Last logout:", last_logout);
                    // console.log("Tên avatar:", filename_profile);
                    // console.log("URL avatar:", url_profile);
                    // console.log("UID:", id_profile);
                    // console.log("Username:", username_profile)

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
                } })  
}
function UpdateURL() {
    // Lấy giá trị URL mới từ cookie
    const newURL = getCookie("url");

    // Lấy giá trị URL cũ từ cookie hoặc từ dữ liệu hiện có trong ứng dụng của bạn
    // Đây chỉ là một ví dụ, bạn cần thay đổi phương thức này để phù hợp với ứng dụng của bạn
    const oldURL = "giá_trị_URL_cũ";

    // So sánh giá trị URL mới và cũ
    if (newURL !== oldURL) {
        // Nếu giá trị URL mới khác giá trị URL cũ, thực hiện cập nhật
        update(ref(database, "users/" + uidProfile), {
            urlavatar: newURL
        });
    } else {
        // Nếu giá trị URL mới giống với giá trị URL cũ, không cần thực hiện gì cả
        console.log("Giá trị URL không thay đổi.");
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) { 
        SavaToCookies();
        //Nếu hôatj động thì chạy funtion để lấy url avatar người dùng
        UpdateURL();
    } else {
        // User is signed out
        window.location.replace("login.html")
    }
});
UpdateURL();