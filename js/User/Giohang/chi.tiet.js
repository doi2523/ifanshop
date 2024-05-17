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

  //Function lấy dữ liệu từ cookies
function getCookie(name) {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }
  
  // Sử dụng hàm để lấy giá trị từ cookies
  const uidProfile = getCookie("id_profile");

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
    //   ClearLocal();
    }
  });
}
ImportChiTiet();
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
document.getElementById('addsp').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc submit form
    // AlertSuccess();
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
    console.log('Dung lượng đã chọn:', selectedCapacity);
    
    // Lấy giá trị của màu sắc
    const colorInputs = document.querySelectorAll('input[name="color"]');
    let selectedColor = '';
    colorInputs.forEach(input => {
        if (input.checked) {
            selectedColor = input.value;
        }
    });
    console.log('Màu sắc đã chọn:', selectedColor);

    const idsanpham = localStorage.getItem("idsanpham");
    const databaseRef = ref(database);
    const ProductRef = child(databaseRef, "sanpham/" + idsanpham);
    get(ProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        const ProductData = snapshot.val();

        const userCartRef = ref(database, "donhang/" + uidProfile);
        const newPostKey = idsanpham;
        get(child(userCartRef, newPostKey)).then((snapshot) => {
            if (snapshot.exists()) {
              const currentQuantity = parseInt(snapshot.val().soluong) || 0; // Chuyển đổi chuỗi thành số
              const newQuantity = currentQuantity + 1;
      
              update(ref(database, "donhang/" + uidProfile + "/" + newPostKey), {
                soluong: newQuantity.toString(),
              })
                .then(() => {
                  let ten= ProductData.tensanpham;
                  AlertGioHang(ten);
                  // alert("Đã cập nhật giỏ hàng!");
                  console.log(
                    "Giá trị đã được cập nhật vào cơ sở dữ liệu thành công!"
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
              set(ref(database, "donhang/" + uidProfile + "/" + newPostKey), {
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
function AlertSuccess(){
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
      title: "Thêm sản phẩm vào giỏ hàng thành công!",
      color: "#716add",
    });
  }