<?php
  $username = $_POST['username'];
  $password = $_POST['password'];

  $mysqli = new mysqli('localhost', 'root', 'root', 'js1904');

  $sql = "select id from users where username='$username' and passwd='$password';";

  $result = $mysqli->query($sql);

  if($result->num_rows > 0){
    echo '{"code": 2, "msg": "登录成功"}';
  } else {
    echo '{"code": -3, "msg": "用户名或密码错误"}';
  }

  $mysqli->close();
?>