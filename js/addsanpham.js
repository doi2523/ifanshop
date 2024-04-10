  // Import the functions you need from the SDKs you need
  import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref, onValue, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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

document.getElementById('addsp').addEventListener('submit', function(event) {
    event.preventDefault();
    AddSanPham();
  })

  function AddSanPham(){
    var tensanpham = document.getElementById('tensanpham').value;
    var dungluong = document.getElementById('dungluong').value;
    var giasale = document.getElementById('giasale').value;
    var giagoc = document.getElementById('giagoc').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    console.log(tensanpham)
    console.log(dungluong)
    console.log(giasale)
    console.log(giagoc)
    console.log(file.name)

    set(ref(database, 'sanpham/' + tensanpham),{
        tensanpham: tensanpham,
        dungluong: dungluong,
        giagoc: giagoc,
        giasale: giasale,
        file: file.name
    })
    .then(() => {
        alert("cập nhật thành công!");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    })
    .catch((error) => {
        alert("Đã xảy ra lỗi" + error.message);
    });
    
}
var stdNo =0;
var tbody = document.getElementById('additem')
function AddSanPhamToTable(tensanpham, dungluong, giasale, giagoc, file){
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td"); // Thêm cột cho nút xoá
    let td8 = document.createElement("td"); // Thêm cột cho nút sửa

    td1.innerHTML = ++stdNo;
    td2.innerHTML = tensanpham;
    td3.innerHTML = dungluong;
    td4.innerHTML = giasale;
    td5.innerHTML = giagoc;
    td6.innerHTML = file;

    // Tạo nút xoá
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Xoá';
    deleteBtn.setAttribute('data-name', tensanpham); // Lưu trữ tên của sản phẩm
    deleteBtn.addEventListener('click', deleteSanPham);
    
    // Tạo nút sửa
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Sửa';
    editBtn.setAttribute('data-name', tensanpham); // Lưu trữ tên của sản phẩm
    editBtn.addEventListener('click', editSanPham);

    // Thêm các nút vào hàng
    td7.appendChild(deleteBtn);
    td8.appendChild(editBtn);

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);

    tbody.appendChild(trow);
}
function AddAllSanPham(UserList){
    stdNo = 0; // Reset stdNo
    tbody.innerHTML = ""; // Không cần thiết, có thể loại bỏ dòng này
    UserList.forEach(element => {
        AddSanPhamToTable(element.tensanpham, element.dungluong, 
            element.giasale , element.giagoc, element.file);
    });
}
function GetAllSanPham(){
    const databaseRef = ref (database);

    get(child(databaseRef, "sanpham"))
    .then((snapshot)=>{
        var sanpham = [];

        snapshot.forEach(childSnapshot => {
            sanpham.push(childSnapshot.val());
        });

        AddAllSanPham(sanpham);
    })
}
window.onload = GetAllSanPham;


// Hàm sửa sản phẩm trực tiếp trên bảng
function editSanPham(event) {
    let productName = event.target.getAttribute('data-name');

    // Tìm hàng trong bảng chứa thông tin sản phẩm cần sửa
    let row = event.target.closest('tr');

    // Chuyển đổi các ô hiển thị thông tin thành các ô nhập để người dùng có thể sửa đổi
    let tdElements = row.querySelectorAll('td');
    tdElements[1].innerHTML = '<input type="text" value="' + tdElements[1].innerHTML + '">';
    tdElements[2].innerHTML = '<input type="text" value="' + tdElements[2].innerHTML + '">';
    tdElements[3].innerHTML = '<input type="text" value="' + tdElements[3].innerHTML + '">';
    tdElements[4].innerHTML = '<input type="text" value="' + tdElements[4].innerHTML + '">';
    tdElements[5].innerHTML = '<input type="text" value="' + tdElements[5].innerHTML + '">';

    // Thay đổi nút "Sửa" thành nút "Lưu"
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Lưu';
    saveButton.setAttribute('data-name', productName);
    saveButton.addEventListener('click', saveSanPham);

    event.target.replaceWith(saveButton);
}

// Hàm lưu sản phẩm sau khi sửa trực tiếp trên bảng
function saveSanPham(event) {
    let productName = event.target.getAttribute('data-name');

    // Tìm hàng trong bảng chứa thông tin sản phẩm cần lưu
    let row = event.target.closest('tr');

    // Lấy giá trị mới từ các ô nhập
    let newTenSanPham = row.querySelectorAll('input')[0].value;
    let newDungLuong = row.querySelectorAll('input')[1].value;
    let newGiaSale = row.querySelectorAll('input')[2].value;
    let newGiaGoc = row.querySelectorAll('input')[3].value;
    let newFile = row.querySelectorAll('input')[4].value;

    // Cập nhật dữ liệu vào cơ sở dữ liệu Firebase
    let productRef = ref(database, 'sanpham/' + productName);
    update(productRef, {
        tensanpham: newTenSanPham,
        dungluong: newDungLuong,
        giasale: newGiaSale,
        giagoc: newGiaGoc,
        file: newFile
    }).then(() => {
        console.log('Đã cập nhật sản phẩm có tên:', productName);
        // Cập nhật lại giao diện bảng sau khi cập nhật dữ liệu thành công
        row.querySelectorAll('td')[1].innerHTML = newTenSanPham;
        row.querySelectorAll('td')[2].innerHTML = newDungLuong;
        row.querySelectorAll('td')[3].innerHTML = newGiaSale;
        row.querySelectorAll('td')[4].innerHTML = newGiaGoc;
        row.querySelectorAll('td')[5].innerHTML = newFile;
        
        // Thay đổi nút "Lưu" thành nút "Sửa"
        let editButton = document.createElement('button');
        editButton.textContent = 'Sửa';
        editButton.setAttribute('data-name', productName);
        editButton.addEventListener('click', editSanPham);
        event.target.replaceWith(editButton);
    }).catch((error) => {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
    });
}
function confirmDelete(productName) {
    let confirmation = window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này?');
    if (confirmation) {
        deleteProduct(productName); // Nếu chọn "OK", gọi hàm để xoá sản phẩm
    } else {
        console.log('Người dùng đã hủy bỏ thao tác xoá sản phẩm.'); // Nếu chọn "Cancel", không làm gì cả
    }
}
// Hàm xoá sản phẩm
function deleteProduct(productName) {
    let productRef = ref(database, 'sanpham/' + productName);
    remove(productRef)
        .then(() => {
            alert('Đã xoá sản phẩm có tên:', productName);
            // Sau khi xoá thành công, bạn có thể cập nhật giao diện người dùng nếu cần
            setTimeout(() => {
                location.reload();
            }, 2000);
        })
        .catch((error) => {
            alert('Lỗi khi xoá sản phẩm:', error);
        });
}
// Hàm xử lý khi người dùng nhấn nút xoá sản phẩm
function deleteSanPham(event) {
    let productName = event.target.getAttribute('data-name');
    confirmDelete(productName); // Gọi hàm hiển thị cảnh báo xác nhận
}