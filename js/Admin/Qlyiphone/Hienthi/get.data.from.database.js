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
  const databaseRef = ref(database, "sanpham");

  // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
  onChildAdded(databaseRef,(snapshot) => {
      const iphone = snapshot.val();
      displaySanpham(iphone);
    },
    (error) => {
      console.error("Error getting Sanphams: ", error);
    }
  );
}
function displaySanpham(iphone) {
  const messages = document.getElementById("additem");
  const tr = document.createElement("tr"); // Thay đổi từ <li> thành <tr> để tạo hàng mới

  // Tạo các ô <td> trong hàng
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");
  const td6 = document.createElement("td");
  const td7 = document.createElement("td");
  const td8 = document.createElement("td");
  const td9 = document.createElement("td");

// Tạo nút xoá
// let deleteBtn = document.createElement("button");
// deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
// deleteBtn.setAttribute("data-name", iphone.idsanpham); // Lưu trữ tên của sản phẩm
// deleteBtn.addEventListener("click", deleteSanPham);
// deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "mx-2");

let deleteBtn = document.createElement("button");
deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "mx-2");
// Thêm sự kiện click vào nút xoá
deleteBtn.addEventListener("click", function () {
  let productId = iphone.idsanpham; // Lấy ID của sản phẩm
  confirmDelete(productId) // Gọi hàm hiển thị cảnh báo xác nhận xoá
});

  let editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.classList.add("btn", "btn-primary", "btn-sm");
  editBtn.addEventListener("click", function () {

    let data_id = iphone.idsanpham;
    //Luu vao Local
    console.log(data_id)
    localStorage.setItem("idsanpham_sua", data_id);
    // GetMess(userid);
    if (data_id) {
      window.location.href = "auth.admin.suasanpham.html";
  } else {
      console.error("Không có giá trị productId để lưu vào localStorage.");
  }
  });

  // Thiết lập nội dung cho các ô <td>
  td1.textContent = ++stdNo;
  td2.textContent = iphone.idsanpham;
  td3.textContent = iphone.tensanpham;
  td4.textContent = iphone.dungluong;
  td5.textContent = iphone.soluong;
  td6.textContent = iphone.giasale;
  td7.textContent = iphone.giagoc;
  td8.innerHTML = `<img src="${iphone.picture}" alt="Image" class="image-thumbnail">`;
  td9.appendChild(editBtn);
  td9.appendChild(deleteBtn);

  // Thêm các ô <td> vào hàng
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);
  tr.appendChild(td8);
  tr.appendChild(td9);

  messages.appendChild(tr);
}
GetAll();

// Hàm xác nhận xoá sản phẩm
function confirmDelete(productId) {
  let confirmation = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
  if (confirmation) {
    deleteProduct(productId); // Nếu chọn "OK", gọi hàm để xoá sản phẩm
  } else {
    console.log("Người dùng đã hủy bỏ thao tác xoá sản phẩm."); // Nếu chọn "Cancel", không làm gì cả
  }
}

// Hàm xoá sản phẩm
function deleteProduct(productId) {
  let productRef = ref(database, "sanpham/" + productId);
  // Xoá hàng chứa sản phẩm có ID tương ứng
  const rowToDelete = event.target.closest("tr");
  rowToDelete.remove();
  remove(productRef)
    .then(() => {
      AlertSuccess(productId);
      // Sau khi xoá thành công, cập nhật giao diện người dùng
      // alert("Đã xoá sản phẩm có id: '" + productId + " '");
    })
    .catch((error) => {
      alert("Lỗi khi xoá sản phẩm:", error);
    });
}

function AlertConfirm(productId){
  Swal.fire({
    title: "Are you sure?",
    text: "Bạn có chắc xoá sản phẩm này!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Xoá thành công!",
        text: "Sản phẩm này đã được xoá thành công.",
        icon: "success"
      });
      deleteProduct(productId);
    }
  });
}
function AlertSuccess(productId){
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
    title: "Sản phẩm '" +productId+"' đã được xoá thành công!",
    color: "#716add",
  });
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




