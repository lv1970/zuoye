// 基于Promise
function ajax({
  type = 'get',
  url = location.href,
  data = '',
  success,
  failed
}) {
  return new Promise((resolve, reject) => {
    var params = [];
    if (typeof data != 'string') {
      for (param in data) {
        params.push(`${param}=${data[param]}`);
      }
      data = params.join('&');
    }

    type = type.toUpperCase();
    // 如果是get请求，要将data拼接到地址上
    if (type == 'GET') {
      url += '?' + data;
    }

    var xhr = new XMLHttpRequest();

    xhr.open(type, url);

    // 如果发送的post，设置请求头Content-Type: application/x-www-form-urlencoded;
    // 在调用open方法后，设置请求头
    if (type == 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          // success
          if (success) {
            success.call(xhr, JSON.parse(xhr.responseText));
          } else {
            resolve(JSON.parse(xhr.responseText));
          }
        } else {
          // failed
          if (failed) {
            failed.call(xhr, { code: -1, msg: '请求失败' });
          } else {
            reject({ code: -1, msg: '请求失败' });
          }
        }
      }
    };

    xhr.send(type == 'POST' ? data : null);
  });
}
