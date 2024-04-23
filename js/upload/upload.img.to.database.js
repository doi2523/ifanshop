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



function UploadAvatar() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0]; // Lấy tệp từ trường input

    if (!file) {
        // console.log('Vui lòng chọn một tệp.');
        // alert("Vui lòng chọn một tệp!")
        return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, 'Avatar/' + file.name);
    uploadBytes(storageRef, file)
        .then((snapshot) => {
            console.log('Tải ảnh lên thành công!');
            // setTimeout(() => {
            //     location.reload();
            // }, 2000);
        })
        .catch((error) => {
            console.error('Lỗi khi tải ảnh lên:', error);
        });
}
function GetURLAvatar() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0]; // Lấy tệp từ trường input

    if (!file) {
        // console.log('Vui lòng chọn một tệp.');
        // alert("Vui lòng chọn một tệp!")
        return;
    }
    const storage = getStorage();
    const imageRef = ref(storage, 'Avatar/' + file.name);
    getDownloadURL(imageRef)
        .then((url) => {
            // const img = document.createElement('img');
            // img.src = url;
            // img.alt = filenameProfile;
          
            //import url lên cookies
    //Cập nhật giá trị của tên file trong cookies
    function updateCookieWithFileName(URLfile) {
        // Kiểm tra xem fileName có tồn tại không
        if (fileName) {
            // Cập nhật giá trị của cookie filename_profile thành fileName
            document.cookie = "url_profile=" + URLfile;
            console.log(URLfile)
            window.location.reload();
        } else {
            console.error("Không có tên tệp được cung cấp.");
        }
    }
    // Lấy tên của tệp từ input file
    var URLfile = url;
    // Gọi hàm để cập nhật giá trị mới cho filename_profile
            updateCookieWithFileName(URLfile);
            


    // Lấy URL của tệp từ input file
    var fileURL = url;

    // Gọi hàm để cập nhật giá trị mới cho url_profile
    updateCookieWithFileURL(fileURL);
            
        })
    .catch((error) => {
            // console.error('Lỗi khi lấy ảnh từ Firebase:', error);
    });
}

document.getElementById('file-input').addEventListener('change', function () {
    UploadAvatar();
    // GetURLAvatar();
});
// document.getElementById('update-profile').addEventListener('submit', function (event) {
//     event.preventDefault();
//     UploadAvatar();
// });
