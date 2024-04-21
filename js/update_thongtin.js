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
            //Gọi function để cập nhật cookies
            UpdateData();
        })
            
        .catch((error) => {
            alert("Đã xảy ra lỗi khi cập nhật thông tin: " + error.message);
        });
}
    
//Thêm function cập nhật cookies khi cập nhật thông tin mới
function UpdateData() {

    const user = auth.currentUser;
    const databaseRef = ref(database);

    get(child(databaseRef, "users/" + user.uid)) // Bạn cần thêm dấu "+" để nối chuỗi "users/" và user.uid
    .then((snapshot) => {
        var usrs = [];
        snapshot.forEach((childSnapshot) => {
            usrs.push(childSnapshot.val());
        });
            // console.log("User data:", usrs);
            const email_profile = usrs[0];
            const hoten_profile = usrs[1];
            const password_profile = usrs[5];
            const sdt_profile = usrs[6];
            const username_profile = usrs[8];
            const filename_profile = usrs[4];
            const id_profile = uid;
            const url_profile = usrs[7]
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
                    console.log(usrs)
            })
}
    
document.getElementById('update-profile').addEventListener('submit', function(event) {
    event.preventDefault();
    UpdateThongtin();
    UpdateURL();
});
function UpdateURL() {
    function getCookie(name) {
        const auth = getAuth();
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
    const URLProfile = getCookie("url");
        const user = auth.currentUser;
        const database = getDatabase(app);
    update(ref(database, "users/" + uidProfile), {
        urlavatar : URLProfile
        })
}

document.getElementById('file-input').addEventListener('change', function() {
        var fileInput = document.getElementById('file-input');
        var loadingBar = document.getElementById('loading-bar');
        var loadingProgress = document.getElementById('loading-progress');
        var fileNameLabel = document.getElementById('file-name');

        // Lấy tên của tập tin đã chọn
        var fileName = fileInput.files[0].name;
        // Hiển thị tên tập tin
        fileNameLabel.innerText = fileName;
        fileNameLabel.style.display = 'block';

        // Hiển thị thanh loading khi bắt đầu tải
        loadingBar.style.display = 'block';

        // Tạo một FormData để tải file
        var formData = new FormData();
        formData.append('file', fileInput.files[0]);

        // Xử lý việc tải file ở đây (ví dụ: sử dụng AJAX hoặc Fetch API)
        // Ví dụ: mô phỏng việc tải file trong 5 giây
        var progress = 0;
        var interval = setInterval(function() {
            progress += 10;
            loadingProgress.style.width = progress + '%';
            loadingProgress.innerHTML = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                // Giữ lại thanh loading ở trạng thái 100%
                setTimeout(function() {
                    loadingProgress.style.width = '100%';
                    loadingProgress.innerHTML = '100%';
                    // Hiển thị thông báo thành công
                    alert('Tải lên thành công!');
                    // Ẩn thanh loading
                    // loadingBar.style.display = 'none';
                    const auth = getAuth();
                    const user = auth.currentUser;
                    const uid = user.uid;
                    const database = getDatabase(app);
                    
                    // Lấy tham chiếu đến nút "label" trong HTML
                    const nameLabel = document.getElementById("name-avatar");
                    
                    // Function để cập nhật giao diện người dùng với thông tin mới
                    function updateLabel(newName) {
                        nameLabel.textContent = newName;
                    }
                    update(ref(database, "users/" + uid), {
                        nameavatar: fileName,
                    })
                    .then(() => {
                        // Sau khi cập nhật thành công, gọi hàm để cập nhật giao diện người dùng
                        updateLabel(fileName);
                    })
                    .catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                }, 500);
            }
        }, 500);

    });
