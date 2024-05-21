// Import the functions you need from the SDKs you need
import {
    initializeApp,
    getApp,
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import {
    getDatabase,
    set,
    ref,
    onValue,
    get,
    child,
    remove,
    update,
    onChildAdded
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCnZzlFSm-61oaNvO2TTJyef2PMc6iU8DY",
    authDomain: "user-inifanshop.firebaseapp.com",
    databaseURL:
      "https://user-inifanshop-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "user-inifanshop",
    storageBucket: "user-inifanshop.appspot.com",
    messagingSenderId: "104690936940",
    appId: "1:104690936940:web:5398fbb0edae0c7a76bc49",
    measurementId: "G-NLBDR28748",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth();
  const firebaseApp = getApp();

// Function to display user data
function displayUsers(getusers) {
  const container = document.getElementById("hienthichitiet");
  const div = document.createElement("div");
  div.classList.add("row", "mb-3");

  div.innerHTML = `
      <div class="col-md-4">
          <img src="${getusers.urlavatar}" alt="Profile Image" class="img-fluid rounded">
      </div>
      <div class="col-md-5">
          <div class="mb-2"><strong>Tên người dùng:</strong> ${getusers.username || ''}</div>
          <div class="mb-2"><strong>Email:</strong> ${getusers.email || ''}</div>
          <div class="mb-2"><strong>Họ tên:</strong> ${getusers.hoten || '' }</div>
          <div class="mb-2"><strong>Role:</strong> ${getusers.role || ''}</div>
          <div class="mb-2"><strong>Số điện thoại:</strong> ${getusers.sdt || ''}</div>
          <div class="mb-2"><strong>Username:</strong> ${getusers.username || ''}</div>
          <div class="mb-2"><strong>Trạng thái:</strong> ${getusers.userstatus || ''}</div>
          <div class="mb-2"><strong>Đăng nhập gần đây:</strong> ${getusers.last_login || ''}</div>
          <div class="mb-2"><strong>Đăng xuất gần đây:</strong> ${getusers.last_logout || ''}</div>
      </div>
      <div class="col-md-2">
          <h2>Tuỳ chọn</h2>
          <div class="mb-2"><a href="auth.admin.change.user.html" class="btn btn-primary">Thay đổi</a></div>
          <div class="mb-2"><button id="" class="btn btn-danger"><i class="fas fa-ban"></i> Block</button></div>
          <div class="mb-2"><button id="delete" class="btn btn-danger"><i class="bi bi-trash-fill"></i> Xoá</button></div>
          <div class="mb-2"><button id="exit" class="btn btn-danger">Thoát</button></div>
      </div>
    </div>
  `;
  container.appendChild(div);
  document.getElementById('delete').addEventListener('click', () => {
      AlertConfirm();
  });
  document.getElementById('exit').addEventListener('click', () => {
      ClearLocal();
      AlertExit();
      setTimeout(() => {
          window.location.href = "auth.qlyaccount.html";
      }, 3000); // Redirect after 3 seconds
  });
}

// Function to get all users and display them
function GetAll() {
  const iduser= localStorage.getItem("iduser");
  const databaseRef = ref(database);
  const userRef = child(databaseRef, "users/" + iduser);
  get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const getusers = snapshot.val();
        displayUsers(getusers);
        Alert();
      }
  }),
  (error) => {
      console.error("Error getting users: ", error);
  };
}
// Call the function to get and display all users
GetAll();

function ClearLocal() {
  try {
    localStorage.removeItem("iduser");
    console.log("Đã xoá thành công key 'iduser' từ localStorage.");
  } catch (error) {
    console.error("Lỗi khi xoá key 'iduser' từ localStorage:", error);
  }
}
function GetDonhang() {
  const database = getDatabase();
  const iduser= localStorage.getItem("iduser");
  const databaseRef = ref(database, "Donhang/" + iduser);

  onChildAdded(databaseRef, (snapshot) => {
      const MaDonhang = snapshot.key;
      const DataRef = ref(database, "Donhang/" + iduser + "/" + MaDonhang);

  get(DataRef).then((snapshot) => {
  if (snapshot.exists()) {
    const ThongTinDonhang = snapshot.val();
    const thongtindonhang = ThongTinDonhang.thongtindonhang;
    // Gọi displayDonhang chỉ một lần cho mỗi đơn hàng
    displayDonhang(MaDonhang, thongtindonhang, ThongTinDonhang);
      }
    });
  });
}
        
function displayDonhang(MaDonhang, thongtindonhang, ThongTinDonhang) {
  const donhangs = document.getElementById("hienthi");
  const tr = document.createElement("tr");
        
  // Tạo HTML cho mỗi hàng
  let html = `
      <td class="ma-don-hang">${MaDonhang}</td>
      <td>`;
        
  // Thêm thông tin của mỗi sản phẩm trong đơn hàng vào HTML
  thongtindonhang.forEach((item, index) => {
    html += `
      <div class="product-info">
        <div class="img-don-hang"><img src="${item.url}" alt=""></div>
        <div>
            Tên: <span>${item.tensanpham}</span><br>
            Màu: <span>${item.color}</span><br>
            Dung lượng: ${item.dungluong}</span><br>
            Số lượng : <span>${item.soluong}</span> <br>
            Phương thức: <span>${item.payment}</span>
        </div>
      </div>`;
  });
        
  html += `</td>
      <td>${parseFloat(ThongTinDonhang.tongtien).toLocaleString()}₫</td>
      <td>${ThongTinDonhang.tongsl}</td>
      <td>${ThongTinDonhang.time}</td>
      <td>${ThongTinDonhang.tinhtrang}</td>
  `;
        
  tr.innerHTML = html;
  donhangs.appendChild(tr);
        
  // Gắn sự kiện click vào hàng
  tr.addEventListener("click", function() {
  // Lấy tham chiếu đến các thẻ span bằng id
  const spanMaDonHang = document.getElementById("span-madonhang");
  const spanTongSoLuong = document.getElementById("span-tongsoluong");
  const spanTongTien = document.getElementById("span-tongtien");
  const spanTenNguoiNhan = document.getElementById("tennguoinhan");
  const spanSDTNguoiNhan = document.getElementById("sdtnguoinhan");
  const spanEmailNguoiNhan = document.getElementById("emailnguoinhan");
  const spanDiaChiNguoiNhan = document.getElementById("diachinguoinhan");
        
  // Gán giá trị vào các thẻ span
  spanMaDonHang.textContent = MaDonhang;
  spanTongSoLuong.textContent = ThongTinDonhang.tongsl;
  spanTongTien.textContent = parseFloat(ThongTinDonhang.tongtien).toLocaleString() + "₫";
  spanTenNguoiNhan.textContent = ThongTinDonhang.hoten;
  spanSDTNguoiNhan.textContent = ThongTinDonhang.sdt;
  spanEmailNguoiNhan.textContent = ThongTinDonhang.mail;
  spanDiaChiNguoiNhan.textContent = ThongTinDonhang.diachi;
  })
}
        
// Gọi hàm GetDonhang để bắt đầu quá trình lấy dữ liệu và hiển thị
GetDonhang();
        
function deleteUser() {
    const iduser= localStorage.getItem("iduser");
    let UserRef = ref(database, "users/" + iduser);
    remove(UserRef)
      .then(() => {
        // Sau khi xoá thành công, cập nhật giao diện người dùng
        ClearLocal();
        setTimeout(() => {
  window.location.href = "auth.qlyaccount.html";
        }, 3000); // Redirect after 3 seconds
      })
      .catch((error) => {
        alert("Lỗi khi xoá tin nhắn:", error);
      });
  }
function Alert(){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        //   toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Lấy thông tin người dùng thành công!",
        color: "#716add",
      });
}          
function AlertExit(){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        //   toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Người dùng bấm thoát chờ chuyển trang!",
        color: "#716add",
      });
} 
function AlertConfirm(){
  Swal.fire({
    title: "Bạn chắc không?",
    text: "Bạn muốn xoá người dùng này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
    title: "Deleted!",
    text: "Đã xoá người dùng này thành công, chờ chuyển trang!",
    icon: "success"
    });
    deleteUser();
    }
  });
}