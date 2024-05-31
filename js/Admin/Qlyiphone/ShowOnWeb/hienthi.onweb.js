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

let itemCount = 1; // Biến đếm số lượng mục
let originalProducts = []; // Danh sách sản phẩm ban đầu
let filteredProducts = []; // Danh sách sản phẩm sau khi lọc

function GetiPhone() {
  const database = getDatabase();
  const databaseRef = ref(database, "webiphone");

  // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
  onChildAdded(databaseRef,(snapshot) => {
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
  onValue(productRef,(snapshot) => {
      const listiphone = snapshot.val();

      originalProducts.push(listiphone); // Thêm sản phẩm vào danh sách ban đầu

      ShowOnWeb(listiphone);
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
  //Format gia tien vd 43.000.000 thanh 4300000
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
  const formattedGiaSale = giasalee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formattedGiaGoc = giagocc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
  showweb.appendChild(div);
  itemCount++; // Tăng biến đếm số lượng mục

  filteredProducts.push(listiphone); // Thêm sản phẩm vào danh sách đã lọc

    div.addEventListener('click', function() {
      const idsanpham = listiphone.idsanpham;
      localStorage.setItem("idsanpham", idsanpham);
      if (idsanpham) {
        window.location.href = "auth.chitiet.html";
    } else {
        console.error("Không có giá trị productId để lưu vào localStorage.");
    }
    });
}
GetiPhone();

// Hàm tìm kiếm và lọc sản phẩm
function filterProductsByNameOrPrice(query) {
    const showweb = document.getElementById("showiphone");
    showweb.innerHTML = ''; // Xóa tất cả các sản phẩm hiện có

    filteredProducts = [];

    filteredProducts = originalProducts.filter(product => {
        const productPrice = parseFloat(product.giasale.replace(/\./g, ''));
        const productName = product.tensanpham.toLowerCase();
        const productDungluong = product.dungluong.toLowerCase();

        const priceThreshold = 0.1; // Phần trăm sự chênh lệch tối đa giữa giá nhập và giá sản phẩm
        const priceRange = productPrice * priceThreshold;

        return (
            (!isNaN(query) && Math.abs(productPrice - query) <= priceRange) ||
            productName.includes(query.toLowerCase()) ||
            productDungluong.includes(query.toLowerCase())
        );
    });

    filteredProducts.forEach(product => {
        ShowOnWeb(product); // Hiển thị sản phẩm đã lọc
    });
}

document.getElementById('formtimkiem').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchInput = document.getElementById('inputtimkiem').value;
  filterProductsByNameOrPrice(searchInput);
});
// Hàm sắp xếp sản phẩm theo giá tăng dần
function sortProductsAscending() {
  const showweb = document.getElementById("showiphone");
  showweb.innerHTML = ''; // Xóa tất cả các sản phẩm hiện có

  filteredProducts = originalProducts.slice().sort((a, b) => {
      const priceA = parseFloat(a.giasale.replace(/\./g, ''));
      const priceB = parseFloat(b.giasale.replace(/\./g, ''));
      return priceA - priceB;
  });

  filteredProducts.forEach(product => {
      ShowOnWeb(product); // Hiển thị sản phẩm đã sắp xếp
  });
}

// Hàm sắp xếp sản phẩm theo giá giảm dần
function sortProductsDescending() {
  const showweb = document.getElementById("showiphone");
  showweb.innerHTML = ''; // Xóa tất cả các sản phẩm hiện có

  filteredProducts = originalProducts.slice().sort((a, b) => {
      const priceA = parseFloat(a.giasale.replace(/\./g, ''));
      const priceB = parseFloat(b.giasale.replace(/\./g, ''));
      return priceB - priceA;
  });

  filteredProducts.forEach(product => {
      ShowOnWeb(product); // Hiển thị sản phẩm đã sắp xếp
  });
}


// Xử lý sự kiện click vào button sắp xếp giá tăng dần
document.getElementById('sortAscendingBtn').addEventListener('click', function() {
  sortProductsAscending();
});

// Xử lý sự kiện click vào button sắp xếp giá giảm dần
document.getElementById('sortDescendingBtn').addEventListener('click', function() {
  sortProductsDescending();
});
