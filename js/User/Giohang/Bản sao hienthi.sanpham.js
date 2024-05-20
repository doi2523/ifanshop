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
    const databaseRef = ref(database, "donhang/" + uidProfile);
  
    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(
      databaseRef,
      (snapshot) => {
        const donhang = snapshot.val();
        displayDonhang(donhang, snapshot.key);
        displayTotal();
      },
      (error) => {
        console.error("Error getting messages: ", error);
      }
    );
  }
  // Khởi tạo biến tổng giá trị
  let totalAmount = 0;
  
  // Hàm hiển thị thông tin của đơn hàng và cập nhật tổng giá trị
  function displayDonhang(donhang, newPostKey) {
    const donhangs = document.getElementById("donhang");
    // donhangs.innerHTML = "";
    const div = document.createElement("div");
    const giatien = donhang.giasale;
    const tensp = donhang.tensanpham;
    // Định dạng giá trị theo chuỗi có dấu chấm ngăn cách mỗi 3 chữ số
    const formattedGiaTien = giatien
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    div.innerHTML = `
    <div class="d-flex m-1">
    <div>
      <img src="${donhang.url}" alt="" class="img_sanpham">
    </div>
    <div class="p-3">
      <h6>${donhang.tensanpham}</h6>
      <span>Giá tiền: ${formattedGiaTien}₫</span><br>
      <span>Số lượng: ${donhang.soluong}</span><br>
      <button id="delete" type="button" class="btn btn-danger me-2 d-flex ms-auto"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>`;
  
    // Thêm giá trị của sản phẩm này vào tổng giá trị
    totalAmount += parseFloat(donhang.giasale) * parseInt(donhang.soluong);
    // Hiển thị tổng giá trị lên giao diện
    // displayTotal();
    donhangs.appendChild(div);
    // Lấy tham chiếu đến nút "delete"
    const deleteButton = div.querySelector("#delete");
    // Thêm sự kiện click cho nút "delete"
    deleteButton.addEventListener("click", function () {
      donhangs.removeChild(div);
      // Xoá phần tử khỏi cơ sở dữ liệu khi nút "delete" được nhấn và truyền newPostKey
      DeleteDonHang(newPostKey, tensp);
      // Cập nhật lại tổng giá trị sau khi sản phẩm được xoá
      totalAmount -= parseFloat(donhang.giasale) * parseInt(donhang.soluong);
      // Hiển thị tổng giá trị mới lên giao diện
      displayTotal();
      // GetDonhang();
      // Thực hiện các xử lý khác liên quan đến việc xoá dữ liệu khỏi cơ sở dữ liệu hoặc làm bất kỳ việc gì bạn cần ở đây
    });
  }
  
  GetDonhang();
  function DeleteDonHang(newPostKey, tensp) {
    let productRef = ref(database, "donhang/" + uidProfile + "/" + newPostKey);
    remove(productRef)
      .then(() => {
        AlertGioHang(tensp);
        // alert("Đã xoá sản phẩm khỏi giỏ hàng");
        // Sau khi xoá thành công, bạn có thể cập nhật giao diện người dùng nếu cần
      })
      .catch((error) => {
        // alert("Lỗi khi xoá sản phẩm:", error);
      });
  }
  // Hàm hiển thị tổng giá trị lên giao diện
  function displayTotal() {
    const tongtienElement = document.getElementById("tongtien");
    tongtienElement.textContent = totalAmount.toLocaleString() + "₫"; // Gán giá trị mới cho nội dung của phần tử
  }
  displayTotal();
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
  