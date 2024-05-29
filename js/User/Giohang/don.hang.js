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

function GetDonhang() {
    const database = getDatabase();
    const databaseRef = ref(database, "Donhang/" + uidProfile);
    
    onChildAdded(databaseRef, (snapshot) => {
        const MaDonhang = snapshot.key;
        const DataRef = ref(database, "Donhang/" + uidProfile + "/" + MaDonhang);
        
        get(DataRef).then((snapshot) => {
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
                const tinhtrang = ThongTinDonhang.tinhtrang;
                
                // Gọi displayDonhang chỉ một lần cho mỗi đơn hàng
                displayDonhang(MaDonhang, time, soluongmua, tongtien, thongtindonhang, hoten, sdt, diachi, mail, tinhtrang);
            }
        });
    });
}

function displayDonhang(MaDonhang, time, soluongmua, tongtien, thongtindonhang, hoten ,sdt, diachi, mail, tinhtrang) {
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
        <td>${parseFloat(tongtien).toLocaleString()}₫</td>
        <td>${soluongmua}</td>
        <td>${time}</td>
        <td style="color: ${color}; font-size: 15px; font-weight: bold;">${tinhtrang}</td>
    `;

    tr.innerHTML = html;
    donhangs.appendChild(tr);

        // Gắn sự kiện click vào hàng
        tr.addEventListener("click", function() {
            // In ra tất cả dữ liệu trong hàng
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
    // Đặt nội dung và màu sắc cho span
    const spanTinhTrang = document.getElementById("tinhtrang");
    spanTinhTrang.textContent = tinhtrang;
    spanTinhTrang.style.color = color;

    const spanMaDonHang = document.getElementById("span-madonhang");
    const spanTongSoLuong = document.getElementById("span-tongsoluong");
    const spanTongTien = document.getElementById("span-tongtien");
    const spanTenNguoiNhan = document.getElementById("tennguoinhan");
    const spanSDTNguoiNhan = document.getElementById("sdtnguoinhan");
    const spanEmailNguoiNhan = document.getElementById("emailnguoinhan");
    const spanDiaChiNguoiNhan = document.getElementById("diachinguoinhan");

    // Gán giá trị vào các thẻ span
    // spanTinhTrang.textContent = tinhtrang;
    spanMaDonHang.textContent = MaDonhang;
    spanTongSoLuong.textContent = soluongmua;
    spanTongTien.textContent = parseFloat(tongtien).toLocaleString() + "₫";
    spanTenNguoiNhan.textContent = hoten;
    spanSDTNguoiNhan.textContent = sdt;
    spanEmailNguoiNhan.textContent = mail;
    spanDiaChiNguoiNhan.textContent = diachi;
    })
}
// Gọi hàm GetDonhang để bắt đầu quá trình lấy dữ liệu và hiển thị
GetDonhang();

document.getElementById("editthongtin").addEventListener("click", function(event) {
    // Ngăn form khỏi tải lại trang
    event.preventDefault();

    // Lấy giá trị từ các span
    const MadonhangEdit = document.getElementById("span-madonhang").textContent.trim();
    const tenNguoiNhan = document.getElementById("tennguoinhan").textContent.trim();
    const sdtNguoiNhan = document.getElementById("sdtnguoinhan").textContent.trim();
    const emailNguoiNhan = document.getElementById("emailnguoinhan").textContent.trim();
    const diaChiNguoiNhan = document.getElementById("diachinguoinhan").textContent.trim();
    const tinhTrang = document.getElementById("tinhtrang").textContent.trim();

    // Kiểm tra tình trạng đơn hàng
    if (tinhTrang === "Đã xác nhận" || tinhTrang === "Đang giao hàng" || tinhTrang === "Đã giao thành công" || tinhTrang === "Đơn hàng bị huỷ") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `Trạng thái "<span style="color: #007bff;">${tinhTrang}</span>", không thể sửa đổi thông tin.`,
    });
    } else if (!MadonhangEdit || !tenNguoiNhan || !sdtNguoiNhan || !emailNguoiNhan || !diaChiNguoiNhan) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng chọn đơn hàng",
      });
    } else {
        // Lưu giá trị vào localStorage
        localStorage.setItem('MadonhangEdit', MadonhangEdit);
        localStorage.setItem('tenNguoiNhan', tenNguoiNhan);
        localStorage.setItem('sdtNguoiNhan', sdtNguoiNhan);
        localStorage.setItem('emailNguoiNhan', emailNguoiNhan);
        localStorage.setItem('diaChiNguoiNhan', diaChiNguoiNhan);
        
        // Gọi hàm AlertSuccess
        AlertSuccess();
        
        // Chuyển hướng sau 3 giây
        setTimeout(function() {
            window.location.href = "auth.suathongtin.html";
        }, 3000); // 3000 milliseconds = 3 giây
    }
});

} else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}
function AlertSuccess(){
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
      icon: "success",
      title: "Người dùng bấm sửa, chờ chuyển trang!",
      color: "#716add",
    });
  }