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
    onChildAdded
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
// Function to display user data
        function displayUsers(getusers) {
            const container = document.getElementById("hienthichitiet");
            const div = document.createElement("div");
            div.classList.add("row", "mb-3");

            div.innerHTML = `
                <div class="col-md-4">
                    <img src="${getusers.urlavatar}" alt="Profile Image" class="img-fluid rounded">
                </div>
                <div class="col-md-5">
                    <div class="mb-2"><label for="username"><strong>Tên người dùng:</strong></label>
                    <input type="text" class="form-control" id="username" value="${getusers.username || ''}"></div>
                    <div class="mb-2"><label for="email"><strong>Email:</strong></label>
                    <input type="email" class="form-control" id="email" value="${getusers.email || ''}"></div>
                    <div class="mb-2"><label for="hoten"><strong>Họ tên:</strong></label>
                    <input type="text" class="form-control" id="hoten" value="${getusers.hoten || ''}"></div>
                    <div class="mb-2"><label for="role"><strong>Role:</strong></label>
                    <input type="text" class="form-control" id="role" value="${getusers.role || ''}"></div>
                    <div class="mb-2"><label for="sdt"><strong>Số điện thoại:</strong></label>
                    <input type="text" class="form-control" id="sdt" value="${getusers.sdt || ''}"></div>
                </div>
                <div class="col-md-3">
                    <div class="mb-2"><button id="submitBtn" class="btn btn-success"><i class="bi bi-save"></i> Lưu thay đổi</button></div>
                    <div class="mb-2"><button id="reload" class="btn btn-primary"><i class="bi bi-arrow-clockwise"></i> Làm mới</button></div>
                    <div class="mb-2"><button id="exit" class="btn btn-danger"><i class="bi bi-x-lg"></i> Thoát</button></div>
                </div>
            `;
            container.appendChild(div);

            // Add event listener to the submit button
            document.getElementById('submitBtn').addEventListener('click', () => {
                saveChanges(getusers.id);
            });
            document.getElementById('exit').addEventListener('click', () => {
                ClearLocal();
                AlertExit();
                setTimeout(() => {
                    window.location.href = "auth.admin.qlyaccount.html";
                }, 3000); // Redirect after 3 seconds
            });
            document.getElementById('reload').addEventListener('click', () => {
                location.reload();
            });
        }

        // Function to save changes
        function saveChanges(id) {
                var username = document.getElementById('username').value;
                var email = document.getElementById('email').value;
                var hoten = document.getElementById('hoten').value;
                var role = document.getElementById('role').value;
                var sdt = document.getElementById('sdt').value;
            const iduser = localStorage.getItem("iduser");
            update(ref(database, "users/" + iduser), {
                username: username,
                hoten: hoten,
                sdt: sdt,
                email: email,
                role: role
              })
                .then(() => {
                    AlertUpdate();
                })
            
                .catch((error) => {
                  alert("Đã xảy ra lỗi khi cập nhật thông tin: " + error.message);
                });
            // update(userRef)
            //     .then(() => {
            //         Alert('Thay đổi thông tin thành công!', 'success');
            //     })
            //     .catch((error) => {
            //         console.error("Error updating user data: ", error);
            //         Alert('Thay đổi thông tin thất bại!', 'error');
            //     });
        }

        // Function to get all users and display them
        function GetAll() {
            const iduser = localStorage.getItem("iduser");
            const databaseRef = ref(database);
            const userRef = child(databaseRef, "users/" + iduser);

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const getusers = snapshot.val();
                    displayUsers(getusers);
                    Alert('Lấy thông tin người dùng thành công!', 'success');
                }
            }).catch((error) => {
                console.error("Error getting users: ", error);
                Alert('Lấy thông tin người dùng thất bại!', 'error');
            });
        }

        // Function to clear local storage
        function ClearLocal() {
            try {
                localStorage.removeItem("iduser");
                console.log("Đã xoá thành công key 'iduser' từ localStorage.");
            } catch (error) {
                console.error("Lỗi khi xoá key 'iduser' từ localStorage:", error);
            }
        }

        function AlertUpdate(){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                //   toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Cập nhật thông tin người dùng thành công!",
                color: "#716add",
              });
        }          
        function Alert(){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                //   toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Lấy thông tin người dùng thành công!",
                color: "#716add",
              });
        } 
        function AlertExit(){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                //   toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: "Người dùng bấm thoát chờ chuyển trang!",
                color: "#716add",
              });
        } 
        // Call the function to get and display all users
        GetAll();