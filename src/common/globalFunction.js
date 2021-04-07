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
