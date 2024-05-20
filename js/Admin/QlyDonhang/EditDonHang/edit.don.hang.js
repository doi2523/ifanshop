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
  


function GetDonhang(MaNguoiMua, MaDonhangSua) {
    const database = getDatabase();
    var MaDonhangSua = localStorage.getItem('MaDonhangSua');
    var MaNguoiMua = localStorage.getItem('MaNguoiMua');
    const h1madonhang = document.getElementById("h1madonhang");
    h1madonhang.textContent = MaDonhangSua;
    const DataRef = ref(database, "Donhang/" + MaNguoiMua + "/" + MaDonhangSua);
        
    get(DataRef).then((snapshot) => {
        const ThongTinDonhang = snapshot.val();
        if (ThongTinDonhang) {
            const time = ThongTinDonhang.time;
            const soluongmua = ThongTinDonhang.tongsl;
            const tongtien = ThongTinDonhang.tongtien;
            const hoten = ThongTinDonhang.hoten;
            const sdt = ThongTinDonhang.sdt;
            const diachi = ThongTinDonhang.diachi;
            const mail = ThongTinDonhang.mail;
            const thongtindonhang = ThongTinDonhang.thongtindonhang;
            displayDonhang(ThongTinDonhang, thongtindonhang, MaDonhangSua, MaNguoiMua)
            // Bạn có thể thực hiện các thao tác cần thiết với dữ liệu ở đây
            displayHienThi(ThongTinDonhang, thongtindonhang, MaDonhangSua, MaNguoiMua)
            console.log("Thông tin đơn hàng:", ThongTinDonhang);
        } else {
            console.log("Không tìm thấy thông tin đơn hàng.");
        }
    }).catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ database:", error);
    });
}

let rowCount = 0;

function displayDonhang(ThongTinDonhang, thongtindonhang, MaDonhangSua, MaNguoiMua) {
    const donhangs = document.getElementById("hienthi");
    const tr = document.createElement("tr");

    // Tạo HTML cho mỗi hàng
    let html = `
        <td data-madonhang="${MaDonhangSua}" class="ma-don-hang">${MaDonhangSua}</td>
        <td>
            <div class="product-info">
                <div>
                    Tên: <span style="color: #007bff;" id="table-hoten">${ThongTinDonhang.hoten}</span><br>
                    Số điện thoại: <span style="color: #007bff;" id="table-sdt">${ThongTinDonhang.sdt}</span><br>
                    Email: <span style="color: #007bff;" id="table-email">${ThongTinDonhang.mail}</span> <br>
                    Địa chỉ: <span style="color: #007bff;" id="table-diachi">${ThongTinDonhang.diachi}</span>
                </div>
            </div>
        </td>
    `;
    // Thêm thông tin của mỗi sản phẩm trong đơn hàng vào HTML
    thongtindonhang.forEach((item, index) => {
        html += `
        <div class="row">
        <div class="img-don-hang col-md-4">
            <img style="max-width: 90px; height: 100px;" src="${item.url}" alt="">
        </div>
        <div class="col-md-8" style="font-size: 13px;">
            Tên: <span style="color: #007bff;">${item.tensanpham}</span><br>
            Màu: <span style="color: #007bff;">${item.color}</span><br>
            Dung lượng: <span style="color: #007bff;">${item.dungluong}</span><br>
            Giá tiền: <span style="color: #007bff;">${item.giasale}</span><br>
            Số lượng: <span style="color: #007bff;">${item.soluong}</span><br>
            Phương thức: <span style="color: #007bff;">${item.payment}</span>
        </div>
    </div>    
        `;
            // Tạo sự kiện click
document.addEventListener('click', function(event) {
    // Kiểm tra xem phần tử được click có phải là phần tử chứa thông tin sản phẩm không
    if (event.target.classList.contains('img-don-hang') || event.target.parentElement.classList.contains('img-don-hang')) {
        // Thực hiện hành động khi click vào sản phẩm
        // Ví dụ: alert thông tin sản phẩm
        alert('Thông tin sản phẩm: ' +item.tensanpham);
    }
});
    });


    html += `</td>
    <td>
        <div class="product-info">
        <div>
        Số lượng mua: <span style="color: #007bff;">${ThongTinDonhang.tongsl}</span><br>
        Thành tiền: <span style="color: #007bff;">${parseFloat(ThongTinDonhang.tongtien).toLocaleString()}₫</span><br>
        Thời gian đặt: <span style="color: #007bff;">${ThongTinDonhang.time}</span><br>
        Tình trạng: <span style="color: #007bff;" id="tinhtrang-table">${ThongTinDonhang.tinhtrang}</span> <br>
        </div>
    </div>
    </td>
        `;

    tr.innerHTML = html;
    donhangs.appendChild(tr);
}

// Gọi hàm GetDonhang để bắt đầu quá trình lấy dữ liệu và hiển thị
GetDonhang();

function displayHienThi(ThongTinDonhang, thongtindonhang, MaDonhangSua, MaNguoiMua) {
    const container = document.getElementById('hienthiform');
        // Thêm thông tin của mỗi sản phẩm trong đơn hàng vào HTML
    console.log(thongtindonhang)

        // Duyệt qua mảng thongtindonhang và in từng giá trị
        thongtindonhang.forEach((item, index) => {
            console.log(`Sản phẩm ${index + 1}:`);
            console.log(`Tên sản phẩm: ${item.tensanpham}`);
            console.log(`Màu: ${item.color}`);
            console.log(`Dung lượng: ${item.dungluong}`);
            console.log(`Giá sale: ${item.giasale}`);
            console.log(`Phương thức thanh toán: ${item.payment}`);
            console.log(`Số lượng: ${item.soluong}`);
            console.log(`URL: ${item.url}`);
        });

        const htmlContent = `
        <div class="row">
          <!-- Thông tin đơn hàng -->
          <div class="col-md-6">
            <h1>Thông tin đơn hàng</h1>
            <div class="card">
              <div class="card-body">
                <form id="thongtindonhang">  
                  <div class="form-group">
                    <label for="span-madonhang">Mã đơn hàng:</label>
                    <span id="span-madonhang" style="color: #007bff;">${MaDonhangSua}</span>
                  </div>
                  <div class="form-group">
                    <label for="tongsl">Tổng số lượng sản phẩm:</label>
                    <span style="color: #007bff;">${ThongTinDonhang.tongsl}</span>
                  </div>
                  <div class="form-group">
                    <label for="tongtien">Tổng giá tiền:</label>
                    <input value="${ThongTinDonhang.tongtien}" class="form-control" id="tongtien">
                  </div>
                  <div class="form-group">
                    <label for="tinhtrang">Tình trạng:</label>
                    <select class="custom-select" id="tinhtrang">
                      <option value="Chờ xác nhận" ${ThongTinDonhang.tinhtrang === 'Chờ xác nhận' ? 'selected' : ''}>Chờ xác nhận</option>
                      <option value="Đang giao hàng" ${ThongTinDonhang.tinhtrang === 'Đang giao hàng' ? 'selected' : ''}>Đang giao hàng</option>
                      <option value="Đã xác nhận" ${ThongTinDonhang.tinhtrang === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                      <option value="Đơn hàng bị huỷ" ${ThongTinDonhang.tinhtrang === 'Đơn hàng bị huỷ' ? 'selected' : ''}>Đơn hàng bị huỷ</option>
                      <option value="Đã giao thành công" ${ThongTinDonhang.tinhtrang === 'Đã giao thành công' ? 'selected' : ''}>Đã giao thành công</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary float-right mt-2">Thay đổi</button>
                </form>
              </div>
            </div>
          </div>
          <!-- Thông tin người mua -->
          <div class="col-md-6">
            <h1>Thông tin người mua</h1>
            <div class="card" style="margin-top: 0;">
              <div class="card-body">   
                <form id="thongtinnguoidung">   
                  <p class="card-text" style="font-size: 15px; font-weight: bold;">
                    Tên người nhận: <input required value="${ThongTinDonhang.hoten}" class="form-control" id="tennguoinhan" style="color: #007bff;">
                  </p>
                  <p class="card-text" style="font-size: 15px; font-weight: bold;">
                    Số điện thoại: <input required value="${ThongTinDonhang.sdt}" class="form-control" id="sdtnguoinhan" style="color: #007bff;">
                  </p>
                  <p class="card-text" style="font-size: 15px; font-weight: bold;">
                    Email: <input required value="${ThongTinDonhang.mail}" class="form-control" id="emailnguoinhan" style="color: #007bff;">
                  </p>
                  <p class="card-text" style="font-size: 15px; font-weight: bold;">
                    Địa chỉ: <input required value="${ThongTinDonhang.diachi}" class="form-control" id="diachinguoinhan" style="color: #007bff;">
                  </p><hr>
                  <button type="submit"class="btn btn-primary float-right">Thay đổi</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- Sửa sản phẩm -->
        <div class="row">
    <div class="col-md-12">  
        <h1>Sửa sản phẩm</h1>
        <div class="card">
      <form id="suathongtin">
        ${thongtindonhang.map((item, index) => `
        <div class="row p-3">
          <div class="img-don-hang col-md-3">
            <img style="max-width: 120px; height: 130px;" src="${item.url}" alt="">
          </div>
          <div class="col-md-9">
            <div class="card-text" style="font-size: 15px; font-weight: bold;">
              <div class="row mb-3">
                <div class="col-md-4">Tên:</div>
                <div class="col-md-8"><span id="tensanpham-${index}" required style="color: #007bff;">${item.tensanpham}</span></div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">Màu:</div>
                <div class="col-md-8"><span id="color-${index}" required style="color: #007bff;">${item.color}</span></div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">Dung lượng:</div>
                <div class="col-md-8"><span id="dungluong-${index}" required style="color: #007bff;">${item.dungluong}</span></div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">Giá tiền:</div>
                <div class="col-md-8"><span id="giasale-${index}" required style="color: #007bff;">${item.giasale}</span></div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">Số lượng:</div>
                <div class="col-md-8"><span id="soluong-${index}" required style="color: #007bff;">${item.soluong}</span></div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">Phương thức:</div>
                <div class="col-md-8"><span id="payment-${index}" required style="color: #007bff;">${item.payment}</span></div>
              </div>
              <div class="row">
                <div class="col-md-12">
                <button type="submit" class="btn btn-success float-end">Thay Đổi</button></div>
              </div>
            </div>
          </div>        
        </div><hr>
        `).join('')}
      </form>
      
    </div>
  </div>
    </div>
  </div>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);

  // document.getElementById('deldonhang').addEventListener('click', function(event) {
    
      
  //   let DonhangRef = ref(database, "Donhang/" + MaNguoiMua + "/" + MaDonhangSua + "/thongtindonhang/" + index);
  //   remove(DonhangRef)
  //   .then(() => {
  //     AlertSuccess();
  //   })
  //   .catch((error) => {
  //       AlertError0();
  //   });
  // })
  document.querySelectorAll('.btn-danger').forEach((button, index) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const stt = index -1;
      console.log(stt)
      console.log(index);
      AlertConfirm(MaNguoiMua, MaDonhangSua, stt)
    })
  })
// Khởi tạo một biến để kiểm tra xem đã có nút "Lưu" hay chưa
let saveButtonAdded = false;

// Lặp qua mỗi nút "Thay Đổi" và thêm sự kiện "click" cho mỗi nút
document.querySelectorAll('.btn-success').forEach((button, index) => {
  button.addEventListener('click', (event) => {
    // Ngăn chặn hành vi mặc định của nút "Thay Đổi"
    event.preventDefault();

    // Nếu chưa có nút "Lưu" được thêm vào hoặc đã nhấp vào nút "Lưu" trước đó
    if (!saveButtonAdded) {
      // Lấy danh sách các thẻ <span> trong cùng một div
      const spans = document.querySelectorAll(`#suathongtin #tensanpham-${index}, #suathongtin #color-${index}, #suathongtin #dungluong-${index}, #suathongtin #giasale-${index}, #suathongtin #soluong-${index}, #suathongtin #payment-${index}`);

      // Lặp qua từng thẻ <span> và thay thế bằng thẻ <input> tương ứng
      spans.forEach(span => {
        const value = span.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.className = 'form-control';
        input.id = `${span.id}-input`; // Đặt id cho ô input mới
        span.parentNode.replaceChild(input, span);
      });

      // Tạo nút "Lưu" và thêm sự kiện "click" cho nút này
      const saveButton = document.createElement('button');
      saveButton.type = 'button';
      saveButton.textContent = 'Lưu';
      saveButton.className = 'btn btn-primary float-end';
      saveButton.addEventListener('click', () => {
        // Tạo object chứa thông tin cập nhật
        const updateData = {};
        // In ra console giá trị của từng ô input theo id của nó và index
        spans.forEach(span => {
          const input = document.getElementById(`${span.id}-input`);
          // console.log(input.value);
          // console.log(index);
          // Thay thế các thẻ <input> bằng thẻ <span> tương ứng
          span.textContent = input.value;
          input.parentNode.replaceChild(span, input);
          // Thêm giá trị vào object cập nhật
          const fieldName = span.id.split('-')[0]; // Lấy tên trường từ id
          updateData[fieldName] = input.value;
        });

        // Cập nhật vào cơ sở dữ liệu
        update(ref(database, "Donhang/" + MaNguoiMua + "/" + MaDonhangSua + "/thongtindonhang/" + index), updateData)
          .then(() => {
            AlertSuccess();
            // console.log("Cập nhật thành công!");
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
          });

        // Hiển thị nút "Thay Đổi" lại
        button.style.display = 'inline-block';
        saveButton.style.display = 'none';
        DeleteButton.style.display = 'none';

        // Đặt lại biến saveButtonAdded về false để cho phép thêm nút "Lưu" lần tiếp theo
        saveButtonAdded = false;
      });

            // Tạo nút "Lưu" và thêm sự kiện "click" cho nút này
      const DeleteButton = document.createElement('button');
      DeleteButton.type = 'button';
      DeleteButton.textContent = 'Xoá';
      DeleteButton.className = 'btn btn-danger float-end mx-2';

      DeleteButton.addEventListener('click', () => {

        AlertConfirm(MaNguoiMua, MaDonhangSua, index);
        // Hiển thị nút "Thay Đổi" lại
        button.style.display = 'inline-block';
        saveButton.style.display = 'none';
        DeleteButton.style.display = 'none';

        saveButtonAdded = true;
      });
      // Thêm nút "Lưu" vào sau nút "Thay Đổi"
      button.parentNode.appendChild(saveButton);
      button.parentNode.appendChild(DeleteButton);
      // Ẩn nút "Thay Đổi"
      button.style.display = 'none';

      // Đánh dấu là đã thêm nút "Lưu"
      saveButtonAdded = true;
    }
  });
});
document.getElementById('thongtindonhang').addEventListener('submit', function(event) {
    event.preventDefault();

    updateDonHang(MaNguoiMua, MaDonhangSua);
  })
document.getElementById('thongtinnguoidung').addEventListener('submit', function(event) {
    event.preventDefault();

    updateNguoidung(MaNguoiMua, MaDonhangSua);
  })
}
function updateDonHang(MaNguoiMua, MaDonhangSua) {
  const tongtienInput = document.getElementById(`tongtien`);
  const tinhtrangSelect = document.getElementById(`tinhtrang`);
  const tinhtrangTable = document.getElementById(`tinhtrang-table`);
  
  const tongtien = tongtienInput.value;
  const tinhtrang = tinhtrangSelect.value;
  
  let last_login_time = new Date();
  let formattedDateTime = last_login_time.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  update(ref(database, "Donhang/" + MaNguoiMua + "/" + MaDonhangSua), {
    tongtien: tongtien,
    tinhtrang: tinhtrang,
    timeupdatedonhang: formattedDateTime,
  }).then(() => {
    AlertSuccess();
    // Gán lại giá trị cho các trường đầu vào nếu cần thiết
    tongtienInput.value = tongtien;
    tinhtrangSelect.value = tinhtrang;
    tinhtrangTable.textContent = tinhtrang;
  }).catch((error) => {
    console.error('Error updating product:', error);
  });
}

function updateNguoidung(MaNguoiMua, MaDonhangSua) {
  const hotenInput = document.getElementById(`tennguoinhan`);
  const sdtInput = document.getElementById(`sdtnguoinhan`);
  const mailInput = document.getElementById(`emailnguoinhan`);
  const diachiInput = document.getElementById(`diachinguoinhan`);

  const hoten = hotenInput.value;
  const sdt = sdtInput.value;
  const mail = mailInput.value;
  const diachi = diachiInput.value;

  let last_login_time = new Date();
  let formattedDateTime = last_login_time.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  update(ref(database, "Donhang/" + MaNguoiMua +"/" +MaDonhangSua), {
    hoten: hoten,
    sdt: sdt,
    mail: mail,
    diachi: diachi,
    timeupdatenguoimua: formattedDateTime,
  }).then(() => {
    AlertSuccess();
    diachiInput.value=diachi;
    hotenInput.value=hoten;
    sdtInput.value=sdt;
    mailInput.value=mail;
    document.getElementById('table-hoten').textContent = hoten;
    document.getElementById('table-sdt').textContent = sdt;
    document.getElementById('table-email').textContent = mail;
    document.getElementById('table-diachi').textContent = diachi;
  }).catch((error) => {
    console.error('Error updating product:', error);
  });
}
function DelDonHang(MaNguoiMua, MaDonhangSua, index){
  let DonhangRef = ref(database, "Donhang/" + MaNguoiMua + "/" + MaDonhangSua + "/thongtindonhang/" + index);
  remove(DonhangRef)
  .then(() => {
    AlertSuccess();
  })
  .catch((error) => {
      AlertError0();
  });
}
function AlertConfirm(MaNguoiMua, MaDonhangSua, index){
    Swal.fire({
        title: "Bạn chắc không?",
        text: "Bạn sẽ xoá đơn hàng này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Đơn hàng này đã được xoá.",
          //   icon: "success"
          // });
          DelDonHang(MaNguoiMua, MaDonhangSua, index);
        }
      });
}

function TimKiem(MaNguoiDung, MaDonhangTim) {
    var tdList = document.querySelectorAll('td.ma-don-hang');

    // Lặp qua từng thẻ td chứa mã đơn hàng
    tdList.forEach(function(td) {
        var maDonHang = td.getAttribute('data-madonhang');

        // So sánh giá trị mã đơn hàng
        if (maDonHang === MaDonhangTim) {
            // Nếu tìm thấy mã đơn hàng, cuộn trang đến hàng đó và làm sáng hàng
            td.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Cuộn trang đến thẻ td chứa mã đơn hàng
            td.parentElement.classList.add('highlight-row'); // Thêm lớp CSS để làm sáng hàng chứa mã đơn hàng
            console.log("Đã tìm thấy mã đơn hàng:", maDonHang);
        } else {
            // Nếu không tìm thấy mã đơn hàng, loại bỏ lớp CSS làm sáng hàng
            td.parentElement.classList.remove('highlight-row');
        }
    });
}

function XoaLopTimKiem() {
    var trList = document.querySelectorAll('tr.highlight-row');

    // Lặp qua tất cả các hàng có lớp CSS 'highlight-row' và xoá lớp đó
    trList.forEach(function(tr) {
        tr.classList.remove('highlight-row');
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
    title: "Cập nhật thành công!",
    color: "#716add",
  });
}
function AlertError0(){
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
      icon: "error",
      title: "Đơn hàng không tồn tại!",
      color: "#716add",
    });
  }
function AlertError(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng nhập mã đơn hàng!",
      });
  }