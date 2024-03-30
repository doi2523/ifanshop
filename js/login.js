// document.getElementById('formm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của form

//     // Lấy giá trị người dùng nhập vào
//     var username = document.getElementById('login-email').value;
//     var password = document.getElementById('login-password').value;

//     // Kiểm tra nếu username và password là 'admin' và '12345'
//     if (username === 'admin' && password === '12345') {
//         // Nếu đúng, chuyển hướng sang trang HTML khác
//         document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi.';
//         // alert('Đăng nhập thành công! Vui lòng đợi.');
//         setTimeout(function() {
//             window.location.href = 'admin.html';
//         }, 2000); // 2000 milliseconds = 2 giây
//         errorMessage.style.color = 'green';
//     } else {
//         // Nếu sai, hiển thị thông báo lỗi
//         document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
//         alert('Tên người dùng hoặc mật khẩu không đúng.');
//         errorMessage.style.color = 'red';
//         // Đặt lại form để người dùng có thể nhập lại
//         document.getElementById('formm').reset();
//     }

//     // Xóa dữ liệu trong URL
//     window.history.replaceState({}, document.title, window.location.pathname);
// });

// document.getElementById('formm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của form

//     // Lấy giá trị người dùng nhập vào
//     var username = document.getElementById('login-email').value;
//     var password = document.getElementById('login-password').value;

//     // Kiểm tra nếu username và password là 'admin' và '12345'
//     if (username === 'admin' && password === '12345') {
//         // Nếu đúng, chuyển hướng sang trang HTML khác
//         window.location.href = 'another_page.html';
//     } else {
//         // Nếu sai, hiển thị thông báo lỗi
//         document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
//         // Đặt lại form để người dùng có thể nhập lại
//         document.getElementById('formm').reset();
//     }
// });


document.getElementById('signup').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy giá trị người dùng nhập vào
        var username = document.getElementById("signup-username").value;
        var email = document.getElementById("signup-email").value;
        var password = document.getElementById("signup-password").value;

        var formData = {
            username: username,
            email: email,
            password: password
        };

            // Lấy danh sách người dùng từ Local Storage (nếu có)
            var userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

            // Thêm người dùng mới vào danh sách
            userList.push({ username: username, email: email, password: password });

            // Lưu danh sách người dùng vào Local Storage
            localStorage.setItem('userList', JSON.stringify(userList));

            // Hiển thị thông báo đăng ký thành công (có thể thay đổi theo ý của bạn)
            alert('Đăng ký thành công!');

        // Reload trang
        document.getElementById('signupMessage').innerText = 'Đăng ký thành công! Vui lòng đăng nhập!';        // Đợi 2 giây trước khi tải lại trang
        setTimeout(function() {
            window.location.reload();
        }, 2000);

        console.log("Username:", formData.username);
        console.log("Email:", formData.email);
        console.log("Password:", formData.password);

        window.history.replaceState({}, document.title, window.location.pathname);

    // Xóa dữ liệu trong URL
    window.history.replaceState({}, document.title, window.location.pathname);
});




// Lấy danh sách người dùng từ Local Storage
var userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

// Hàm xử lý sự kiện đăng nhập
document.getElementById('formm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    var username = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    var found = false;
    // Duyệt qua danh sách người dùng để kiểm tra thông tin đăng nhập
    userList.forEach(function(user) {
        if (username === user.username && password === user.password) {
            found = true;
            return;
        }
    });
    if (found) {
        document.getElementById('loginSuccessMessage').style.display = 'block';
        document.getElementById('loginMessage').innerText = ''; // Xóa thông báo lỗi nếu có
        // Chuyển đến trang thành công sau 2 giây
        if (username === 'admin' && password === '12345') {
            // Nếu đúng, chuyển hướng sang trang HTML khác
            document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi.';
            alert('Đăng nhập thành công! Vui lòng đợi.');
            loginMessage.style.color = 'green';
            window.location.href = "admin.html";
            setTimeout(function() {
                window.location.href = 'admin.html';
            }, 2000); // 2000 milliseconds = 2 giây
            errorMessage.style.color = 'green';
        }
        setTimeout(function() {
            window.location.href = "index.html"; // Đổi thành đường dẫn trang thành công của bạn
        }, 2000);
    } else {
        document.getElementById('loginSuccessMessage').style.display = 'none';
        document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
        loginMessage.style.color = 'red';
        var reset_all = document.getElementById('formm');
        reset_all.reset();
    }
        // // Kiểm tra nếu username và password là 'admin' và '12345'
        // if (username === 'admin' && password === '12345') {
        //     // Nếu đúng, chuyển hướng sang trang HTML khác
        //     document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi.';
        //     alert('Đăng nhập thành công! Vui lòng đợi.');
        //     loginMessage.style.color = 'green';
        //     window.location.href = "admin.html";
        //     setTimeout(function() {
        //         window.location.href = 'admin.html';
        //     }, 2000); // 2000 milliseconds = 2 giây
        //     errorMessage.style.color = 'green';
        // } else { 
        // Xóa thông báo lỗi nếu có
        //     // Nếu sai, hiển thị thông báo lỗi
        //     document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
        //     alert('Tên người dùng hoặc mật khẩu không đúng.');
        //     errorMessage.style.color = 'red';
        //     // Đặt lại form để người dùng có thể nhập lại
        //     document.getElementById('formm').reset();
});



