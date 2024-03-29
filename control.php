<?php
include ('connect.php');

class data_usrname {
    public function insert_usr($usrnm, $pwd, $email) {
        global $conn;
        $sql = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
        
        // Chuẩn bị câu lệnh SQL
        $stmt = mysqli_prepare($conn, $sql);
        
        // Kiểm tra lỗi chuẩn bị câu lệnh
        if (!$stmt) {
            die('Error: ' . mysqli_error($conn));
        }
        
        // Bind các tham số vào câu lệnh SQL
        mysqli_stmt_bind_param($stmt, 'sss', $usrnm, $pwd, $email);
        
        // Thực thi câu lệnh SQL
        $result = mysqli_stmt_execute($stmt);
        
        // Đóng statement
        mysqli_stmt_close($stmt);
        
        return $result;
    }
}
?>
