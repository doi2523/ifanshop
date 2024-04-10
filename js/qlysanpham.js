  // Import the functions you need from the SDKs you need
  import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  import { getStorage,
     ref,
     uploadBytesResumable,
     getDownloadURL,
     uploadBytes,
     listAll,
     deleteObject } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
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


// Lắng nghe sự kiện khi người dùng nhấn nút submit trong form
document.getElementById('add-file').addEventListener('click', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0]; // Lấy tệp từ trường input

    if (!file) {
        console.log('Vui lòng chọn một tệp.');
        return;
    }
    let rowCount = 0;
    if (file) {
        const fileInfo = {
            stt: ++rowCount,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
        };
        displayFileInfo(fileInfo);
    }
    function displayFileInfo(fileInfo) {
        const tableBody = document.getElementById('fileInfoBody');

        // Xóa các dòng cũ trong bảng
        tableBody.innerHTML = '';

        // Tạo một dòng mới cho thông tin của tệp
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${fileInfo.stt}</td>
            <td>${fileInfo.fileName}</td>
            <td>${fileInfo.fileSize}</td>
            <td>${fileInfo.fileType}</td>
        `;

        tableBody.appendChild(newRow);
    }

    const storage = getStorage();
    // Tạo một ID ngẫu nhiên
    const uniqueId = generateUniqueId();
    document.getElementById('id-file').value = file.name;

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }
    const storageRef = ref(storage, 'iPhone/' + file.name);
    

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    //   setTimeout(() => {
    //     location.reload();
    // }, 2000);
    });
   

});
const storage = getStorage();
const uid = document.getElementById('id-file').value;
console.log('Giá trị từ ô input:', uid);
const listRef = ref(storage, 'iPhone');
const imagesRef = ref(storage, 'iPhone');

    // Lấy danh sách tất cả các tệp hình ảnh
    listAll(imagesRef)
        .then((result) => {
            const imageTableBody = document.getElementById('imageTableBody');
            let rowCount = 0;
            result.items.forEach((imageRef) => {
                // Lấy URL tải xuống của hình ảnh
                getDownloadURL(imageRef)
        .then((url) => {
            // Tạo một thẻ <img> để hiển thị hình ảnh
            const img = document.createElement('img');
            img.src = url;
            img.alt = imageRef.name;
            img.classList.add('image-thumbnail'); // Thêm lớp để xác định kích thước hình ảnh

            // Tạo một hàng mới trong bảng
            const newRow = imageTableBody.insertRow();
            const sttCell = newRow.insertCell();
            const nameCell = newRow.insertCell();
            const imageCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();

            // Đặt nội dung cho các ô
            sttCell.textContent = ++rowCount;
            nameCell.textContent = imageRef.name; // Tên của hình ảnh
            imageCell.appendChild(img); // Thêm hình ảnh vào ô

            // Nếu bạn muốn thêm các thông tin khác, hãy tạo các ô khác và đặt nội dung cho chúng
            // Tạo nút xoá
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Xoá';
            deleteButton.addEventListener('click', function() {
                deleteImage(imageRef);
            });

            // Thêm nút xoá vào ô
            deleteCell.appendChild(deleteButton);
        })
        })
        // .catch((error) => {
        //     console.error('Lỗi khi lấy URL tải xuống:', error);
        // });
            });
// document.getElementById('reloadd').addEventListener('click', function() {
//     const uid = document.getElementById('id-file').value;
//     const storage = getStorage();

//     console.log('Giá trị từ ô input:', uid);
//     const listRef = ref(storage, 'iPhone');
//     const imagesRef = ref(storage, 'iPhone');

//         // Lấy danh sách tất cả các tệp hình ảnh
//         listAll(imagesRef)
//             .then((result) => {
//                 const imageTableBody = document.getElementById('imageTableBody');
//                 let rowCount = 0;
//                 result.items.forEach((imageRef) => {
//                     // Lấy URL tải xuống của hình ảnh
//                     getDownloadURL(imageRef)
//             .then((url) => {
//                 // Tạo một thẻ <img> để hiển thị hình ảnh
//                 const img = document.createElement('img');
//                 img.src = url;
//                 img.alt = imageRef.name;
//                 img.classList.add('image-thumbnail'); // Thêm lớp để xác định kích thước hình ảnh

//                 // Tạo một hàng mới trong bảng
//                 const newRow = imageTableBody.insertRow();
//                 const sttCell = newRow.insertCell();
//                 const nameCell = newRow.insertCell();
//                 const imageCell = newRow.insertCell();
//                 const deleteCell = newRow.insertCell();

//                 // Đặt nội dung cho các ô
//                 sttCell.textContent = ++rowCount;
//                 nameCell.textContent = imageRef.name; // Tên của hình ảnh
//                 imageCell.appendChild(img); // Thêm hình ảnh vào ô

//                 // Nếu bạn muốn thêm các thông tin khác, hãy tạo các ô khác và đặt nội dung cho chúng
//                 // Tạo nút xoá
//                 const deleteButton = document.createElement('button');
//                 deleteButton.textContent = 'Xoá';
//                 deleteButton.addEventListener('click', function() {
//                     deleteImage(imageRef);
//                 });

//                 // Thêm nút xoá vào ô
//                 deleteCell.appendChild(deleteButton);
//             })
//             })
//             // .catch((error) => {
//             //     console.error('Lỗi khi lấy URL tải xuống:', error);
//             // });
//                 });
//             })
            // .catch((error) => {
            //     console.error('Lỗi khi lấy danh sách tệp hình ảnh:', error);
            // });

        // Hàm xoá hình ảnh
// Hàm xoá hình ảnh
function deleteImage(imageRef) {
    // Hiển thị hộp thoại xác nhận
    const confirmation = window.confirm("Bạn có chắc chắn muốn xoá hình ảnh này?");
    if (confirmation) {
        // Xoá tệp hình ảnh
        deleteObject(imageRef)
            .then(() => {
                console.log('Xoá tệp hình ảnh thành công');
                // Hiển thị thông báo alert
                window.alert('Xoá tệp hình ảnh thành công!');
                // Reload lại trang sau 2 giây
                // setTimeout(() => {
                    location.reload();
                // }, 2000);
            })
            .catch((error) => {
                console.error('Lỗi khi xoá tệp hình ảnh:', error);
                // Hiển thị thông báo alert nếu có lỗi
                window.alert('Đã xảy ra lỗi khi xoá tệp hình ảnh.');
            });
    }
}


