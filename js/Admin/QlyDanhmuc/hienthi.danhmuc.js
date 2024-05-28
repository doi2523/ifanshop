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
  
  var stdNo = 0;
  function GetAll() {
    const database = getDatabase();
    const databaseRef = ref(database, "Danhmuc");
  
    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef,(snapshot) => {
        const IDDanhmuc = snapshot.key;
        const thongtin = snapshot.val();
        displayDanhMuc(thongtin, IDDanhmuc);
      },
      (error) => {
        console.error("Error getting DanhMucs: ", error);
      }
    );
  }
  function displayDanhMuc(thongtin, IDDanhmuc) {
    const messages = document.getElementById("hienthidanhmuc");
    const tr = document.createElement("tr"); // Thay đổi từ <li> thành <tr> để tạo hàng mới
  
    // Tạo các ô <td> trong hàng
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
  
  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Xoá';
  deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "mx-2");
  deleteBtn.addEventListener("click", function () {
    AlertConfirm(IDDanhmuc, tr);
  });
  
    let editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("btn", "btn-primary", "btn-sm");
    editBtn.addEventListener("click", function () {

    let productId = IDDanhmuc; // Lấy ID của sản phẩm
    console.log(IDDanhmuc)
    //   let data_id = iphone.idsanpham;
      //Luu vao Local
    //   console.log(data_id)
    //   localStorage.setItem("idsanpham_sua", data_id);
    //   // GetMess(userid);
    //   if (data_id) {
    //     window.location.href = "auth.admin.suasanpham.html";
    // } else {
    //     console.error("Không có giá trị productId để lưu vào localStorage.");
    // }
    });
    let XemthemBtn = document.createElement("button");
    XemthemBtn.innerHTML = '<i class="fas fa-edit"></i> Xem thêm';
    XemthemBtn.classList.add("btn", "btn-primary", "btn-sm");

    // Thiết lập nội dung cho các ô <td>
    td1.textContent = ++stdNo;
    td2.textContent = IDDanhmuc;
    td3.textContent = thongtin.Tendanhmuc;
    // td4.appendChild(editBtn);
    td4.appendChild(deleteBtn);
    td4.appendChild(XemthemBtn);
  
    // Thêm các ô <td> vào hàng
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  
    messages.appendChild(tr);
  }
  GetAll();
  
  // Hàm xoá sản phẩm
  function deleteProduct(IDDanhmuc, tr) {
    let productRef = ref(database, "Danhmuc/" + IDDanhmuc);
    remove(productRef)
      .then(() => {
        tr.remove();
      })
      .catch((error) => {
        alert("Lỗi khi xoá sản phẩm:", error);
      });
  }
  
  function AlertConfirm(IDDanhmuc, tr){
    Swal.fire({
      title: "Are you sure?",
      text: "Bạn có chắc xoá danh mục này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Xoá thành công!",
          text: "Danh mục này đã được xoá thành công.",
          icon: "success"
        });
        deleteProduct(IDDanhmuc, tr);
      }
    });
  }
  function AlertSuccess(productId){

  }
  function editSanPham(event) {
    let productId = event.target.getAttribute("data-id");
  
    // Lưu giá trị mới vào localStorage
    localStorage.setItem("idsanpham_sua", productId);
    console.log(productId)
    // Chuyển hướng người dùng đến trang khác nếu có giá trị trong localStorage
    if (productId) {
        window.location.href = "auth.admin.suasanpham.html";
    } else {
        console.error("Không có giá trị productId để lưu vào localStorage.");
    }
  }
  
  
  
  
  