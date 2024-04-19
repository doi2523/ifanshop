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
    
    const deleteButton = document.getElementById('delete_acc');
//Gắn sự kiện cho nút xoá tài khoản và chạy function "ConfirmDelete "   
    deleteButton.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện click
        confirmDelete();
    });
//Hộp thoại xác nhận để xoá người dùng
function confirmDelete() {
    // Hiển thị hộp thoại xác nhận
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản không?")) {
        // Nếu người dùng nhấp vào OK, thực hiện xóa tài khoản
        deleteAccount();
    } else {
        // Nếu người dùng nhấp vào Cancel, không làm gì cả
        console.log("Người dùng đã hủy xóa tài khoản.");
    }
}
//Function xoá tài khoản khi người dùng đồng ý xoá tài khoản
function deleteAccount() {
    // Thực hiện xóa tài khoản
    console.log("Tài khoản đã được xóa!");

    const auth = getAuth();
    const user = auth.currentUser;

    var uid = user.uid;
    var email = user.email;

    deleteUser(user).then(() => {
        // User deleted.
        console.log("Tài khoản ")
    }).catch((error) => {
        // An error ocurred
        // ...
        console.log("error")
    });

    console.log(uid)
    remove(ref(database, "users/" + uid))
    .then(()=>{
        // alert("ok")
        alert("Đã xoá tài khoản " + email + " thành công!");
    })
    .catch((error)=>{
        // alert("no")
    })
}
