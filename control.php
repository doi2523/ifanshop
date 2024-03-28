<?php
    include ('connect.php');
    class data_usrname
    {
        public function insert_usr($usrnm, $pwd, $email)
        {
            global $conn;
            $sql ="insert into user(username,password,email) values ('$usrnm','$pwd','$tenmd')";
            $run=mysqli_query($conn,$sql);
            return $run;
        }
        // public function select_gd()
        // {
        //     global $conn;
        //     $sql = "select * from giangduong";
        //     $run= mysqli_query($conn,$sql);
        //     return $run;
        // }
        // public function select_gd_id($id)
        // {
        //     global $conn;
        //     $sql = "select * from giangduong where id_giangduong=$id";
        //     $run= myqli_query($conn,$sql);
        //     return $run;
        // }
    }
    ?>