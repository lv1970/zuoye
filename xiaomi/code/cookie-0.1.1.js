function setCookie(name, value, { domain, path, maxAge }) {
  var str = `${name}=${value};`;
  if (domain) {
    str += `domain=${domain};`;
  }

  if (path) {
    str += `path=${path};`;
  }

  if (maxAge) {
    str += `max-age=${maxAge};`;
  }

  document.cookie = str;
}

// IIFE --  Immediately Invoked Function Expression
var cookies = (function() {
  var res = {};
  var cookies = document.cookie;

  if (cookies == '') {
    return res;
  }

  cookies = cookies.split('; ');

  cookies.forEach(c => {
    var parts = c.split('=');
    var name = parts.shift();
    var value = parts.join('=');

    res[name] = value;
  });

  return res;
})();

function getCookie(name) {
  return cookies[name];
}

function cookie(name, value, options) {
  // 如果第二参数 为 undefined, 认为是 获取cookie功能
  if (value == undefined) {
    return getCookie(name);
  }

  setCookie(name, value, options);
}

// 删除cookie
function removeCookie(name) {
  setCookie(name, null, { maxAge: -1 });
}
