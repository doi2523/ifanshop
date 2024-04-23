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

console.log(uidProfile)
console.log(emailProfile);
console.log(hotenProfile);
console.log(passwordProfile);
console.log(sdtProfile);
console.log(usernameProfile);
console.log(filenameProfile);
console.log(avatarProfile)


function GetURLAvatar(){
    const storage = getStorage();
    const imageRef = ref(storage, 'Avatar/' + filenameProfile);
        // Lấy tham chiếu đến nút "label" trong HTML
        const urllabel = document.getElementById("url-avatar");
                    
        // Function để cập nhật giao diện người dùng với thông tin mới
        function updateLabel(newName) {
            urllabel.textContent = newName;
        }
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
        // console.log(fileURL)
        updateLabel(fileURL); 
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
// Gọi hàm GetURLAvatar() để nó chạy liên tục
GetURLAvatar(); // Thực hiện mỗi giây (có thể điều chỉnh thời gian theo nhu cầu của bạn)
function printAllCookies() {
    // Tách các cookie thành mảng dựa trên dấu chấm phẩy và khoảng trắng
    const cookiesArray = document.cookie.split('; ');

    // Duyệt qua mảng các cookie và in ra từng cookie
    cookiesArray.forEach(cookie => {
        // Tách tên và giá trị của cookie
        const [cookieName, cookieValue] = cookie.split('=');
        // In ra tên và giá trị của cookie
        console.log(`${cookieName}: ${decodeURIComponent(cookieValue)}`);
    });
}