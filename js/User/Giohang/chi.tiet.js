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

function ImportChiTiet(){
  // Lấy dữ liệu từ localStorage
  const idsanpham = localStorage.getItem("idsanpham");
  console.log(idsanpham);
  const databaseRef = ref(database);
  const ProductRef = child(databaseRef, "sanpham/" + idsanpham);
  get(ProductRef).then((snapshot) => {
    if (snapshot.exists()) {
      const ProductData = snapshot.val();

      const value_idsanpham = ProductData.idsanpham;
      const value_soluong = ProductData.soluong;
      const value_tensp = ProductData.tensanpham;
      const value_dungluong = ProductData.dungluong;
      const value_giagoc = ProductData.giagoc;
      const value_giasale = ProductData.giasale;
      const value_url = ProductData.picture;

      const namesanpham = document.getElementById('namesanpham');
      const giagoc = document.getElementById('giagocchitiet');
      const giasale = document.getElementById('giasale');
      namesanpham.textContent = value_tensp;
      giagoc.textContent = formatPrice(value_giagoc)+ "₫";
      giasale.textContent = formatPrice(value_giasale)+ "₫";
      // Xoá idsanpham_sua từ localStorage
      // ClearLocal();

      const thongTinDiv = document.getElementById('thongtin');
  // Tính phần trăm giảm giá
  const giamGia = ((1 - value_giasale / value_giagoc) * 100).toFixed(0);

      thongTinDiv.innerHTML = `
          <div class="border-thongtin float-center border">
              <div class="d-flex float-center justify-content-center">
              <img src="${value_url}" alt="">
              </div>
          <hr>
            <p>Tên: <span class="text-blue">${value_tensp}</span></p>
            <p>Dung lượng: <span class="text-blue">${value_dungluong}</span></p>
            <p>Giá gốc: <span class="text-blue giagoc">${formatPrice(value_giagoc)+ "₫"}</span></p>
            <p>Giá sale: <span class="text-blue">${formatPrice(value_giasale)+ "₫"}</span> <span class="phan-tram">    -${giamGia}%</span></p>
          </div>
      `;
      
    }
  });
}
ImportChiTiet();
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
document.getElementById('addsp').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc submit form
    // Lấy giá trị của phương thức thanh toán
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    console.log('Phương thức thanh toán:', paymentMethod);
    // Lấy giá trị của dung lượng
    const capacityInputs = document.querySelectorAll('input[name="capacity"]');
    let selectedCapacity = '';
    capacityInputs.forEach(input => {
        if (input.checked) {
            selectedCapacity = input.value;
        }
    });
    // console.log('Dung lượng đã chọn:', selectedCapacity);
    // Lấy giá trị của màu sắc
    const colorInputs = document.querySelectorAll('input[name="color"]');
    let selectedColor = '';
    colorInputs.forEach(input => {
        if (input.checked) {
            selectedColor = input.value;
        }
    });
    // console.log('Màu sắc đã chọn:', selectedColor);

    const idsanpham = localStorage.getItem("idsanpham");
    const databaseRef = ref(database);
    //Lấy thông tin sản phẩm thông qua id sản phẩm phẩm
    const ProductRef = child(databaseRef, "sanpham/" + idsanpham);
    get(ProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        const ProductData = snapshot.val();

        const userCartRef = ref(database, "donhang/" + uidProfile);
        const newPostKey = idsanpham;
        //Kiểm tra trong database tồn tại sản phẩm này trong giỏ chưa
        get(child(userCartRef, newPostKey)).then((snapshot) => {
          //Nếu tồn tại thì lấy giá trị cũ cộng thêm thêm 1
            if (snapshot.exists()) {
              const currentQuantity = parseInt(snapshot.val().soluong) || 0; // Chuyển đổi chuỗi thành số
              const newQuantity = currentQuantity + 1;
      
              update(ref(database, "Giohang/" + uidProfile + "/" + newPostKey), {
                soluong: newQuantity.toString(),
              })
                .then(() => {
                  let ten= ProductData.tensanpham;
                  AlertGioHang(ten);
                  console.log("Giá trị đã được cập nhật vào cơ sở dữ liệu thành công!"
                  );
                  if (idsanpham) {
                    // Điều hướng sau 3 giây
                    setTimeout(function() {
                        window.location.href = "auth.giohang.html";
                    }, 3000);
                } else {
                    console.error("Không có giá trị productId để lưu vào localStorage.");
                }
                })
                .catch((error) => {
                  console.error(
                    "Đã xảy ra lỗi khi cập nhật giá trị vào cơ sở dữ liệu:",
                    error
                  );
                });
            } else {
              //Nếu chưa tồn tại thì tạo mới
              set(ref(database, "Giohang/" + uidProfile + "/" + newPostKey), {
                tensanpham: ProductData.tensanpham,
                dungluong: selectedCapacity,
                url: ProductData.picture,
                giasale: ProductData.giasale,
                soluong: "1",
                color: selectedColor,
                payment: paymentMethod
              })
                .then(() => {
                  let ten= ProductData.tensanpham;
                  AlertGioHang(ten);
                  // alert("Đã thêm vào giỏ hàng!");
                  console.log("Giá trị đã được lưu vào cơ sở dữ liệu thành công!");
                  if (idsanpham) {
                        // Điều hướng sau 3 giây
                        setTimeout(function() {
                            window.location.href = "auth.giohang.html";
                        }, 3000);
                    } else {
                    console.error("Không có giá trị productId để lưu vào localStorage.");
                    }
                })
                .catch((error) => {
                  console.error(
                    "Đã xảy ra lỗi khi lưu giá trị vào cơ sở dữ liệu:",
                    error
                  );
                });
            }
          });
      }
    })

});
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
      title: "Thêm '"+ten+"' vào giỏ hàng thành công!",
      color: "#716add",
    });
}

  const slider = document.querySelector('.slider');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const images = document.querySelectorAll('.slider img');
  let totalImages = images.length;
  let currentIndex = 1; // Bắt đầu từ hình ảnh đầu tiên đã nhân bản
  let imageWidth = 300; // Chiều rộng của mỗi hình ảnh
  
  // Nhân bản hình ảnh đầu và cuối và thêm chúng vào slider
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[totalImages - 1].cloneNode(true);
  sliderWrapper.appendChild(firstClone);
  sliderWrapper.insertBefore(lastClone, images[0]);
  
  // Cập nhật totalImages để bao gồm cả các hình ảnh đã nhân bản
  totalImages += 2;
  
  window.addEventListener('resize', () => {
      imageWidth = images[0].clientWidth;
      updateSlide();
  });
  
  document.querySelector('.next').addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= totalImages) {
          sliderWrapper.style.transition = 'none'; // Vô hiệu hóa transition để nhảy ngay lập tức
          currentIndex = 1; // Nhảy đến hình ảnh đầu tiên đã nhân bản
          sliderWrapper.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
      } else {
          updateSlide();
      }
  });
  
  document.querySelector('.prev').addEventListener('click', () => {
      currentIndex--;
      if (currentIndex <= 0) {
          sliderWrapper.style.transition = 'none'; // Vô hiệu hóa transition để nhảy ngay lập tức
          currentIndex = totalImages - 2; // Nhảy đến hình ảnh cuối cùng đã nhân bản
          sliderWrapper.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
      } else {
          updateSlide();
      }
  });
  
  function updateSlide() {
      sliderWrapper.style.transition = 'transform 0.5s ease';
      sliderWrapper.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
  }
  
  function autoSlide() {
      currentIndex++;
      if (currentIndex >= totalImages) {
          sliderWrapper.style.transition = 'none'; // Vô hiệu hóa transition để nhảy ngay lập tức
          currentIndex = 1; // Nhảy đến hình ảnh đầu tiên đã nhân bản
          sliderWrapper.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
      } else {
          updateSlide();
      }
  }
  
  setInterval(autoSlide, 3000); // Thay đổi hình ảnh mỗi 3 giây
  