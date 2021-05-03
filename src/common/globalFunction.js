export const lcst = (key, value, isClear) => {
  localStorage.setItem(key, value);
  if (isClear) {
    localStorage.removeItem('id');
    localStorage.removeItem('pass');
    localStorage.removeItem('isRemember');
  }
};

export const time = () => {
  var date = new Date();
  //var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();

  return month + '월' + day + '일' + hour + '시' + minutes + '분';
};

export const onHref = (search, id, password) => {
  var arg =
    '/servlets/HtmLogin?CMD=HtmClientComCdLogin&HtmComId=' +
    encodeURIComponent(id) +
    '&HtmComPass=' +
    encodeURIComponent(password) +
    '&HtmCorCd=himgt&HtmComCd=himgt&HtmClientCd=' +
    search.htmComCd +
    '&HtmClientNm=' +
    encodeURIComponent(search.htmComNm);
  if (id === '' || password === '') arg = '';
  var url = 'https://' + search.htmAlias + '.himgt.net' + arg;

  document.location.href = url;
};

export const idCheck = (id, password) => {
  // console.log('id', id);
  //console.log('password', password);
  if (id === '' || password === '') {
    alert('아이디 또는 비밀번호를 확인하세요.');
    return false;
  }
  return true;
};
