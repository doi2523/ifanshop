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
          window.location.href = "auth.admin.qlyaccount.html";
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
    displayDonhang(MaDonhang, thongtindonhang, ThongTinDonhang, iduser);
      }
    });
  });
}
        
function displayDonhang(MaDonhang, thongtindonhang, ThongTinDonhang, iduser) {
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
      <div class="row">
      <div class="col-md-4 img-don-hang">
      <img style="max-width: 70px; max-height: 85px;" src="${item.url}" alt="">
       </div>
      <div class="col-md-8">
          Tên: <span>${item.tensanpham}</span><br>
          Màu: <span>${item.color}</span><br>
          Dung lượng: ${item.dungluong}</span><br>
          Số lượng : <span>${item.soluong}</span> <br>
          Phương thức: <span>${item.payment}</span>
      </div>
      </div>
      </div>`;
  });
// Xác định màu sắc dựa trên tình trạng
let color;
switch (ThongTinDonhang.tinhtrang) {
    case "Đã xác nhận":
        color = "green";
        break;
    case "Đang giao hàng":
        color = "blue";
        break;
    case "Đã giao thành công":
        color = "green";
        break;
    case "Đơn hàng bị huỷ":
        color = "red";
        break;
    default:
        color = "black";
        break;
}
  html += `</td>
      <td>${parseFloat(ThongTinDonhang.tongtien).toLocaleString()}₫</td>
      <td>${ThongTinDonhang.tongsl}</td>
      <td>${ThongTinDonhang.time}</td>
      <td style="color: ${color};">${ThongTinDonhang.tinhtrang}</td>
  `;
        
  tr.innerHTML = html;
  donhangs.appendChild(tr);
        
  // // Gắn sự kiện click vào hàng
  tr.addEventListener("click", function() {
    var fixer = document.getElementById("fixer-tuychon");
    fixer.classList.add("active");// Thêm hoặc xóa lớp active
    const spanMaDonHangTuyChon = document.getElementById("madonhangtuychon");
    spanMaDonHangTuyChon.value = MaDonhang;
  document.getElementById('xoadonhang').addEventListener('click', function(event) {
    event.preventDefault();
    var MaDonhangXoa = document.getElementById('madonhangtuychon').value.trim(); // Lấy giá trị từ ô input và loại bỏ khoảng trắng đầu cuối
    if (MaDonhangXoa === "") {
      HighlightInputError(document.getElementById('madonhangtuychon'));
      // Nếu ô input trống, hiển thị cảnh báo và dừng hàm
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng nhập mã đơn hàng!",
      });
      return;
    }
    HandleInputData();
    // Nếu ô input không trống, thực hiện hàm AlertConfirm để xác nhận xóa đơn hàng
    AlertConfirmXoaDonHang(iduser, MaDonhangXoa, tr);
    });
    document.getElementById('editdonhang').addEventListener('click', function() {
      event.preventDefault();
      var MaDonhangSua = document.getElementById('madonhangtuychon').value.trim(); // Lấy giá trị từ ô input và loại bỏ khoảng trắng đầu cuối
      if (MaDonhangSua === "") {
        HighlightInputError(document.getElementById('madonhangtuychon'));
        // Nếu ô input trống, hiển thị cảnh báo và dừng hàm
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng nhập mã đơn hàng!",
        });
        return;
      }
      HandleInputData();
        localStorage.setItem('MaDonhangSua', MaDonhangSua);
        localStorage.setItem('MaNguoiMua', iduser);
        window.location.href = 'auth.admin.editdonhang.html';
      });
      // Thêm sự kiện cho nút tìm kiếm
      document.getElementById('timkiemdonhang').addEventListener('click', function() {
          event.preventDefault();
          var MaDonhangTim = document.getElementById('madonhangtuychon').value.trim(); // Lấy giá trị từ ô input và loại bỏ khoảng trắng đầu cuối
          if (MaDonhangTim === "") {
          HighlightInputError(document.getElementById('madonhangtuychon'));
          // Nếu ô input trống, hiển thị cảnh báo và dừng hàm
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập mã đơn hàng!",
          });
          return;
          }
          HandleInputData();
          // Nếu ô input không trống, thực hiện hàm AlertConfirm để xác nhận xóa đơn hàng
          TimKiem(iduser, MaDonhangTim, tr);
        
       });
      document.getElementById('thoat').addEventListener('click', function() {
          event.preventDefault();
          XoaLopTimKiem();
          fixer.classList.remove("active");
          spanMaDonHangTuyChon.value = "";
      });
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
function DeleteDonHang(iduser, MaDonhangXoa, tr) {
  // Tham chiếu đến đơn hàng cần xóa
  let DonhangRef = ref(database, "Donhang/" + iduser + "/" + MaDonhangXoa);
  // Kiểm tra sự tồn tại của đơn hàng trước khi xóa
  get(DonhangRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
    // Đơn hàng tồn tại, thực hiện xóa
    remove(DonhangRef)
    .then(() => {
        tr.remove();
        var fixer = document.getElementById("fixer-tuychon");
        fixer.classList.toggle("active");
    })
    .catch((error) => {
        AlertError0();
    });
    } else {
      // Đơn hàng không tồn tại, báo lỗi
      Swal.fire({
          title: "Error!",
          text: "Đơn hàng không tồn tại trong cơ sở dữ liệu.",
          icon: "error",
      });
    }
    })
    .catch((error) => {
      // Xảy ra lỗi khi kiểm tra sự tồn tại của đơn hàng
      AlertError0();
    });
}
function XoaLopTimKiem() {
  var trList = document.querySelectorAll('tr.highlight-row');

  // Lặp qua tất cả các hàng có lớp CSS 'highlight-row' và xoá lớp đó
  trList.forEach(function(tr) {
      tr.classList.remove('highlight-row');
  });
}
function TimKiem(iduser, MaDonhangTim, tr) {
  var tdList = document.querySelectorAll('td.ma-don-hang');

  // Lặp qua từng thẻ td chứa mã đơn hàng
  tdList.forEach(function(td) {
      var maDonHang = td.getAttribute('data-madonhang');

      // So sánh giá trị mã đơn hàng
      if (maDonHang === MaDonhangTim) {
          // Nếu tìm thấy mã đơn hàng, cuộn trang đến hàng đó và làm sáng hàng
          td.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Cuộn trang đến thẻ td chứa mã đơn hàng
          td.parentElement.classList.add('highlight-row'); // Thêm lớp CSS để làm sáng hàng chứa mã đơn hàng
          console.log("Đã tìm thấy mã đơn hàng:", maDonHang);
      } else {
          // Nếu không tìm thấy mã đơn hàng, loại bỏ lớp CSS làm sáng hàng
          td.parentElement.classList.remove('highlight-row');
      }
  });
}

  // Hàm xử lý khi dữ liệu đã được nhập vào ô input
function HandleInputData() {
    var inputElement = document.getElementById('madonhangtuychon');
    var inputValue = inputElement.value.trim();

    if (inputValue !== "") {
        // Nếu dữ liệu đã được nhập vào ô input, loại bỏ sự làm sáng ô input lên
        RemoveInputErrorHighlight(inputElement);
    }
}
// Khi xảy ra lỗi
function HighlightInputError(inputElement) {
    inputElement.classList.add("error-input"); // Thêm lớp error-input vào ô input
}

// Khi không còn lỗi nữa (sau khi đã nhập dữ liệu vào ô input)
function RemoveInputErrorHighlight(inputElement) {
    inputElement.classList.remove("error-input"); // Loại bỏ lớp error-input khỏi ô input
}
function AlertConfirmXoaDonHang(iduser, MaDonhangXoa, tr){
  Swal.fire({
      title: "Bạn chắc không?",
      text: "Bạn sẽ xoá đơn hàng này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Đơn hàng này đã được xoá.",
          icon: "success"
        });
        DeleteDonHang(iduser, MaDonhangXoa, tr);
      }
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