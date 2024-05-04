// Function để lấy ngày và giờ hiện tại
function getCurrentDateTime() {
    var now = new Date();
    var days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    var months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    var day = days[now.getDay()]; // Lấy thứ
    var date = now.getDate();
    var month = months[now.getMonth()]; // Lấy tháng
    var year = now.getFullYear();
    var hours = formatNumber(now.getHours()); // Định dạng giờ
    var minutes = formatNumber(now.getMinutes()); // Định dạng phút
    var seconds = formatNumber(now.getSeconds()); // Định dạng giây

    // Format ngày và giờ
    var formattedDateTime = `${day}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

// Function để định dạng số với số 0 phía trước nếu cần
function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

// Function để cập nhật thời gian
function updateDateTime() {
    var datetimeElement = document.getElementById('datetime');
    datetimeElement.innerText = getCurrentDateTime();
}

// Thực hiện cập nhật thời gian khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime(); // Gọi hàm cập nhật thời gian
    setInterval(updateDateTime, 1000); // Cập nhật thời gian mỗi giây
});
  
  