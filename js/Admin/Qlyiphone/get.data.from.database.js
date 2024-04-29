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
  onChildAdded(
    databaseRef,
    (snapshot) => {
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
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Xoá";
  deleteBtn.setAttribute("data-name", iphone.idsanpham); // Lưu trữ tên của sản phẩm
  deleteBtn.addEventListener("click", deleteSanPham);
  deleteBtn.classList.add("btn", "btn-primary", "btn-sm", "mx-2");

  // Tạo nút sửa
  let editBtn = document.createElement("button");
  editBtn.textContent = "Sửa";
  editBtn.setAttribute("data-name", iphone.idsanpham); // Lưu trữ tên của sản phẩm
  editBtn.addEventListener("click", editSanPham);
  editBtn.classList.add("btn", "btn-primary", "btn-sm");

  // Thiết lập nội dung cho các ô <td>
  td1.textContent = ++stdNo;
  td2.textContent = iphone.idsanpham;
  td3.textContent = iphone.tensanpham;
  td4.textContent = iphone.dungluong;
  td5.textContent = iphone.soluong;
  td6.textContent = iphone.giasale;
  td7.textContent = iphone.giagoc;
  td8.innerHTML = `<img src="${iphone.picture}" alt="Image" class="image-thumbnail">`;
  td9.appendChild(deleteBtn);
  td9.appendChild(editBtn);

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

// Hàm xử lý khi người dùng nhấn nút xoá sản phẩm
function deleteSanPham(event) {
  let productId = event.target.getAttribute("data-name");
  confirmDelete(productId); // Gọi hàm hiển thị cảnh báo xác nhận
}
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
      // Sau khi xoá thành công, cập nhật giao diện người dùng
      alert("Đã xoá sản phẩm có id: '" + productId + " '");
    })
    .catch((error) => {
      alert("Lỗi khi xoá sản phẩm:", error);
    });
}

// Hàm lưu sản phẩm sau khi sửa trực tiếp trên bảng
function saveSanPham(event) {
  let productId = event.target.getAttribute("data-name");

  // Tìm hàng trong bảng chứa thông tin sản phẩm cần lưu
  let row = event.target.closest("tr");

  // Lấy giá trị mới từ các ô nhập
  // let newidsanpham = row.querySelectorAll('input')[0].value;
  let newTenSanPham = row.querySelectorAll("input")[0].value;
  let newDungLuong = row.querySelectorAll("input")[1].value;
  let newSoLuong = row.querySelectorAll("input")[2].value;
  let newGiaSale = row.querySelectorAll("input")[3].value;
  let newGiaGoc = row.querySelectorAll("input")[4].value;
  let newFile = row.querySelectorAll("input")[5].value;

  // Cập nhật dữ liệu vào cơ sở dữ liệu Firebase
  let productRef = ref(database, "sanpham/" + productId);
  update(productRef, {
    tensanpham: newTenSanPham,
    dungluong: newDungLuong,
    soluong: newSoLuong,
    giasale: newGiaSale,
    giagoc: newGiaGoc,
    file: newFile,
  })
    .then(() => {
      // console.log('Đã cập nhật sản phẩm có tên:', productId);
      alert("Đã cập nhật sản phẩm '" + newTenSanPham + "' thành công!");
      // Cập nhật lại giao diện bảng sau khi cập nhật dữ liệu thành công
      row.querySelectorAll("td")[1].innerHTML = productId;
      row.querySelectorAll("td")[2].innerHTML = newTenSanPham;
      row.querySelectorAll("td")[3].innerHTML = newDungLuong;
      row.querySelectorAll("td")[4].innerHTML = newSoLuong;
      row.querySelectorAll("td")[5].innerHTML = newGiaSale;
      row.querySelectorAll("td")[6].innerHTML = newGiaGoc;
      row.querySelectorAll("td")[7].innerHTML = newFile;

      // Thay đổi nút "Lưu" thành nút "Sửa"
      let editButton = document.createElement("button");
      editButton.textContent = "Sửa";
      editButton.setAttribute("data-name", productId);
      editButton.addEventListener("click", editSanPham);
      editButton.classList.add("btn", "btn-primary", "btn-sm");
      event.target.replaceWith(editButton);
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    });
}

// Hàm sửa sản phẩm trực tiếp trên bảng
function editSanPham(event) {
  let productId = event.target.getAttribute("data-name");

  // Tìm hàng trong bảng chứa thông tin sản phẩm cần sửa
  let row = event.target.closest("tr");

  // Chuyển đổi các ô hiển thị thông tin thành các ô nhập để người dùng có thể sửa đổi
  let tdElements = row.querySelectorAll("td");
  tdElements[1].innerHTML =
    '<input type="text" value="' + tdElements[1].innerHTML + '">';
  tdElements[2].innerHTML =
    '<input type="text" value="' + tdElements[2].innerHTML + '">';
  tdElements[3].innerHTML =
    '<input type="text" value="' + tdElements[3].innerHTML + '">';
  tdElements[4].innerHTML =
    '<input type="text" value="' + tdElements[4].innerHTML + '">';
  tdElements[5].innerHTML =
    '<input type="text" value="' + tdElements[5].innerHTML + '">';
  tdElements[6].innerHTML =
    '<input type="text" value="' + tdElements[6].innerHTML + '">';
  // Tạo input để chọn tệp mới
  let fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  tdElements[7].innerHTML = "";
  tdElements[7].appendChild(fileInput);
  // Thay đổi nút "Sửa" thành nút "Lưu"
  let saveButton = document.createElement("button");
  saveButton.textContent = "Lưu";
  saveButton.setAttribute("data-name", productId);
  saveButton.addEventListener("click", saveSanPham);
  saveButton.classList.add("btn", "btn-primary", "btn-sm");
  event.target.replaceWith(saveButton);
}
