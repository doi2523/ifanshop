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
  const databaseRef = ref(database, "webiphone");

  // Lắng nghe sự kiện value để nhận tất cả dữ liệu khi nó thay đổi hoặc được tải lên ban đầu
  onValue(
    databaseRef,
    (snapshot) => {
      // Reset giá trị của biến đếm khi có thay đổi dữ liệu
      cellNumber = 1;

      const gridData = snapshot.val();
      // Xóa tất cả các phần tử hiện có trong grid trước khi hiển thị lại dữ liệu mới
      const showgrid = document.getElementById("showgrid");
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
  const showgrid = document.getElementById("showgrid");
  let tr = showgrid.lastElementChild; // Lấy thẻ tr cuối cùng trong showgrid
  if (!tr || tr.children.length === 4) {
    // Nếu không có thẻ tr hoặc thẻ tr hiện tại đã có 4 cột
    tr = document.createElement("tr"); // Tạo một thẻ tr mới
    showgrid.appendChild(tr); // Thêm thẻ tr mới vào showgrid
  }

  // Tạo một thẻ td chứa dữ liệu và thêm vào thẻ tr
  const td = document.createElement("td");
  td.className = "border text-left gridbox";
  td.innerHTML = `Stt: ${cellNumber}<br>Code: ${gridData.idgrid}<p>id: ${gridData.idsanpham}</p>`;
  tr.appendChild(td); // Thêm thẻ td vào thẻ tr

  cellNumber++; // Tăng giá trị của biến đếm
}

GetGrid();

let getThongTinClicked = false;
document
  .getElementById("getthongtin")
  .addEventListener("click", function (event) {
    event.preventDefault();
    updateThongTin();
  });

function updateThongTin() {
  var tensp = document.getElementById("tensp-insert").value;

  console.log(tensp);
  const databaseRef = ref(database);
  const sanphamRef = child(databaseRef, "sanpham/" + tensp);
  get(sanphamRef)
    // get(child(databaseRef, "sanpham/" + tensp))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const SanphamData = snapshot.val();

        const idsp = SanphamData.idsanpham;
        const dunglg = SanphamData.dungluong;
        const tenanh = SanphamData.file;
        const namesp = SanphamData.tensanpham;
        const giagoc = SanphamData.giagoc;
        const giasale = SanphamData.giasale;

        console.log("Email:", idsp);
        console.log("Password:", namesp);
        console.log("Họ tên:", dunglg);
        console.log("Số điện thoại:", giagoc);
        console.log("Last login:", giasale);
        console.log("Last logout:", tenanh);

        const tentep = document.getElementById("tentep");
        const getid = document.getElementById("getid");
        const getname = document.getElementById("getname");
        const getdl = document.getElementById("getdl");
        tentep.textContent = tenanh;
        getid.textContent = idsp;
        getdl.textContent = dunglg;
        getname.textContent = namesp;

        getThongTinClicked = true;
        // Gọi hàm AddIn() và truyền các giá trị vào
        document
          .getElementById("insert-to-gird")
          .addEventListener("click", function (event) {
            event.preventDefault();
            AddIn(idsp, dunglg, namesp, giagoc, giasale);
          });
        document
          .getElementById("update-to-gird")
          .addEventListener("click", function (event) {
            event.preventDefault();
            UpdateIn(idsp, dunglg, namesp, giagoc, giasale);
          });
      }
    })
    .catch((error) => {
      alert("Lỗi:", error);
    });
}

function AddIn(idsp, dunglg, namesp, giagoc, giasale) {
  // Lấy nội dung của nhãn
  var urlanh = document.getElementById("urlanh").textContent;
  console.log("Nội dung của nhãn là: " + urlanh);
  var numbergrid = document.getElementById("number-grid").value;
  console.log(numbergrid);

  set(ref(database, "webiphone/" + numbergrid), {
    idsanpham: idsp,
    tensanpham: namesp,
    dungluong: dunglg,
    urlpicture: urlanh,
    giagoc: giagoc,
    giasale: giasale,
    idgrid: numbergrid,
  })
    .then(() => {
      alert("Thêm sản phẩm thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      resetInput();
    })
    .catch((error) => {
      alert("Đã xảy ra lỗi" + error.message);
    });
}
function UpdateIn(idsp, dunglg, namesp, giagoc, giasale) {
  // Lấy nội dung của nhãn
  var urlanh = document.getElementById("urlanh").textContent;
  console.log("Nội dung của nhãn là: " + urlanh);
  var numbergrid = document.getElementById("number-grid").value;
  console.log(numbergrid);

  update(ref(database, "webiphone/" + numbergrid), {
    idsanpham: idsp,
    tensanpham: namesp,
    dungluong: dunglg,
    urlpicture: urlanh,
    giagoc: giagoc,
    giasale: giasale,
    idgrid: numbergrid,
  })
    .then(() => {
      alert("Cập nhật sản phẩm thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      resetInput();
    })
    .catch((error) => {
      alert("Đã xảy ra lỗi" + error.message);
    });
}
document
  .getElementById("delete-to-gird")
  .addEventListener("click", function (event) {
    event.preventDefault();
    DeleteIn();
  });
function DeleteIn() {
  // Lấy nội dung của nhãn
  var numbergrid = document.getElementById("number-grid").value;
  console.log(numbergrid);

  remove(ref(database, "webiphone/" + numbergrid))
    .then(() => {
      alert("Đã xoá sản phẩm");
      resetInput();
      // Sau khi xoá thành công, bạn có thể cập nhật giao diện người dùng nếu cần
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((error) => {
      alert("Lỗi khi xoá sản phẩm:", error);
    });
}
function resetInput() {
  // Lấy tham chiếu đến ô input
  var inputElement1 = document.getElementById("number-grid");
  var inputElement2 = document.getElementById("tensp-insert");
  // Đặt lại giá trị của ô input về giá trị mặc định hoặc trống
  inputElement1.value = ""; // Đặt về giá trị trống
  inputElement2.value = ""; // Đặt về giá trị mặc định nếu có
}
