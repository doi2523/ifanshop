document.getElementById('formm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy giá trị người dùng nhập vào
    var username = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    // Kiểm tra nếu username và password là 'admin' và '12345'
    if (username === 'admin' && password === '12345') {
        // Nếu đúng, chuyển hướng sang trang HTML khác
        document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi.';
        setTimeout(function() {
            window.location.href = 'admin.html';
        }, 2000); // 2000 milliseconds = 2 giây
        errorMessage.style.color = 'green';
    } else {
        // Nếu sai, hiển thị thông báo lỗi
        document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
        errorMessage.style.color = 'red';
        // Đặt lại form để người dùng có thể nhập lại
        document.getElementById('formm').reset();
    }

    // Xóa dữ liệu trong URL
    window.history.replaceState({}, document.title, window.location.pathname);
});

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




