// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref,push, onValue, get, child, update, onChildAdded } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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

// Đọc giá trị từ cookie
const userInfoStringFromCookie = Cookies.get('userInfo');
// Chuyển chuỗi JSON thành đối tượng JavaScript
if (userInfoStringFromCookie) {
  const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);

  const uidProfile = userInfoFromCookie.id_profile; // ID
  const emailProfile = userInfoFromCookie.email_profile; //Email
  const hotenProfile = userInfoFromCookie.hoten_profile; //Họ tên
  const passwordProfile = userInfoFromCookie.password_profile; //Password
  const sdtProfile = userInfoFromCookie.sdt_profile; //Số điện thoại
  const usernameProfile = userInfoFromCookie.username_profile; //Username
  const URLProfile = userInfoFromCookie.url_profile; //Link ảnh
  const RoleProfile = userInfoFromCookie.role; //Vai trò người dùng
  const Status = userInfoFromCookie.userstatus; //Trạng thái
  const TimeLogin = userInfoFromCookie.last_login; //Time đăng nhập
  const TimeLogout = userInfoFromCookie.last_logout; //Time đăng xuất

function GetData() {
    const database = getDatabase();
    const databaseRef = ref(database, "Rate");

    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef, (snapshot) => {
        const listdata = snapshot.val();
        displayMessage(listdata);
    }, (error) => {
        console.error("Error getting messageeveryone: ", error);
    });
}

function displayMessage(listdata) {
    const showdata = document.getElementById('show-rate');
    const div = document.createElement('div');

    div.innerHTML = `
    <fieldset class="border p-3 custom-fieldset">
    <legend class="custom-legend d-flex justify-content-between align-items-center">
        <div class="legend-content">
            <img src="${listdata.profile}" alt="UserImage" class="class-img-avt me-2">
            ${listdata.people}
        </div>
        <button id="delete-rate" class="btn btn-primary btn-sm delete-button ms-auto">
            <i class="fas fa-share-alt"></i> Share
        </button>
    </legend>
    <hr>
    <p class="mb-0 fs-6">${listdata.textarea}</p>
    <img src="${listdata.picture}" alt="UserImage" class="class-img-rate mt-3">
    <div class="mt-3" id="starContainer"></div>
    <div class="mt-3">
    <button class="btn btn-sm btn-primary me-2"><span id="total-like">77 </span><i class="fas fa-thumbs-up"></i> Like</button>
    <button class="btn btn-sm btn-danger me-2"><span id="total-dislike">1 </span><i class="fas fa-thumbs-down"></i> Dislike</button>
    <button class="btn btn-sm btn-secondary"><span id="total-comment">0 </span><i class="fas fa-comment"></i> Comment</button>
    <button class="btn btn-sm btn-primary"><i class="fas fa-flag"></i> Report</button>
</div>
</fieldset>
    <hr>
    `;

    showdata.appendChild(div);
    div.classList.add('message-item');
    // Lấy số sao từ dữ liệu
    const rating = listdata.star;
    // Kiểm tra nếu có số sao
    if (rating !== undefined) {
        // Lấy thẻ div có id là "starContainer"
        const starContainer = div.querySelector("#starContainer");
        // Tạo và chèn các thẻ sao vào trong thẻ div
        for (let i = 0; i < 5; i++) {
            const starElement = document.createElement("i");
            starElement.classList.add("fas", "fa-star", "text-warning");
            // Kiểm tra xem sao nào phải tối màu
            if (i >= rating) {
                starElement.classList.remove("fas");
                starElement.classList.add("far");
            }
            starContainer.appendChild(starElement);
        }
    }
}

GetData();
} else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}