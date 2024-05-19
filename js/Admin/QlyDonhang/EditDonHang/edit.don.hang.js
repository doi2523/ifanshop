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
    onChildAdded,
    push,
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
  


function GetDonhang(MaNguoiMua, MaDonhangSua) {
    const database = getDatabase();
    var MaDonhangSua = localStorage.getItem('MaDonhangSua');
    var MaNguoiMua = localStorage.getItem('MaNguoiMua');
    const DataRef = ref(database, "Donhang/" + MaNguoiMua + "/" + MaDonhangSua);
        
    get(DataRef).then((snapshot) => {
        const ThongTinDonhang = snapshot.val();
        if (ThongTinDonhang) {
            const time = ThongTinDonhang.time;
            const soluongmua = ThongTinDonhang.tongsl;
            const tongtien = ThongTinDonhang.tongtien;
            const hoten = ThongTinDonhang.hoten;
            const sdt = ThongTinDonhang.sdt;
            const diachi = ThongTinDonhang.diachi;
            const mail = ThongTinDonhang.mail;
            const thongtindonhang = ThongTinDonhang.thongtindonhang;
            displayDonhang(ThongTinDonhang, thongtindonhang, MaDonhangSua, MaNguoiMua)
            // Bạn có thể thực hiện các thao tác cần thiết với dữ liệu ở đây
            console.log("Thông tin đơn hàng:", ThongTinDonhang);
        } else {
            console.log("Không tìm thấy thông tin đơn hàng.");
        }
    }).catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ database:", error);
    });
}

let rowCount = 0;

function displayDonhang(ThongTinDonhang, thongtindonhang, MaDonhangSua, MaNguoiMua) {
    const donhangs = document.getElementById("hienthi");
    const tr = document.createElement("tr");

    // Tạo HTML cho mỗi hàng
    let html = `
        <td data-madonhang="${MaDonhangSua}" class="ma-don-hang">${MaDonhangSua}</td>
        <td>
            <div class="product-info">
                <div>
                    Tên: <span style="color: #007bff;">${ThongTinDonhang.hoten}</span><br>
                    Số điện thoại: <span style="color: #007bff;">${ThongTinDonhang.sdt}</span><br>
                    Email: <span style="color: #007bff;">${ThongTinDonhang.mail}</span> <br>
                    Địa chỉ: <span style="color: #007bff;">${ThongTinDonhang.diachi}</span>
                </div>
            </div>
        </td>
    `;
    // Thêm thông tin của mỗi sản phẩm trong đơn hàng vào HTML
    thongtindonhang.forEach((item, index) => {
        html += `
        <div class="row">
        <div class="img-don-hang col-md-4">
            <img style="max-width: 90px; height: 100px;" src="${item.url}" alt="">
        </div>
        <div class="col-md-8" style="font-size: 13px;">
            Tên: <span style="color: #007bff;">${item.tensanpham}</span><br>
            Màu: <span style="color: #007bff;">${item.color}</span><br>
            Dung lượng: <span style="color: #007bff;">${item.dungluong}</span><br>
            Số lượng: <span style="color: #007bff;">${item.soluong}</span><br>
            Phương thức: <span style="color: #007bff;">${item.payment}</span>
        </div>
    </div>    
        `;
    });
    html += `</td>
    <td>
        <div class="product-info">
        <div>
        Số lượng mua: <span style="color: #007bff;">${ThongTinDonhang.tongsl}</span><br>
        Thành tiền: <span style="color: #007bff;">${parseFloat(ThongTinDonhang.tongtien).toLocaleString()}₫</span><br>
        Thời gian đặt: <span style="color: #007bff;">${ThongTinDonhang.time}</span><br>
        Tình trạng: <span style="color: #007bff;">Đang giao hàng</span> <br>
        </div>
    </div>
    </td>
        `;

    tr.innerHTML = html;
    donhangs.appendChild(tr);
}

// Gọi hàm GetDonhang để bắt đầu quá trình lấy dữ liệu và hiển thị
GetDonhang();



function DeleteDonHang(MaNguoiDung, MaDonhangXoa, tr) {
    // Tham chiếu đến đơn hàng cần xóa
    let DonhangRef = ref(database, "Donhang/" + MaNguoiDung + "/" + MaDonhangXoa);

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

function AlertConfirm(MaNguoiDung, MaDonhangXoa, tr){
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
          DeleteDonHang(MaNguoiDung, MaDonhangXoa, tr);
        }
      });
}

function TimKiem(MaNguoiDung, MaDonhangTim) {
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

function XoaLopTimKiem() {
    var trList = document.querySelectorAll('tr.highlight-row');

    // Lặp qua tất cả các hàng có lớp CSS 'highlight-row' và xoá lớp đó
    trList.forEach(function(tr) {
        tr.classList.remove('highlight-row');
    });
}


function AlertError0(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        // toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Đơn hàng không tồn tại!",
      color: "#716add",
    });
  }
function AlertError(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng nhập mã đơn hàng!",
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