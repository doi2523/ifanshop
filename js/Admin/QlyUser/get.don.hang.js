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

    //Function lấy dữ liệu từ cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match(
          "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
        );
        return cookieValue ? cookieValue.pop() : "";
      }
      
      // Sử dụng hàm để lấy giá trị từ cookies
const uidProfile = getCookie("id_profile");
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
                
                // Gọi displayDonhang chỉ một lần cho mỗi đơn hàng
                displayDonhang(MaDonhang, time, soluongmua, tongtien, thongtindonhang, hoten, sdt, diachi, mail);
            }
        });
    });
}

function displayDonhang(MaDonhang, time, soluongmua, tongtien, thongtindonhang, hoten ,sdt, diachi, mail) {
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
        <td>${parseFloat(tongtien).toLocaleString()}₫</td>
        <td>${soluongmua}</td>
        <td>${time}</td>
        <td>Đang giao hàng</td>
    `;

    tr.innerHTML = html;
    donhangs.appendChild(tr);

        // Gắn sự kiện click vào hàng
        tr.addEventListener("click", function() {
            // In ra tất cả dữ liệu trong hàng
            console.log("Mã đơn hàng:", MaDonhang);
            console.log("Thời gian đặt:", time);
            console.log("Số lượng mua:", soluongmua);
            console.log("Tổng tiền:", tongtien);
            thongtindonhang.forEach((item, index) => {
                console.log("Sản phẩm", index + 1);
                console.log("Tên sản phẩm:", item.tensanpham);
                console.log("Màu:", item.color);
                console.log("Dung lượng:", item.dungluong);
                console.log("Số lượng:", item.soluong);
                console.log("Phương thức thanh toán:", item.payment);
            });
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
