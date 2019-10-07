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
        if (type == 'GET') {
            url += '?' + data;
        }
        var xhr = new XMLHttpRequest();
        xhr.open(type, url);
        if (type == 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (success) {
                        success.call(xhr, JSON.parse(xhr.responseText));
                    } else {
                        resolve(JSON.parse(xhr.responseText));
                    }
                } else {
                    if (failed) {
                        failed.call(xhr, {code: -1, msg: '请求失败'});
                    } else {
                        reject({code: -1, msg: '请求失败'});
                    }
                }
            }
        };
        xhr.send(type == 'POST' ? data : null);
    });
}