
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref,push, onValue, get, child, update, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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

// Sử dụng các giá trị đã lấy được từ cookies
console.log(uidProfile)
console.log(emailProfile);
console.log(hotenProfile);
console.log(passwordProfile);
console.log(sdtProfile);
console.log(usernameProfile);
console.log(filenameProfile);
console.log(URLProfile)

function GetData() {
    const database = getDatabase();
    const databaseRef = ref(database, "Rate");

    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef, (snapshot) => {
        const listdata = snapshot.val();
        const key = snapshot.key;
        displayMessage(listdata, key);
    }, (error) => {
        console.error("Error getting messageeveryone: ", error);
    });
}

function displayMessage(listdata, key) {
    const showdata = document.getElementById('textchat-everyone');
    const div = document.createElement('div');
    // div.innerHTML = `<img src="${message.url}" alt="User Image" style="width: 50px; height: 50px; border-radius: 100%;"> ${message.name}: ${message.message} - ${message.time}`;
    div.innerHTML = `
    <fieldset class="border p-3 custom-fieldset">
    <legend class="custom-legend d-flex justify-content-between align-items-center">
        <div class="legend-content">
            <img src="${listdata.profile}" alt="UserImage" class="class-img-avt me-2">
            ${listdata.people}
        </div>
        <button id="delete-rate" class="btn btn-danger btn-sm delete-button ms-auto">
            <i class="fas fa-trash-alt"></i>
        </button>
    </legend>
    <hr>
    <p class="mb-0">${listdata.textarea}</p>
    <img src="${listdata.picture}" alt="UserImage" class="class-img-rate mt-3">
</fieldset>
    <hr>
    `
    showdata.appendChild(div);
        div.classList.add('message-item');
        // Loại bỏ phần cuộn mặc định
    // Thêm sự kiện cho nút xoá mới được tạo
    const deleteButton = div.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        // Lấy key của ô đó
        // const key = listdata.key;
        console.log('Key của ô đó:', key);
        confirmDelete(key);
        // Xử lý xoá ô dựa trên key
        // yourDeleteFunction(key);
    });
}
GetData();

// Hàm xác nhận xoá sản phẩm
function confirmDelete(key) {
    let confirmation = window.confirm("Bạn có chắc chắn muốn xoá đánh giá này?");
    if (confirmation) {
      deleteProduct(key); // Nếu chọn "OK", gọi hàm để xoá sản phẩm
    } else {
      console.log("Người dùng đã hủy bỏ thao tác xoá sản phẩm."); // Nếu chọn "Cancel", không làm gì cả
    }
  }
  
  // Hàm xoá sản phẩm
  function deleteProduct(key) {
    let productRef = ref(database, "Rate/" + key);
    // Xoá hàng chứa sản phẩm có ID tương ứng
    const rowToDelete = event.target.closest("div");
    rowToDelete.remove();
    remove(productRef)
      .then(() => {
        // Sau khi xoá thành công, cập nhật giao diện người dùng
        alert("Đã xoá đánh giá thành công!");
      })
      .catch((error) => {
        alert("Lỗi khi xoá đánh giá:", error);
      });
  }