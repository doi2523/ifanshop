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

var stt =0;
function GetGrid() {
  const database = getDatabase();
  const databaseRef = ref(database, "sanpham");
  // Lắng nghe sự kiện value để nhận tất cả dữ liệu khi nó thay đổi hoặc được tải lên ban đầu
  onChildAdded(databaseRef,(snapshot) => {
        const DataSanPham = snapshot.val();
        console.log(DataSanPham.picture)
        const picture = DataSanPham.picture
        const KeyGrid = snapshot.key;

        displayGrid(KeyGrid, picture);
      },
      (error) => {
        console.error("Error getting grid data: ", error);
      }
    );
  }
  
  function displayGrid(KeyGrid, picture) {
    const showgrid = document.getElementById("showid");
    const tr = document.createElement("tr");
  
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
  
    // Tạo một nút button "Copy" và gán hàm xử lý sự kiện click
    const copyButton = document.createElement("button");
    copyButton.innerHTML = '<i class="bi bi-clipboard"></i>'; // Thêm biểu tượng sao chép từ Bootstrap
    copyButton.className = "btn btn-primary btn-sm"; // Thêm class "btn" và "btn-primary" của Bootstrap
  
    td1.textContent = ++stt;
    td2.textContent = KeyGrid;
    // Chèn hình ảnh vào td3
    const img = document.createElement("img");
    img.src = picture;
    img.classList.add("image-thumbnail");
    td3.appendChild(img);
    td4.appendChild(copyButton);
    copyButton.addEventListener("click", function() {
      const idContent = KeyGrid; // Nội dung cần sao chép
      navigator.clipboard.writeText(idContent) // Sao chép nội dung vào clipboard
          .then(() => {
            AlertSuccessCopy(idContent);
          // Đẩy giá trị đã copy vào ô input
          document.getElementById('idsanpham').value = idContent;
          })
          .catch(err => {
      console.error("Lỗi khi sao chép: ", err);
      // Xử lý lỗi khi không thể sao chép
          });
      });
        // Thêm các ô <td> vào hàng
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  showgrid.appendChild(tr);
}
GetGrid();
function AlertSuccessCopy(productId){
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
    title: "Copy sản phẩm '"+productId+"' thành công!",
    color: "#716add",
  });
}