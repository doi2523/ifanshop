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
    onChildAdded,
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
  
  let cellNumber = 1; // Biến để theo dõi số cho mỗi ô
  
  function GetGrid() {
    const database = getDatabase();
    const databaseRef = ref(database, "sanpham");
  
    // Lắng nghe sự kiện value để nhận tất cả dữ liệu khi nó thay đổi hoặc được tải lên ban đầu
    onValue(databaseRef,(snapshot) => {
        // Reset giá trị của biến đếm khi có thay đổi dữ liệu
        cellNumber = 1;
  
        const gridData = snapshot.val();
        // Xóa tất cả các phần tử hiện có trong grid trước khi hiển thị lại dữ liệu mới
        const showgrid = document.getElementById("showid");
        showgrid.innerHTML = "";
        // Lặp qua tất cả các key trong gridData và hiển thị trên grid
        for (const key in gridData) {
          if (Object.hasOwnProperty.call(gridData, key)) {
            const element = gridData[key];
            // Thêm khóa chính vào dữ liệu trước khi hiển thị
            // element.key = key;
            // Hiển thị mỗi phần tử trong gridData
            displayGrid(element);
          }
        }
      },
      (error) => {
        console.error("Error getting grid data: ", error);
      }
    );
  }
  
  function displayGrid(gridData) {
    const showgrid = document.getElementById("showid");
    let tr = showgrid.lastElementChild; // Lấy thẻ tr cuối cùng trong showgrid
    if (!tr || tr.children.length === 4) {
        // Nếu không có thẻ tr hoặc thẻ tr hiện tại đã có 4 cột
        tr = document.createElement("tr"); // Tạo một thẻ tr mới
        showgrid.appendChild(tr); // Thêm thẻ tr mới vào showgrid
    }

    // Tạo một thẻ td chứa dữ liệu và thêm vào thẻ tr
    const td = document.createElement("td");
    td.className = "border col p-4";
    td.innerHTML = `Stt: ${cellNumber} <p>${gridData.idsanpham}</p>`;
    tr.appendChild(td); // Thêm thẻ td vào thẻ tr

    // Tạo một nút button "Copy" và gán hàm xử lý sự kiện click
    const copyButton = document.createElement("button");
    copyButton.innerHTML = '<i class="bi bi-clipboard"></i>'; // Thêm biểu tượng sao chép từ Bootstrap
    copyButton.className = "btn btn-primary btn-sm"; // Thêm class "btn" và "btn-primary" của Bootstrap
    copyButton.addEventListener("click", function() {
        const idContent = gridData.idsanpham; // Nội dung cần sao chép
        navigator.clipboard.writeText(idContent) // Sao chép nội dung vào clipboard
            .then(() => {
                console.log("Đã sao chép ID: ", idContent);
                // Thêm thông báo hoặc hiệu ứng khi sao chép thành công nếu cần
            // Đẩy giá trị đã copy vào ô input
            document.getElementById('idsanpham').value = idContent;
            })
            .catch(err => {
                console.error("Lỗi khi sao chép: ", err);
                // Xử lý lỗi khi không thể sao chép
            });
    });
    td.appendChild(copyButton); // Thêm nút "Copy" vào thẻ td

    cellNumber++; // Tăng giá trị của biến đếm
}

  
  GetGrid();
  // Hàm sao chép ID sản phẩm vào clipboard
function copyProductId(event) {
  let productId = event.target.getAttribute("data-name");
  navigator.clipboard
    .writeText(productId)
    .then(() => {
      console.log("Đã sao chép ID sản phẩm thành công: " + productId);
      alert("Đã sao chép ID sản phẩm thành công: " + productId);
    })
    .catch((err) => {
      console.error("Lỗi khi sao chép ID sản phẩm: ", err);
      alert("Đã xảy ra lỗi khi sao chép ID sản phẩm");
    });
}