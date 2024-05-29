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

function GetGiohang() {
        const database = getDatabase();
        const databaseRef = ref(database, "Giohang/" + uidProfile);
        // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
        onChildAdded(databaseRef,(snapshot) => {
            const Giohang = snapshot.val();
            displayGiohang(Giohang, snapshot.key);
          },
          (error) => {
            console.error("Error getting messages: ", error);
            AlertError();
          }
        );
}      
// Hàm hiển thị thông tin của đơn hàng và cập nhật tổng giá trị
function displayGiohang(Giohang, newPostKey) {
    const Giohangs = document.getElementById("hienthi");
    const tr = document.createElement("tr");

    // Tạo các ô <td> trong hàng
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    // Thiết lập nội dung cho các ô <td>
    const img = document.createElement("img");
    img.src = Giohang.url;
    img.alt = "Hình ảnh sản phẩm";
    img.style.maxWidth = "70px";
    img.style.height = "auto";
    td1.appendChild(img);

    td2.innerHTML = `
        ${Giohang.tensanpham}<br>
        Màu: ${Giohang.color}<br>
        Dung lượng: ${Giohang.dungluong}<br>
        Phương thức: ${Giohang.payment}<br>

    `;
    // <button id="edit-giohang" class="btn btn-primary btn-sm">Sửa</button>
    // Chuyển giá trị số sang kiểu Number và định dạng với dấu chấm mỗi 3 chữ số
    const formattedGiaSale = parseFloat(Giohang.giasale).toLocaleString();
    // Gán giá trị đã định dạng vào ô td3
    td3.textContent = `${formattedGiaSale}₫`;

    // Tạo thanh điều chỉnh số lượng
    td4.innerHTML = `
        <div class="input-group">
            <button class="btn btn-outline-secondary" type="button" id="decrease-${newPostKey}">
                <i class="bi bi-dash"></i>
            </button>
            <input type="number" class="form-control quantity-input" style="width: 50px" value="${Giohang.soluong}" id="quantity-${newPostKey}">
            <button class="btn btn-outline-secondary" type="button" id="increase-${newPostKey}">
                <i class="bi bi-plus"></i>
            </button>
            <button class="btn btn-danger mx-2" type="button" id="delete-${newPostKey}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // Thêm các ô <td> vào hàng
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    // Thêm hàng vào tbody
    Giohangs.appendChild(tr);

    // Thêm sự kiện cho các nút tăng giảm số lượng
    document.getElementById(`decrease-${newPostKey}`).addEventListener('click', function() {
        const quantityInput = document.getElementById(`quantity-${newPostKey}`);
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 0) {
            quantityInput.value = currentQuantity - 1;
        }
    });

    document.getElementById(`increase-${newPostKey}`).addEventListener('click', function() {
        const quantityInput = document.getElementById(`quantity-${newPostKey}`);
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    });
    // Lấy tham chiếu đến nút "Sửa"
    // const editButton = document.getElementById("edit-giohang");

    // // Thêm sự kiện "click" vào nút "Sửa"
    // editButton.addEventListener("click", function() {
    //     // Thực hiện các hành động bạn muốn khi nút "Sửa" được nhấp vào
    //     // Ví dụ: mở một cửa sổ sửa đổi, chuyển hướng đến trang sửa đổi, vv.
    //     // Ở đây bạn có thể gọi một hàm hoặc thực hiện các thao tác trực tiếp.
    //     // Ví dụ:
    //     alert("Nút 'Sửa' đã được nhấp vào!");
    // });
    // Thêm sự kiện cho nút xoá
    document.getElementById(`delete-${newPostKey}`).addEventListener('click', function() {
        // Xử lý việc xóa đơn hàng tại đây
        Giohangs.removeChild(tr);
        DeleteGiohang(newPostKey, Giohang.tensanpham);
        updateTotalAmount(); // Cập nhật tổng giá trị khi xóa
        updateTotalQuantity(newPostKey);
    });

// Lắng nghe sự kiện click trên nút "Lưu thay đổi"
document.getElementById(`savethaydoi`).addEventListener('click', function() {
    const quantityInput = document.getElementById(`quantity-${newPostKey}`);
    const quantityValue = parseInt(quantityInput.value);
    console.log("Giá trị của ô input:", quantityValue);
    if (quantityValue === 0) {
        const rows = document.querySelectorAll("#hienthi tr");
        rows.forEach(row => {
            const quantity = parseInt(row.querySelector(".quantity-input").value);
            if (quantity === 0) {
                row.remove();
            }
        });

    DeleteGiohang(newPostKey, Giohang.tensanpham);
    } else {
        // Nếu số lượng mới không phải là 0, tiến hành cập nhật vào cơ sở dữ liệu
        update(ref(database, "Giohang/" + uidProfile + "/" + newPostKey), {
            soluong: quantityValue.toString(),
        })
        .then(() => {
            AlertUpdate();
            updateTotalQuantity(); // Cập nhật tổng số lượng
            updateTotalAmount(); // Cập nhật tổng giá trị khi thay đổi số lượng
            console.log("Giá trị đã được cập nhật vào cơ sở dữ liệu thành công!");
        })
        .catch((error) => {
            console.error("Đã xảy ra lỗi khi cập nhật giá trị vào cơ sở dữ liệu:", error);
        });
    }
});
    // Cập nhật tổng giá trị khi hiển thị đơn hàng ban đầu
    updateTotalAmount();
    updateTotalQuantity(newPostKey);

document.getElementById("tieptuc").addEventListener("submit", function() {
      // Ngăn form khỏi tải lại trang
      event.preventDefault();
      updateTotalAmount();
      updateTotalQuantity(newPostKey);
      const tongtienSpan = document.getElementById("tongtien");
    const tongSoLuongSpan = document.getElementById("tongsoluong");

    const tongtienValue = tongtienSpan.textContent;
    const tongsoluongValue = tongSoLuongSpan.textContent;
    
    const tongtienWithoutDot = tongtienValue.replace(/\./g, '');
    const tongtienFloat = parseFloat(tongtienWithoutDot);

    // Lưu các giá trị vào localStorage
    localStorage.setItem('tongtienFloat', tongtienFloat);
    localStorage.setItem('tongsoluongValue', tongsoluongValue);
      AlertTieptheo();
        setTimeout(function() {
            window.location.href = "auth.thanhtoan.html";
        }, 3000);
      });
}

// Hàm tính và cập nhật tổng giá trị của đơn hàng
function updateTotalAmount() {
  let totalAmount = 0;
  const rows = document.querySelectorAll("#hienthi tr");
  
  rows.forEach(row => {
      const quantity = parseInt(row.querySelector(".quantity-input").value);
      const giaSaleText = row.querySelector("td:nth-child(3)").textContent;
      console.log(giaSaleText)
      const giaSale = parseFloat(giaSaleText.replace(/[^\d]/g, ''));
      
      totalAmount += quantity * giaSale;
  });
  
  const formattedTotalAmount = totalAmount.toLocaleString();
  const tongtienSpan = document.getElementById("tongtien");
  console.log(formattedTotalAmount)
  tongtienSpan.textContent = formattedTotalAmount;
}

// Gọi hàm updateTotalAmount() khi trang được tải hoàn chỉnh
document.addEventListener("DOMContentLoaded", function() {
  // GetGiohang();
  updateTotalAmount();
});

// Hàm tính và cập nhật tổng số lượng của đơn hàng
function updateTotalQuantity() {
    let totalQuantity = 0;
    const rowsToRemove = []; // Mảng chứa các hàng cần xoá
    const rows = document.querySelectorAll("#hienthi tr");
    rows.forEach(row => {
        const quantity = parseInt(row.querySelector(".quantity-input").value);
        if (quantity > 0) {
            totalQuantity += quantity;
        } else {
            rowsToRemove.push(row);
        }
    });
    rowsToRemove.forEach(row => {
        row.remove();
    });
    const tongSoLuongSpan = document.getElementById("tongsoluong");
    tongSoLuongSpan.textContent = "";
    tongSoLuongSpan.textContent = totalQuantity;
}

// Gọi hàm GetGiohang để bắt đầu quá trình lấy dữ liệu và hiển thị
GetGiohang();

function DeleteGiohang(newPostKey, tensp) {
    let productRef = ref(database, "Giohang/" + uidProfile + "/" + newPostKey);
    remove(productRef)
      .then(() => {
        AlertGioHang(tensp);
      })
      .catch((error) => {
        // alert("Lỗi khi xoá sản phẩm:", error);
      });
}
} else {
  console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}
  function AlertGioHang(ten){
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
      title: "Xoá '"+ten+"' khỏi giỏ hàng thành công!",
      color: "#716add",
    });
  }
  function AlertUpdate(){
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
      title: "Cập nhật số lượng thành công!",
      color: "#716add",
    });
  }
  function AlertError(){
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
      icon: "warning",
      title: "Giỏ hàng đang trống!",
      color: "#716add",
    });
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
      title: "Đang chuyển hướng đến trang thanh toán!",
      color: "#716add",
    });
  }