  // Import the functions you need from the SDKs you need
  import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref, onValue, get, child, remove, update , onChildAdded, push} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCnZzlFSm-61oaNvO2TTJyef2PMc6iU8DY",
    authDomain: "user-inifanshop.firebaseapp.com",
    databaseURL: "https://user-inifanshop-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "user-inifanshop",
    storageBucket: "user-inifanshop.appspot.com",
    messagingSenderId: "104690936940",
    appId: "1:104690936940:web:5398fbb0edae0c7a76bc49",
    measurementId: "G-NLBDR28748"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth();
const firebaseApp = getApp();
  


//Function lấy dữ liệu từ cookies
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

// Sử dụng hàm để lấy giá trị từ cookies
const uidProfile = getCookie("id_profile")
const emailProfile = getCookie("email_profile");
const hotenProfile = getCookie("hoten_profile");
const passwordProfile = getCookie("password_profile");
const sdtProfile = getCookie("sdt_profile");
const usernameProfile = getCookie("username_profile");
const filenameProfile = getCookie("filename_profile");
const URLProfile = getCookie("url_profile");

function GetiPhone() {
    const database = getDatabase();
    const databaseRef = ref(database, "webiphone");

    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef, (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    }, (error) => {
        console.error("Error getting messages: ", error);
    });
}

let itemCount = 1; // Biến đếm số lượng mục

function displayMessage(message) {
    const messages = document.getElementById('showiphone');
    const div = document.createElement('div');

    // Tính phần trăm giảm giá
    const giamGia = ((1 - (message.giasale / message.giagoc)) * 100).toFixed(0);

    div.innerHTML = `
        <div class="item item${itemCount}">
            <div class="grid-item">
                <div class="tag-voucher">
                    <img src="images/0-phantram.png" alt="">
                </div>
                <div class="img-ip" id="img-sanpham">
                    <img src="${message.urlpicture}" alt="">
                </div>
                <div class="txt-name">${message.tensanpham} ${message.dungluong}</div>
                <div class="giatien">
                    <span id="gia-uu-dai">${message.giasale}₫</span>
                    <span id="giagoc">${message.giagoc}₫</span>
                    <span id="phan-tram">-${giamGia}%</span>
                </div>
                <div class="adding">
                    <button class="add-shoping" id="add-cart" type="button">
                        <a href="#" class="add-to-cart">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                        <span id="text-add-shoping">Thêm vào giỏ hàng</span>
                    </button>
                </div>               
            </div>
        </div>`;
    messages.appendChild(div);
    itemCount++; // Tăng biến đếm số lượng mục    
    
div.querySelector('#add-cart').addEventListener('click', function() {
    // Lấy giá trị của ô đã bấm và in ra console
    console.log(message.urlpicture);

    // Tạo một tham chiếu con dựa trên user.uid
    const userCartRef = child(ref(database, 'donhang/' + uidProfile), 'new_post_key');

    // Tạo một key mới và đẩy giá trị vào cơ sở dữ liệu
    const newPostRef = push(userCartRef);
    const newPostKey = newPostRef.key;

    // Lưu giá trị vào database với key mới
    set(ref(database, 'donhang/' + uidProfile + '/' + newPostKey), {
        tensanpham: message.tensanpham,
        dungluong: message.dungluong,
        url: message.urlpicture,
        giasale: message.giasale,
        soluong: "",
        color: "",
    }).then(() => {
        alert("Đã thêm vào giỏ hàng!")
        console.log("Giá trị đã được lưu vào cơ sở dữ liệu thành công!");
    }).catch((error) => {
        console.error("Đã xảy ra lỗi khi lưu giá trị vào cơ sở dữ liệu:", error);
    });
});

};
GetiPhone();

function GetDonhang() {
    const database = getDatabase();
    const databaseRef = ref(database, "donhang/" + uidProfile);

    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef, (snapshot) => {
        const donhang = snapshot.val();
        displayDonhang(donhang);
    }, (error) => {
        console.error("Error getting messages: ", error);
    });
}

function displayDonhang(donhang) {
    const donhangs = document.getElementById('donhang');
    const li = document.createElement('li');

    li.innerHTML = `
                <div class="d-flex">
                          <img src="${donhang.url}" alt="" style="height: 80px;">
                          <div class="p-3">
                            <h6>Name: ${donhang.tensanpham}</h6>
                            <span>Giá tiền: ${donhang.giasale}</span><br>
                            <span>Số lượng:</span>
                          </div>
            </div>
            <div class="p-3">
              <span>Thành tiền:</span>
              <span style="float: right;">${donhang.giasale}</span>
            </div>`;
    donhangs.appendChild(li);

};
GetDonhang();

function GetDonhangWeb() {
    const database = getDatabase();
    const databaseRef = ref(database, "donhang/" + uidProfile);

    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef, (snapshot) => {
        const donhangweb = snapshot.val();
        displayDonhangWeb(donhangweb);
    }, (error) => {
        console.error("Error getting messages: ", error);
    });
}

function displayDonhangWeb(donhangweb) {
    const donhangwebs = document.getElementById('donhangweb');
    const li = document.createElement('li');

    li.innerHTML = `
  <div class="product">
    <div class="product-image">
      <img src="${donhangweb.url}">
    </div>
    <div class="product-details">
      <div class="product-title">${donhangweb.tensanpham}</div>
      <p class="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p>
    </div>
    <div class="product-price">${donhangweb.giasale}</div>
    <div class="product-quantity">
      <input type="number" value="2" min="1">
    </div>
    <div class="product-removal">
      <button class="remove-product">
        Remove
      </button>
    </div>
    <div class="product-line-price">${donhangweb.giasale}</div>
  </div>`;
    donhangwebs.appendChild(li);

};
GetDonhangWeb();
