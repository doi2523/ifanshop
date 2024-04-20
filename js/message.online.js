  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref,push, onValue, get, child, update, onChildAdded } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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


var hoten_profile; // Định nghĩa biến hoten_profile ở phạm vi toàn cục để có thể truy cập từ bên ngoài hàm GetName()
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

// Sử dụng hàm để lấy giá trị từ cookies
const emailProfile = getCookie("email_profile");
const hotenProfile = getCookie("hoten_profile");
const passwordProfile = getCookie("password_profile");
const sdtProfile = getCookie("sdt_profile");
const usernameProfile = getCookie("username_profile");
const filenameProfile = getCookie("filename_profile");

// Sử dụng các giá trị đã lấy được từ cookies
console.log(emailProfile);
console.log(hotenProfile);
console.log(passwordProfile);
console.log(sdtProfile);
console.log(usernameProfile);
console.log(filenameProfile);
            var fullname = document.getElementById("fullname"); // Lấy thẻ div có id là "fullname"
            if (fullname) {
                // Kiểm tra xem fullname có tồn tại không trước khi gán giá trị cho thuộc tính 'textContent'
                fullname.textContent = hotenProfile;
            }


document.getElementById('send').addEventListener('click', function(event) {
    event.preventDefault();
        const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    var message = document.getElementById("message").value;
    console.log(message);
    var name = hotenProfile; // Sử dụng giá trị hoten_profile ở đây
    const database = getDatabase(app);
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef); // Tạo một khóa mới trong nút "messages"
    const id = newMessageRef.key; // Lấy khóa mới được tạo

    set(newMessageRef, {
        name: name,
        message: message,
        userid: uid
    }).then(() => {
        alert('OK');
        document.getElementById("message").value = "";
    }).catch((error) => {
        console.error('Error writing message to database: ', error);
    });
});

function GetMess() {
    const database = getDatabase();
    const databaseRef = ref(database, "messages");

    get(child(databaseRef, "/"))
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const message = childSnapshot.val();
                displayMessage(message);
            });
        })
        .catch((error) => {
            console.error("Error getting messages: ", error);
        });
}
function displayMessage(message) {
    const messages = document.getElementById('textchat');
    const li = document.createElement('li');
    li.innerText = `${message.name}: ${message.message}`;
    messages.appendChild(li);
}
GetMess();