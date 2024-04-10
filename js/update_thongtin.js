// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, set, ref, update, child, get, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
    const user = auth.currentUser;
    
    document.getElementById('update-profile').addEventListener('submit', function(event) {
        event.preventDefault();
        UpdateThongtin();
    });

    function UpdateThongtin(){
        var newhoten = document.getElementById('hoten').value;
        var newsdt = document.getElementById('sdt').value;
        var newusername = document.getElementById('username').value;
        var newemail = document.getElementById('email').value;
        var newpassword = document.getElementById('password').value;
    
        // In thông tin lấy được ra console
        console.log('Họ và tên:', newhoten);
        console.log('Số điện thoại:', newsdt);
        console.log('Username:', newusername);
        console.log('Email:', newemail);
        console.log('Password:', newpassword);

        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid;
        const database = getDatabase(app);
        update(ref(database, "users/" + uid), {
            username: newusername,
            hoten: newhoten,
            email: newemail,
            sdt: newsdt,
            password: newpassword
        })
        .then(() => {
            alert("Thông tin đã được cập nhật thành công!");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        .catch((error) => {
            alert("Đã xảy ra lỗi khi cập nhật thông tin: " + error.message);
        });
    }