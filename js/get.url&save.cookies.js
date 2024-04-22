  // Import the functions you need from the SDKs you need
  import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
const avatarProfile = getCookie("url_profile");
console.log(filenameProfile)



function GetURLAvatar(){
    const storage = getStorage();
    const imageRef = ref(storage, 'Avatar/' + filenameProfile);
    getDownloadURL(imageRef)
        .then((url) => {
            // const img = document.createElement('img');
            // img.src = url;
            // img.alt = filenameProfile;
          
            //import url lên cookies
    function updateCookieWithFileURL(fileURL) {
    // Kiểm tra xem fileURL có tồn tại không
    if (fileURL) {
        // Cập nhật giá trị của cookie url_profile thành fileURL
        document.cookie = "url_profile=" + fileURL;
        console.log(fileURL)
    } else {
        console.error("Không có URL tệp được cung cấp.");
    }
    }
    
    // Lấy URL của tệp từ input file
    var fileURL = url;

    // Gọi hàm để cập nhật giá trị mới cho url_profile
    updateCookieWithFileURL(fileURL);
            
        })
    .catch((error) => {
            // console.error('Lỗi khi lấy ảnh từ Firebase:', error);
    });
}

// Biến để đánh dấu xem đã gọi hàm GetURLAvatar() chưa
var avatarProfileCalled = false;

// Hàm để lấy giá trị của một cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Hàm để so sánh giá trị mới của cookie với giá trị trước đó
function checkForCookieChange(previousValue) {
    const currentValue = getCookie("url_profile");
    if (currentValue !== previousValue) {
        // Nếu giá trị mới khác với giá trị trước đó, chạy hàm UpdateThongtin()
        UpdateThongtin();
        // Cập nhật giá trị trước đó với giá trị mới để so sánh trong lần kiểm tra tiếp theo
        previousValue = currentValue;
    }
}

// Lưu trữ giá trị ban đầu của cookie "url_profile"
let previousAvatarProfile = getCookie("url_profile");

// Kiểm tra định kỳ xem giá trị của cookie "url_profile" có thay đổi không
setInterval(function() {
    checkForCookieChange(previousAvatarProfile);
}, 1000); // Kiểm tra mỗi giây
