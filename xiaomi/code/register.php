<?php
  $username = $_POST['username'];
  $password = $_POST['password'];
  $repasswd = $_POST['repasswd'];

  if($password <> $repasswd){
    echo '{"code": -2, "msg": "两次密码不一致"}';
    die();
  }

  $mysqli = new mysqli('localhost', 'root', 'root', 'js1904');

  $sql = "select id from users where username='$username';";

  $result = $mysqli->query($sql);

  if($result->num_rows > 0){
    echo '{"code": -1, "msg": "用户名已注册"}';
    die();
  }

  $sql = "insert into users(username, passwd) values('$username', '$password');";

  $result = $mysqli->query($sql);

  if($result){
    echo '{"code": 2, "msg": "注册成功"}';
  } else {
    echo '{"code": 0, "msg": "网络超时"}';
  }

  $mysqli->close();
?>