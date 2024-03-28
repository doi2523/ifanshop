<?php
    Public function select_table($id)
    {
        global $conn;
        $sql = "select * from table where id=$id";
        $run= myqli_query($conn,$sql);
        return $run;
    }
?>