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
      console.log(listiphone);

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
  const giagoc = parseFloat(
    listiphone.giagoc.replace(".", "").replace(".", "").replace(".", "")
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
        <div class="adding">
            <button class="add-shoping" id="add-cart" type="button">
                <span href="#" class="add-to-cart">
                    <i class="fas fa-shopping-cart"></i>
                </span>
                <span id="text-add-shoping">Thêm vào giỏ hàng</span>
            </button>
        </div>               
    </div>`;
  showweb.appendChild(div);
  itemCount++; // Tăng biến đếm số lượng mục

  div.querySelector("#add-cart").addEventListener("click", function () {
    const userCartRef = ref(database, "donhang/" + uidProfile);
    const newPostKey = listiphone.idsanpham;

    get(child(userCartRef, newPostKey)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentQuantity = parseInt(snapshot.val().soluong) || 0; // Chuyển đổi chuỗi thành số
        const newQuantity = currentQuantity + 1;

        update(ref(database, "donhang/" + uidProfile + "/" + newPostKey), {
          soluong: newQuantity.toString(),
        })
          .then(() => {
            alert("Đã cập nhật giỏ hàng!");
            console.log(
              "Giá trị đã được cập nhật vào cơ sở dữ liệu thành công!"
            );
            GetDonhang();
            displayTotal();
          })
          .catch((error) => {
            console.error(
              "Đã xảy ra lỗi khi cập nhật giá trị vào cơ sở dữ liệu:",
              error
            );
          });
      } else {
        set(ref(database, "donhang/" + uidProfile + "/" + newPostKey), {
          tensanpham: listiphone.tensanpham,
          dungluong: listiphone.dungluong,
          url: listiphone.picture,
          giasale: listiphone.giasale,
          soluong: "1",
          color: "",
        })
          .then(() => {
            alert("Đã thêm vào giỏ hàng!");
            console.log("Giá trị đã được lưu vào cơ sở dữ liệu thành công!");
            displayTotal();
          })
          .catch((error) => {
            console.error(
              "Đã xảy ra lỗi khi lưu giá trị vào cơ sở dữ liệu:",
              error
            );
          });
      }
    });
  });
}
GetiPhone();

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
  const li = document.createElement("li");
  const giatien = donhang.giasale;
  // Định dạng giá trị theo chuỗi có dấu chấm ngăn cách mỗi 3 chữ số
  const formattedGiaTien = giatien
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  li.innerHTML = `
      <div class="d-flex p-3">
        <img src="${donhang.url}" alt="" style="height: 80px; margin-top: 25px;">
        <div class="p-3">
          <h6>Name: ${donhang.tensanpham}</h6>
          <span>Giá tiền: ${formattedGiaTien}₫</span><br>
          <span>Số lượng: ${donhang.soluong}</span><br>
          <button id="delete" type="button" class="btn btn-outline-primary me-2 send-button">Xoá</button>
        </div>
      </div><hr>`;

  // Thêm giá trị của sản phẩm này vào tổng giá trị
  totalAmount += parseFloat(donhang.giasale) * parseInt(donhang.soluong);

  // Hiển thị tổng giá trị lên giao diện
  // displayTotal();
  donhangs.appendChild(li);

  // Lấy tham chiếu đến nút "delete"
  const deleteButton = li.querySelector("#delete");
  // Thêm sự kiện click cho nút "delete"
  deleteButton.addEventListener("click", function () {
    donhangs.removeChild(li);
    // Xoá phần tử khỏi cơ sở dữ liệu khi nút "delete" được nhấn và truyền newPostKey
    DeleteDonHang(newPostKey);
    // Cập nhật lại tổng giá trị sau khi sản phẩm được xoá
    totalAmount -= parseFloat(donhang.giasale) * parseInt(donhang.soluong);
    // Hiển thị tổng giá trị mới lên giao diện
    displayTotal();
    // Thực hiện các xử lý khác liên quan đến việc xoá dữ liệu khỏi cơ sở dữ liệu hoặc làm bất kỳ việc gì bạn cần ở đây
  });
}

GetDonhang();
function DeleteDonHang(newPostKey) {
  let productRef = ref(database, "donhang/" + uidProfile + "/" + newPostKey);
  remove(productRef)
    .then(() => {
      alert("Đã xoá sản phẩm khỏi giỏ hàng");
      // Sau khi xoá thành công, bạn có thể cập nhật giao diện người dùng nếu cần
    })
    .catch((error) => {
      alert("Lỗi khi xoá sản phẩm:", error);
    });
}
// Hàm hiển thị tổng giá trị lên giao diện
function displayTotal() {
  const tongtienElement = document.getElementById("tongtien");
  tongtienElement.textContent = totalAmount.toLocaleString() + "₫"; // Gán giá trị mới cho nội dung của phần tử
}
displayTotal();
