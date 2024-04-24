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
    var idsanpham = document.getElementById('idsanpham').value;
    var soluong = document.getElementById('soluong').value;
    var tensanpham = document.getElementById('tensanpham').value;
    var dungluong = document.getElementById('dungluong').value;
    var giasale = document.getElementById('giasale').value;
    var giagoc = document.getElementById('giagoc').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    // console.log(tensanpham)
    // console.log(dungluong)
    // console.log(giasale)
    // console.log(giagoc)
    // console.log(file.name)

    set(ref(database, 'sanpham/' + idsanpham),{
        idsanpham: idsanpham,
        tensanpham: tensanpham,
        soluong: soluong,
        dungluong: dungluong,
        giagoc: giagoc,
        giasale: giasale,
        file: file.name
    })
    .then(() => {
        alert("Thêm sản phẩm '" +tensanpham+ "' thành công!");
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
function AddSanPhamToTable(idsanpham, tensanpham, dungluong,soluong, giasale, giagoc, file){
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td"); // Thêm cột cho nút xoá
    let td8 = document.createElement("td"); // Thêm cột cho nút sửa
    let td9 = document.createElement("td");
    let td10 = document.createElement("td");
    let td11 = document.createElement("td");

    td1.innerHTML = ++stdNo;
    td2.innerHTML = idsanpham;
    td3.innerHTML = tensanpham;
    td4.innerHTML = dungluong;
    td5.innerHTML = soluong;
    td6.innerHTML = giasale;
    td7.innerHTML = giagoc;
    td8.innerHTML = file;

    // Tạo nút xoá
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Xoá';
    deleteBtn.setAttribute('data-name', idsanpham); // Lưu trữ tên của sản phẩm
    deleteBtn.addEventListener('click', deleteSanPham);
    deleteBtn.classList.add('btn', 'btn-primary', 'btn-sm');
    
    // Tạo nút sửa
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Sửa';
    editBtn.setAttribute('data-name', idsanpham); // Lưu trữ tên của sản phẩm
    editBtn.addEventListener('click', editSanPham);
    editBtn.classList.add('btn', 'btn-primary', 'btn-sm');
    // Tạo nút "Copy"
    let copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.setAttribute('data-name', idsanpham); // Lưu trữ tên của sản phẩm
    copyBtn.addEventListener('click', copyProductId);
    copyBtn.classList.add('btn', 'btn-primary', 'btn-sm');

    // Thêm các nút vào hàng
    td9.appendChild(deleteBtn);
    td10.appendChild(editBtn);
    td11.appendChild(copyBtn);

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);
    trow.appendChild(td10);
    trow.appendChild(td11);

    tbody.appendChild(trow);
}
function AddAllSanPham(UserList){
    stdNo = 0; // Reset stdNo
    tbody.innerHTML = ""; // Không cần thiết, có thể loại bỏ dòng này
    UserList.forEach(element => {
        AddSanPhamToTable( element.idsanpham, element.tensanpham, element.dungluong, element.soluong,
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
    let productId = event.target.getAttribute('data-name');

    // Tìm hàng trong bảng chứa thông tin sản phẩm cần sửa
    let row = event.target.closest('tr');

    // Chuyển đổi các ô hiển thị thông tin thành các ô nhập để người dùng có thể sửa đổi
    let tdElements = row.querySelectorAll('td');
    tdElements[1].innerHTML = productId;
    tdElements[2].innerHTML = '<input type="text" value="' + tdElements[2].innerHTML + '">';
    tdElements[3].innerHTML = '<input type="text" value="' + tdElements[3].innerHTML + '">';
    tdElements[4].innerHTML = '<input type="text" value="' + tdElements[4].innerHTML + '">';
    tdElements[5].innerHTML = '<input type="text" value="' + tdElements[5].innerHTML + '">';
    tdElements[6].innerHTML = '<input type="text" value="' + tdElements[6].innerHTML + '">';
    tdElements[7].innerHTML = '<input type="text" value="' + tdElements[7].innerHTML + '">';


    // Thay đổi nút "Sửa" thành nút "Lưu"
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Lưu';
    saveButton.setAttribute('data-name', productId);
    saveButton.addEventListener('click', saveSanPham);
    saveButton.classList.add('btn', 'btn-primary', 'btn-sm');
    event.target.replaceWith(saveButton);
}

// Hàm lưu sản phẩm sau khi sửa trực tiếp trên bảng
function saveSanPham(event) {
    let productId= event.target.getAttribute('data-name');

    // Tìm hàng trong bảng chứa thông tin sản phẩm cần lưu
    let row = event.target.closest('tr');

    // Lấy giá trị mới từ các ô nhập
    // let newidsanpham = row.querySelectorAll('input')[0].value;
    let newTenSanPham = row.querySelectorAll('input')[0].value;
    let newDungLuong = row.querySelectorAll('input')[1].value;
    let newSoLuong = row.querySelectorAll('input')[2].value;
    let newGiaSale = row.querySelectorAll('input')[3].value;
    let newGiaGoc = row.querySelectorAll('input')[4].value;
    let newFile = row.querySelectorAll('input')[5].value;

    // Cập nhật dữ liệu vào cơ sở dữ liệu Firebase
    let productRef = ref(database, 'sanpham/' + productId);
    update(productRef, {
        tensanpham: newTenSanPham,
        dungluong: newDungLuong,
        soluong: newSoLuong,
        giasale: newGiaSale,
        giagoc: newGiaGoc,
        file: newFile
    }).then(() => {
        // console.log('Đã cập nhật sản phẩm có tên:', productId);
        alert("Đã cập nhật sản phẩm '" +newTenSanPham+ "' thành công!");
        // Cập nhật lại giao diện bảng sau khi cập nhật dữ liệu thành công
        row.querySelectorAll('td')[1].innerHTML = productId;
        row.querySelectorAll('td')[2].innerHTML = newTenSanPham;
        row.querySelectorAll('td')[3].innerHTML = newDungLuong;
        row.querySelectorAll('td')[4].innerHTML = newSoLuong;
        row.querySelectorAll('td')[5].innerHTML = newGiaSale;
        row.querySelectorAll('td')[6].innerHTML = newGiaGoc;
        row.querySelectorAll('td')[7].innerHTML = newFile;
        
        // Thay đổi nút "Lưu" thành nút "Sửa"
        let editButton = document.createElement('button');
        editButton.textContent = 'Sửa';
        editButton.setAttribute('data-name', productId);
        editButton.addEventListener('click', editSanPham);
        editButton.classList.add('btn', 'btn-primary', 'btn-sm');
        event.target.replaceWith(editButton);
    }).catch((error) => {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
    });
}
// Hàm xử lý khi người dùng nhấn nút xoá sản phẩm
function deleteSanPham(event) {
    let productId = event.target.getAttribute('data-name');
    confirmDelete(productId); // Gọi hàm hiển thị cảnh báo xác nhận
}
function confirmDelete(productId) {
    let confirmation = window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này?');
    if (confirmation) {
        deleteProduct(productId); // Nếu chọn "OK", gọi hàm để xoá sản phẩm
    } else {
        console.log('Người dùng đã hủy bỏ thao tác xoá sản phẩm.'); // Nếu chọn "Cancel", không làm gì cả
    }
}
// Hàm xoá sản phẩm
function deleteProduct(productId) {
    let productRef = ref(database, 'sanpham/' + productId);
    remove(productRef)
        .then(() => {
            alert("Đã xoá sản phẩm có id: '" + productId +" '");
            // Sau khi xoá thành công, bạn có thể cập nhật giao diện người dùng nếu cần
            setTimeout(() => {
                location.reload();
            }, 2000);
        })
        .catch((error) => {
            alert('Lỗi khi xoá sản phẩm:', error);
        });
}
function formatCurrency(input) {
    // Xóa tất cả ký tự không phải số khỏi giá trị nhập vào
    var value = input.value.replace(/[^0-9]/g, '');
    
    // Định dạng giá trị thành chuỗi hàng triệu
    var formattedValue = (Number(value) / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M';
    
    // Gán giá trị đã định dạng vào ô input
    input.value = formattedValue;
}

// Hàm sao chép ID sản phẩm vào clipboard
function copyProductId(event) {
    let productId = event.target.getAttribute('data-name');
    navigator.clipboard.writeText(productId)
        .then(() => {
            console.log('Đã sao chép ID sản phẩm thành công: ' + productId);
            alert('Đã sao chép ID sản phẩm thành công: ' + productId);
        })
        .catch(err => {
            console.error('Lỗi khi sao chép ID sản phẩm: ', err);
            alert('Đã xảy ra lỗi khi sao chép ID sản phẩm');
        });
}
