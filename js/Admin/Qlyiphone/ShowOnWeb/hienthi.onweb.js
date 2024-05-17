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

let itemCount = 1; // Biến đếm số lượng mục

function GetiPhone() {
  const database = getDatabase();
  const databaseRef = ref(database, "webiphone");

  // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
  onChildAdded(
    databaseRef,
    (snapshot) => {
      const product = snapshot.val();
      const idsanpham_hienthi = product.idsanpham; // Lấy giá trị của idsanpham từ dữ liệu snapshot

      console.log(idsanpham_hienthi);
      GetData(idsanpham_hienthi);
    },
    (error) => {
      console.error("Error getting listiphones: ", error);
    }
  );
}

function GetData(idsanpham_hienthi) {
  console.log("OK");
  // Tạo đường dẫn đến nút con chứa dữ liệu với idsanpham
  const productRef = ref(database, "sanpham/" + idsanpham_hienthi);

  // Lắng nghe sự kiện child_added trên nút con chứa dữ liệu với idsanpham
  onValue(
    productRef,
    (snapshot) => {
      const listiphone = snapshot.val();
      ShowOnWeb(listiphone);
      // console.log(listiphone);

      // Và những thuộc tính khác nếu có

      // console.log("Tên sản phẩm:", tenSanPham);
      // console.log("Dung lượng:", dungLuong);
      // console.log("Giá sale:", giaSale);
      // console.log("Giá gốc:", giaGoc);
    },
    (error) => {
      console.error("Error getting messages: ", error);
    }
  );
}

function ShowOnWeb(listiphone) {
  const showweb = document.getElementById("showiphone");
  const div = document.createElement("div");
  div.classList.add("item", "item" + itemCount); // Thêm class item + số thứ tự vào div
  // Lấy giá gốc và giá sale từ message
  div.addEventListener("mouseenter", function() {
    // Thêm class khi người dùng trỏ chuột vào
    div.classList.add("hovered");
  });
  div.addEventListener("mouseleave", function() {
    // Xóa class khi người dùng rời chuột ra khỏi
    div.classList.remove("hovered");
  });
  const formatgiagoc = listiphone.giagoc;
  const giagoc = parseFloat(
    formatgiagoc.replace(".", "").replace(".", "").replace(".", "")
  );
  const giasale = parseFloat(
    listiphone.giasale.replace(".", "").replace(".", "").replace(".", "")
  );
  // Tính phần trăm giảm giá
  const giamGia = ((1 - giasale / giagoc) * 100).toFixed(0);

  // Lấy giá trị giasale từ đối tượng listiphone
  const giasalee = listiphone.giasale;
  const giagocc = listiphone.giagoc;
  // Định dạng giá trị theo chuỗi có dấu chấm ngăn cách mỗi 3 chữ số
  const formattedGiaSale = giasalee
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formattedGiaGoc = giagocc
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  div.innerHTML = `
    <div class="grid-item">
        <div class="tag-voucher">
            <img src="images/0-phantram.png" alt="">
        </div>
        <div class="img-ip" id="img-sanpham">
            <img src="${listiphone.picture}" alt="">
        </div>
        <div class="txt-name">${listiphone.tensanpham} ${listiphone.dungluong}</div>
        <div class="giatien">
            <span id="gia-uu-dai">${formattedGiaSale}₫</span>
            <span id="giagoc">${formattedGiaGoc}₫</span>
            <span id="phan-tram">-${giamGia}%</span>
        </div>              
    </div>`;
//     <div class="adding mt-2">
//     <button class="btn btn-primary" id="add-cart" type="button">
//         <span href="#" class="add-to-cart">
//             <i class="fas fa-shopping-cart"></i>
//         </span>
//         <span class="text-add-shoping">Thêm vào giỏ hàng</span>
//     </button>
// </div> 
  showweb.appendChild(div);
  itemCount++; // Tăng biến đếm số lượng mục
    // Thêm sự kiện click cho mỗi div.item
    div.addEventListener('click', function() {
      // Xử lý khi div.item được click
      const idsanpham = listiphone.idsanpham;
      localStorage.setItem("idsanpham", idsanpham);
      if (idsanpham) {
        window.location.href = "auth.chitiet.html";
    } else {
        console.error("Không có giá trị productId để lưu vào localStorage.");
    }
      // Ví dụ: Chuyển đến trang chi tiết sản phẩm, hiển thị thông tin chi tiết sản phẩm, ...
    });

  // div.querySelector("#add-cart").addEventListener("click", function () {
  //   const userCartRef = ref(database, "donhang/" + uidProfile);
  //   const newPostKey = listiphone.idsanpham;

  //   get(child(userCartRef, newPostKey)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       const currentQuantity = parseInt(snapshot.val().soluong) || 0; // Chuyển đổi chuỗi thành số
  //       const newQuantity = currentQuantity + 1;

  //       update(ref(database, "donhang/" + uidProfile + "/" + newPostKey), {
  //         soluong: newQuantity.toString(),
  //       })
  //         .then(() => {
  //           let ten=listiphone.tensanpham;
  //           AlertGioHang(ten);
  //           // alert("Đã cập nhật giỏ hàng!");
  //           console.log(
  //             "Giá trị đã được cập nhật vào cơ sở dữ liệu thành công!"
  //           );
  //         })
  //         .catch((error) => {
  //           console.error(
  //             "Đã xảy ra lỗi khi cập nhật giá trị vào cơ sở dữ liệu:",
  //             error
  //           );
  //         });
  //     } else {
  //       set(ref(database, "donhang/" + uidProfile + "/" + newPostKey), {
  //         tensanpham: listiphone.tensanpham,
  //         dungluong: listiphone.dungluong,
  //         url: listiphone.picture,
  //         giasale: listiphone.giasale,
  //         soluong: "1",
  //         color: "",
  //       })
  //         .then(() => {
  //           let ten=listiphone.tensanpham;
  //           AlertGioHang(ten);
  //           // alert("Đã thêm vào giỏ hàng!");
  //           console.log("Giá trị đã được lưu vào cơ sở dữ liệu thành công!");
  //           window.onload = function() {
  //             // Tải lại trang sau khi trang đã được tải hoàn toàn
  //             location.reload();
  //         };
          
  //         })
  //         .catch((error) => {
  //           console.error(
  //             "Đã xảy ra lỗi khi lưu giá trị vào cơ sở dữ liệu:",
  //             error
  //           );
  //         });
  //     }
  //   });
  // });
}
GetiPhone();
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
    title: "Thêm '"+ten+"' vào giỏ hàng thành công!",
    color: "#716add",
  });
}