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

function GetDonhang() {
    const database = getDatabase();
    const databaseRef = ref(database, "Donhang");
    
    onChildAdded(databaseRef, (snapshot) => {
        const MaNguoiDung = snapshot.key;
        console.log(MaNguoiDung)
        const DataRef = ref(database, "Donhang/" + MaNguoiDung);
        
        onChildAdded(DataRef, (snapshot) => {
            const MaDonhang = snapshot.key;
            console.log(MaDonhang)
            const DataRef1 = ref(database, "Donhang/" + MaNguoiDung + "/" + MaDonhang);
            get(DataRef1).then((snapshot) => {
                if (snapshot.exists()) {
                    const ThongTinDonhang = snapshot.val();
                    const time = ThongTinDonhang.time;
                    const soluongmua = ThongTinDonhang.tongsl;
                    const tongtien = ThongTinDonhang.tongtien;
                    const hoten = ThongTinDonhang.hoten;
                    const sdt = ThongTinDonhang.sdt;
                    const diachi = ThongTinDonhang.diachi;
                    const mail = ThongTinDonhang.mail
                    const thongtindonhang = ThongTinDonhang.thongtindonhang;
                    const tinhtrang= ThongTinDonhang.tinhtrang;
                    // Gọi displayDonhang chỉ một lần cho mỗi đơn hàng
                    displayDonhang(MaDonhang, time, soluongmua, tongtien, thongtindonhang, hoten, sdt, diachi, mail, MaNguoiDung, tinhtrang);
                }
            });
        });
        });
}
let rowCount = 0;

function displayDonhang(MaDonhang, time, soluongmua, tongtien, thongtindonhang, hoten ,sdt, diachi, mail, MaNguoiDung, tinhtrang) {
    const donhangs = document.getElementById("hienthi");
    const tr = document.createElement("tr");

    // Tạo HTML cho mỗi hàng
    let html = `
    <td>${++rowCount}</td>
        <td data-madonhang="${MaDonhang}" class="ma-don-hang">${MaDonhang}</td>
        <td>
            <div class="product-info">
                <div>
                    Tên: <span style="color: #007bff;">${hoten}</span><br>
                    Số điện thoại: <span style="color: #007bff;">${sdt}</span><br>
                    Email: <span style="color: #007bff;">${mail}</span> <br>
                    Địa chỉ: <span style="color: #007bff;">${diachi}</span>
                </div>
            </div>
        </td>
    `;
    // Thêm thông tin của mỗi sản phẩm trong đơn hàng vào HTML
    thongtindonhang.forEach((item, index) => {
        html += `
        <div class="row product-info" style="border:none">
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
    // Xác định màu sắc dựa trên tình trạng
    let color;
    switch (tinhtrang) {
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
    <td>
        <div class="product-info">
        <div>
        Số lượng mua: <span style="color: #007bff;">${soluongmua}</span><br>
        Thành tiền: <span style="color: #007bff;">${parseFloat(tongtien).toLocaleString()}₫</span><br>
        Thời gian đặt: <span style="color: #007bff;">${time}</span><br>
        Tình trạng: <span style="color: ${color}; font-weight: bold;">${tinhtrang}</span> <br>
        </div>
    </div>
    </td>
        `;

    tr.innerHTML = html;
    donhangs.appendChild(tr);

        // Gắn sự kiện click vào hàng
    tr.addEventListener("click", function() {
        // Bắt đầu animation khi click vào hàng
        var fixer = document.getElementById("fixer-tuychon");
        fixer.classList.add("active");// Thêm hoặc xóa lớp active
        // fixer.classList.toggle("active"); 
        // Gắn sự kiện click vào toàn bộ trang
        // console.log("Mã đơn hàng:", MaDonhang);
        // console.log("Thời gian đặt:", time);
        // console.log("Số lượng mua:", soluongmua);
        // console.log("Tổng tiền:", tongtien);
        // thongtindonhang.forEach((item, index) => {
        //     console.log("Sản phẩm", index + 1);
        //     console.log("Tên sản phẩm:", item.tensanpham);
        //     console.log("Màu:", item.color);
        //     console.log("Dung lượng:", item.dungluong);
        //     console.log("Số lượng:", item.soluong);
        //     console.log("Phương thức thanh toán:", item.payment);
        // });
        const spanMaDonHangTuyChon = document.getElementById("madonhangtuychon");
            spanMaDonHangTuyChon.value = MaDonhang;
            document.getElementById('xoadonhang').addEventListener('click', function(event) {
                event.preventDefault();
                var MaDonhangXoa = document.getElementById('madonhangtuychon').value.trim(); // Lấy giá trị từ ô input và loại bỏ khoảng trắng đầu cuối
                if (MaDonhangXoa === "") {
                    HighlightInputError(document.getElementById('madonhangtuychon'));
                    // Nếu ô input trống, hiển thị cảnh báo và dừng hàm
                    AlertError("Vui lòng nhập mã đơn hàng!");
                    return;
                }
                HandleInputData();
                // Nếu ô input không trống, thực hiện hàm AlertConfirm để xác nhận xóa đơn hàng
                AlertConfirm(MaNguoiDung, MaDonhangXoa, tr);
            });
            
            document.getElementById('editdonhang').addEventListener('click', function() {
                event.preventDefault();
                var MaDonhangSua = document.getElementById('madonhangtuychon').value.trim(); // Lấy giá trị từ ô input và loại bỏ khoảng trắng đầu cuối
                if (MaDonhangSua === "") {
                    HighlightInputError(document.getElementById('madonhangtuychon'));
                    // Nếu ô input trống, hiển thị cảnh báo và dừng hàm
                    AlertError("Vui lòng nhập mã đơn hàng!");
                    return;
                }
                HandleInputData();
                // Nếu ô input không trống, thực hiện hàm AlertConfirm để xác nhận xóa đơn hàng
                localStorage.setItem('MaDonhangSua', MaDonhangSua);
                localStorage.setItem('MaNguoiMua', MaNguoiDung);
                window.location.href = 'auth.admin.editdonhang.html';
            });
                    // Thêm sự kiện cho nút tìm kiếm
            document.getElementById('timkiemdonhang').addEventListener('click', function() {
                event.preventDefault();
                var MaDonhangTim = document.getElementById('madonhangtuychon').value.trim(); // Lấy giá trị từ ô input và loại bỏ khoảng trắng đầu cuối
                if (MaDonhangTim === "") {
                    HighlightInputError(document.getElementById('madonhangtuychon'));
                    // Nếu ô input trống, hiển thị cảnh báo và dừng hàm
                    AlertError("Vui lòng nhập mã đơn hàng!");
                    return;
                }
                HandleInputData();
                // Nếu ô input không trống, thực hiện hàm AlertConfirm để xác nhận xóa đơn hàng
                TimKiem(MaNguoiDung, MaDonhangTim, tr);
            
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