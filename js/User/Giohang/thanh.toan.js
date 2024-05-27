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

let allChildKeys = [];      
function GetDonhang() {
        const database = getDatabase();
        const databaseRef = ref(database, "Giohang/" + uidProfile);
        onChildAdded(databaseRef,(snapshot) => {
            const donhang = snapshot.val();
            const childKey = snapshot.val();
            allChildKeys.push(childKey);
            displayDonhang(donhang);
          },
          (error) => {
            console.error("Error getting messages: ", error);
          }
        );
      }  
let allsanpham = []; 
function GetThongTin() {
  const database = getDatabase();
  const databaseRef = ref(database, "Giohang/" + uidProfile);
  // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
  onChildAdded(databaseRef,(snapshot) => {
      // const Giohang = snapshot.val();
      const childKey = snapshot.val();
      console.log(childKey)
      allsanpham.push(childKey);
    },
    (error) => {
      console.error("Error getting messages: ", error);
    }
  );
} 
GetThongTin();   
// Hàm hiển thị thông tin của đơn hàng và cập nhật tổng giá trị
function displayDonhang(donhang) {
    const donhangs = document.getElementById("hienthi");
    const tr = document.createElement("tr");

    // Tạo các ô <td> trong hàng
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    // Thiết lập nội dung cho các ô <td>
    const img = document.createElement("img");
    img.src = donhang.url;
    img.alt = "Hình ảnh sản phẩm";
    img.style.maxWidth = "70px";
    img.style.height = "auto";
    td1.appendChild(img);

    td2.innerHTML = `
        ${donhang.tensanpham}<br>
        Màu: ${donhang.color}<br>
        Dung lượng: ${donhang.dungluong}<br>
        Phương thức: ${donhang.payment}
    `;

    // Chuyển giá trị số sang kiểu Number và định dạng với dấu chấm mỗi 3 chữ số
    const formattedGiaSale = parseFloat(donhang.giasale).toLocaleString();
    // Gán giá trị đã định dạng vào ô td3
    td3.textContent = `${formattedGiaSale}₫`;

    // Tạo thanh điều chỉnh số lượng
    td4.innerHTML = `${donhang.soluong}`;

    // Thêm các ô <td> vào hàng
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    // Thêm hàng vào tbody
    donhangs.appendChild(tr);
}

// Gọi hàm GetDonhang để bắt đầu quá trình lấy dữ liệu và hiển thị
GetDonhang();

// Gán giá trị từ cookie vào các trường input tương ứng
document.getElementById("emailInput").value = emailProfile;
document.getElementById("tenInput").value = hotenProfile;
document.getElementById("sdtInput").value = sdtProfile;

const tongtienSpan = document.getElementById("tongtien");
const tongSoLuongSpan = document.getElementById("tongsoluong");
const tongtienFloat = parseFloat(localStorage.getItem('tongtienFloat'));
const tongsoluongValue = parseInt(localStorage.getItem('tongsoluongValue'));
const formattedTongtien = parseFloat(tongtienFloat).toLocaleString();
tongtienSpan.textContent = `${formattedTongtien}₫`;
tongSoLuongSpan.textContent = tongsoluongValue;

document.getElementById("apdung").addEventListener("click", function() {
  // Ngăn form khỏi tải lại trang
  event.preventDefault();
  const Magiamgia = document.getElementById("input_magiamgia").value;
  const tongtienSpan = document.getElementById("tongtien");
  console.log(Magiamgia)
});
// Lắng nghe sự kiện click trên nút "Tiến hành đặt hàng"
document.getElementById("tieptuc").addEventListener("submit", function() {
    // Ngăn form khỏi tải lại trang
    event.preventDefault();
    // Lấy giá trị từ các ô input
    const newmail= document.getElementById("emailInput").value;
    const newhoten = document.getElementById("tenInput").value;
    const newsdt = document.getElementById("sdtInput").value;
    const newdiaChi = document.getElementById("diaChiInput").value;
    // Lấy tham chiếu đến phần tử <span> có id là "tongtien"
    const tongtienSpan = document.getElementById("tongtien");
    const tongSoLuongSpan = document.getElementById("tongsoluong");
    // Lấy giá trị từ phần tử <span>
    const tongtienValue = tongtienSpan.textContent;
    const tongsoluongValue = tongSoLuongSpan.textContent;
    // Loại bỏ dấu chấm từ giá trị
    const tongtienWithoutDot = tongtienValue.replace(/\./g, '');
    // Chuyển đổi giá trị thành float
    const tongtienFloat = parseFloat(tongtienWithoutDot);

    // Tạo một khóa ngẫu nhiên gồm 10 ký tự để làm mã đơn hàng
  const randomKey = generateRandomKey(10);
  let last_login_time = new Date();
  let formattedDateTime = last_login_time.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  // Tạo một tham chiếu mới cho đơn hàng dưới uid của người dùng
  const orderRef = ref(database, "Donhang/" + uidProfile + "/" + randomKey);
    set(orderRef, {
        mail: newmail,
        hoten: newhoten,
        sdt: newsdt,
        diachi: newdiaChi,
        tongtien: tongtienFloat,
        tongsl: tongsoluongValue,
        thongtindonhang: allsanpham,
        time: formattedDateTime,
        tinhtrang: "Chờ xác nhận",
    })
    .then(() => {
      //Thông báo
        AlertTieptheo();
        //Xoá sản phẩm này trong giỏ hàng bởi đã đặt hàng
        DeleteGiohang();
        setTimeout(function() {
            window.location.href = "auth.donhang.html"; // Thay đổi URL này thành URL của trang bạn muốn chuyển đến
        }, 3000); // 3000 milliseconds = 3 giây
    })
    .catch((error) => {
        alert("Đã xảy ra lỗi khi cập nhật thông tin: " + error.message);
    });
            
});
function DeleteGiohang() {
  let productRef = ref(database, "Giohang/" + uidProfile);
  remove(productRef)
    .then(() => {
      console.log("OK")
    })
    .catch((error) => {
      // alert("Lỗi khi xoá sản phẩm:", error);
    });
}
} else {
  console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}
// Hàm tạo chuỗi ngẫu nhiên gồm 10 ký tự
function generateRandomKey(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function AlertTieptheo(){
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
      title: "Đặt hàng thành công!",
      color: "#716add",
    });
  }