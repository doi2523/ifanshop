<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <form method="POST">
    Giảng đường: <select name="txtgd">
    <option value="GĐ  501">GĐ 501 </option>
    <option value="GĐ  502">GĐ 502 </option>
    <option value="GĐ  503">GĐ 503 </option>
    </select><br>
    Giáo viên: <input type="text" name="txtname"><br>
    Môn dạy:<select name="txtmd">
    <option value="LT PHP">LT PHP</option>
    <option value="LT XML">LT XML</option>
    <option value="LT Java">LT Java</option>
    </select><br>
    <input type="submit" name="txtsub" value="Đăng kí">
    </form>
    <?php
        if(isset($_POST['txtsub'])) //Hàm kiểm tra nút submit
        {
            if(empty($_POST['txtname']) || empty($_POST['txtmd']))
            echo "Bạn chưa nhập đủ thông tin";
            else
            {
                echo "<br>Giảng viên: ".$_POST['txtname'].
                "<br>Môn dạy: ".$_POST['txtmd'].
                "<br>Giảng đường: ".$_POST['txtgd'];
            }
        }
    ?>
    <?php
        include ('control.php'); //gọi trang php
        $get_data= new data_giangduong(); //Gọi lớp data_giangduong trong trang control
        if(isset($_POST['txtsub']))
        {
            $in_gd =$get_data -> insert_gd($_POST['txtname'],$_POST['txtgd'],$_POST['txtmd']);
            if($in_gd) echo "<script>alert('Thành công');
                            </script>";
            else 
            echo "<script>alert('Không thực thi được')</script>";                
        }
    ?>
</body>
</html>