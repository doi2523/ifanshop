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
    
function GetName() {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const databaseRef = ref(database); // Bạn đã quên dấu "," ở giữa "users/" và "user.uid"
        
    get(child(databaseRef, "users/" + user.uid))
        .then((snapshot) => {
            var usrs = [];
            snapshot.forEach((childSnapshot) => {
                usrs.push(childSnapshot.val());
            });
            hoten_profile = usrs[1]; // Gán giá trị hoten_profile từ trong hàm GetName()
            var fullname = document.getElementById("fullname"); // Lấy thẻ div có id là "fullname"
            if (fullname) {
                // Kiểm tra xem fullname có tồn tại không trước khi gán giá trị cho thuộc tính 'textContent'
                fullname.textContent = hoten_profile;
            }
        })
}
setInterval(GetName, 0);

document.getElementById('send').addEventListener('click', function(event) {
    event.preventDefault();
        const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    var message = document.getElementById("message").value;
    console.log(message);
    var name = "Admin"; // Sử dụng giá trị hoten_profile ở đây
    const database = getDatabase(app);
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef); // Tạo một khóa mới trong nút "messages"
    const id = newMessageRef.key; // Lấy khóa mới được tạo

    set(newMessageRef, {
        name: name,
        message: message,
        userid: uid
    }).then(() => {
        document.getElementById("message").value = "";
    }).catch((error) => {
        console.error('Error writing message to database: ', error);
    });
});

function GetMess() {
    const database = getDatabase();
    const databaseRef = ref(database, "messages");

    // Lắng nghe sự kiện khi có tin nhắn mới được thêm vào cơ sở dữ liệu
    onChildAdded(databaseRef, (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    });
}

// Hàm hiển thị tin nhắn
function displayMessage(message) {
    const messages = document.getElementById('textchat');
    const li = document.createElement('li');
    li.innerText = `${message.name}: ${message.message}`;
    messages.appendChild(li);
}

// Gọi hàm GetMess() để chạy lấy giá trị từ cơ sở dữ liệu Firebase
GetMess();
