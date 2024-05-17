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
function GetDonhang() {
        const database = getDatabase();
        const databaseRef = ref(database, "donhang/" + uidProfile);
      
        // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
        onChildAdded(
          databaseRef,
          (snapshot) => {
            const donhang = snapshot.val();
            displayDonhang(donhang, snapshot.key);
          },
          (error) => {
            console.error("Error getting messages: ", error);
          }
        );
      }      
// Hàm hiển thị thông tin của đơn hàng và cập nhật tổng giá trị
function displayDonhang(donhang, newPostKey) {
    const donhangs = document.getElementById("hienthi");
    const tr = document.createElement("tr");

    // Tạo các ô <td> trong hàng
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    // Thiết lập nội dung cho các ô <td>
    const img = document.createElement("img");
    img.src = donhang.url;
    img.alt = "Hình ảnh sản phẩm";
    img.style.maxWidth = "70px";
    img.style.height = "auto";
    td1.appendChild(img);

    td2.innerHTML = `
        ${donhang.tensanpham}<br>
        Màu: ${donhang.color}<br>
        Dung lượng: ${donhang.dungluong}<br>
        Phương thức: ${donhang.payment}
    `;

    // Chuyển giá trị số sang kiểu Number và định dạng với dấu chấm mỗi 3 chữ số
    const formattedGiaSale = parseFloat(donhang.giasale).toLocaleString();
    // Gán giá trị đã định dạng vào ô td3
    td3.textContent = `${formattedGiaSale}₫`;

    // Tạo thanh điều chỉnh số lượng
    td4.innerHTML = `
        <div class="input-group">
            <button class="btn btn-outline-secondary" type="button" id="decrease-${newPostKey}">
                <i class="bi bi-dash"></i>
            </button>
            <input type="number" class="form-control quantity-input" style="width: 50px" value="${donhang.soluong}" id="quantity-${newPostKey}">
            <button class="btn btn-outline-secondary" type="button" id="increase-${newPostKey}">
                <i class="bi bi-plus"></i>
            </button>
            <button class="btn btn-danger mx-2" type="button" id="delete-${newPostKey}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // Thêm các ô <td> vào hàng
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    // Thêm hàng vào tbody
    donhangs.appendChild(tr);

    // Thêm sự kiện cho các nút tăng giảm số lượng
    document.getElementById(`decrease-${newPostKey}`).addEventListener('click', function() {
        const quantityInput = document.getElementById(`quantity-${newPostKey}`);
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 0) {
            quantityInput.value = currentQuantity - 1;
        }
    });

    document.getElementById(`increase-${newPostKey}`).addEventListener('click', function() {
        const quantityInput = document.getElementById(`quantity-${newPostKey}`);
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    });

    // Thêm sự kiện cho nút xoá
    document.getElementById(`delete-${newPostKey}`).addEventListener('click', function() {
        // Xử lý việc xóa đơn hàng tại đây
        donhangs.removeChild(tr);
        DeleteDonHang(newPostKey, donhang.tensanpham);
        updateTotalAmount(); // Cập nhật tổng giá trị khi xóa
        updateTotalQuantity(newPostKey);
    });

// Lắng nghe sự kiện click trên nút "Lưu thay đổi"
document.getElementById(`savethaydoi`).addEventListener('click', function() {
    // Lấy giá trị của ô input
    const quantityInput = document.getElementById(`quantity-${newPostKey}`);
    const quantityValue = parseInt(quantityInput.value);
    // Log giá trị của ô input ra console
    console.log("Giá trị của ô input:", quantityValue);
    
    if (quantityValue === 0) {
        // Nếu số lượng mới là 0, xoá sản phẩm khỏi danh sách
        // Lấy ra tất cả các hàng trong bảng
        const rows = document.querySelectorAll("#hienthi tr");

        // Duyệt qua từng hàng
        rows.forEach(row => {
            // Lấy giá trị số lượng từ ô input trong hàng hiện tại
            const quantity = parseInt(row.querySelector(".quantity-input").value);

            // Kiểm tra nếu số lượng là 0
            if (quantity === 0) {
                // Xóa hàng hiện tại khỏi bảng
                row.remove();
            }
        });

        DeleteDonHang(newPostKey, donhang.tensanpham);
    } else {
        // Nếu số lượng mới không phải là 0, tiến hành cập nhật vào cơ sở dữ liệu
        update(ref(database, "donhang/" + uidProfile + "/" + newPostKey), {
            soluong: quantityValue.toString(),
        })
        .then(() => {
            AlertUpdate();
            updateTotalQuantity(); // Cập nhật tổng số lượng
            updateTotalAmount(); // Cập nhật tổng giá trị khi thay đổi số lượng
            console.log("Giá trị đã được cập nhật vào cơ sở dữ liệu thành công!");
        })
        .catch((error) => {
            console.error("Đã xảy ra lỗi khi cập nhật giá trị vào cơ sở dữ liệu:", error);
        });
    }
});



    // Cập nhật tổng giá trị khi hiển thị đơn hàng ban đầu
    updateTotalAmount();
    updateTotalQuantity(newPostKey);
}

// Hàm tính và cập nhật tổng giá trị của đơn hàng
function updateTotalAmount() {
    let totalAmount = 0;
    const rows = document.querySelectorAll("#hienthi tr");
    rows.forEach(row => {
        const quantity = parseInt(row.querySelector(".quantity-input").value);
        const giaSale = parseFloat(row.querySelector("td:nth-child(3)").textContent.replace("₫", "").replace(/\./g, "").replace(",", ""));
        totalAmount += quantity * giaSale;
    });
    // Định dạng giá trị tổng thành chuỗi có dấu chấm ngăn cách mỗi 3 chữ số
    const formattedTotalAmount = totalAmount.toLocaleString();
    // Lấy tham chiếu đến phần tử <span> có id là "tongtien"
    const tongtienSpan = document.getElementById("tongtien");
    // Xoá giá trị cũ trong phần tử <span>
    tongtienSpan.textContent = "";
    // Gán giá trị tổng mới vào phần tử <span>
    tongtienSpan.textContent = formattedTotalAmount;
}
// Hàm tính và cập nhật tổng số lượng của đơn hàng
function updateTotalQuantity() {
    let totalQuantity = 0;
    const rowsToRemove = []; // Mảng chứa các hàng cần xoá
    const rows = document.querySelectorAll("#hienthi tr");
    rows.forEach(row => {
        const quantity = parseInt(row.querySelector(".quantity-input").value);
        if (quantity > 0) {
            totalQuantity += quantity;
        } else {
            // Nếu số lượng là 0, thêm hàng vào mảng rowsToRemove
            rowsToRemove.push(row);
        }
    });
    // Xoá các hàng trong mảng rowsToRemove
    rowsToRemove.forEach(row => {
        row.remove();
    });
    // Hiển thị tổng số lượng trong phần tử <span> có id là "tongsoluong"
    const tongSoLuongSpan = document.getElementById("tongsoluong");
    tongSoLuongSpan.textContent = totalQuantity;
}

// Gọi hàm GetDonhang để bắt đầu quá trình lấy dữ liệu và hiển thị
GetDonhang();
function DeleteDonHang(newPostKey, tensp) {
    let productRef = ref(database, "donhang/" + uidProfile + "/" + newPostKey);
    remove(productRef)
      .then(() => {
        AlertGioHang(tensp);
      })
      .catch((error) => {
        // alert("Lỗi khi xoá sản phẩm:", error);
      });
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
      title: "Xoá '"+ten+"' khỏi giỏ hàng thành công!",
      color: "#716add",
    });
  }
  function AlertUpdate(){
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
      title: "Cập nhật số lượng thành công!",
      color: "#716add",
    });
  }