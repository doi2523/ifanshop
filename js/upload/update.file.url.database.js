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
    
  //Function lấy dữ liệu từ cookies
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
const avatarProfile = getCookie("url_profile");

function UpdateThongtin(){
        const auth = getAuth();
        const user = auth.currentUser;
        const database = getDatabase(app);
    update(ref(database, "users/" + uidProfile), {
            nameavatar: filenameProfile,
            urlavatar: avatarProfile
        })
        .then(() => {
            // alert("Thông tin đã được cập nhật thành công! Vui lòng tải lại trang");
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        })
            
        .catch((error) => {
            alert("Đã xảy ra lỗi khi cập nhật thông tin: " + error.message);
        });
}
// Gọi hàm GetURLAvatar() để nó chạy liên tục
UpdateThongtin(); // Thực hiện mỗi giây (có thể điều chỉnh thời gian theo nhu cầu của bạn)
