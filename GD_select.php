<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
        include "control.php";//Goi den trang
        $get_data= new data_giangduong();//Goi den lop
        $select_giangduong = $get_data->select_gd();//Goi den function
    ?>
    <table border="1" align="center">
        <caption>
            DANH SÁCH ĐĂNG KÝ GIẢNG ĐƯỜNG
        </caption>
        <center><a href="GD_insert.php">New</a></center>
        <tr>
            <th>Giảng đường</th>
            <th>Giáo viên</th>
            <th>Môn dạy</th>
            <th colspan="2">Tùy chọn</th>
        </tr>
        <?php
            foreach ($select_giangduong as $i_gd)//Duyệt dữ liệu trả về
            {
        ?>
        <tr>
            <td><?php echo $i_gd['giangduong']?></td>
            <td><?php echo $i_gd['giaovien']?></td>
            <td><?php echo $i_gd['monday']?></td>
            <td><a href="GD_update.php?up=<?php echo $i_gd['id_giangduong']?>">Update</a></td>
            <td><a href="GD_delete.php?del=><?php echo $i_gd['id_giangduong']?>"
                onclick="if(confirm('Bạn có chắc chắn xóa')) return true;
                else return false";>Delete</td>
        </tr>
        <?php
            }
        ?>
    </table>
</body>
</html>