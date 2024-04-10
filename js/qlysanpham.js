  // Import the functions you need from the SDKs you need
  import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
document.getElementById('addsp').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0]; // Lấy tệp từ trường input

    if (!file) {
        console.log('Vui lòng chọn một tệp.');
        return;
    }
    let rowCount = 0;
    const storage = getStorage();
    const storageRef = ref(storage, 'iPhone/' + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Tải ảnh lên thành công!');
    setTimeout(() => {
        location.reload();
    }, 2000);
    });
   

});
function displayImages() {
    const storage = getStorage();
    const imagesRef = ref(storage, 'iPhone');
    listAll(imagesRef)
        .then((result) => {
            const imageTableBody = document.getElementById('imageTableBody');
            let rowCount = 0;
            result.items.forEach((imageRef) => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = imageRef.name;
                        img.classList.add('image-thumbnail'); // Thêm lớp để xác định kích thước hình ảnh

                        const newRow = imageTableBody.insertRow();
                        const sttCell = newRow.insertCell();
                        const nameCell = newRow.insertCell();
                        const imageCell = newRow.insertCell();
                        const deleteCell = newRow.insertCell();

                        sttCell.textContent = ++rowCount;
                        nameCell.textContent = imageRef.name; // Tên của hình ảnh
                        imageCell.appendChild(img); // Thêm hình ảnh vào ô
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Xoá';
                        deleteButton.addEventListener('click', function() {
                            deleteImage(imageRef);
                        });
                        deleteCell.appendChild(deleteButton);
                    });
            });
        });
}

// Gọi hàm displayImages() khi cần thiết
displayImages();
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
document.getElementById('getthongtin').addEventListener('click', function(event) {
    event.preventDefault();
    setTimeout(function() {
    GetURL();
    }, 1000);
})
function GetURL(){
    const nameanh = tentep.textContent;
    // let nameanh = document.getElementById("tentep").value;
    console.log(nameanh)
    const storage = getStorage();
    const imageRef = ref(storage, 'iPhone/' + nameanh);
    setTimeout(function() {
    getDownloadURL(imageRef)
  .then((url) => {
    console.log('URL của ảnh:', url);
    // Ở đây bạn có thể sử dụng URL để hiển thị ảnh trong HTML hoặc làm bất kỳ điều gì khác bạn muốn
    const urlimg= document.getElementById('urlanh');
    urlimg.textContent = url;
  })
  .catch((error) => {
    console.error('Lỗi khi lấy URL ảnh:', error);
  });
}, 1000);
}