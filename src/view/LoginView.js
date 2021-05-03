import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Login from '../component/loginComponent/Login';
import { withRouter } from 'react-router';
import axios from 'axios';

const StyledLogin = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: Noto Sans KR;
  font-style: normal;
  width: 400px;
`;

var url = 'https://api.himgt.net/commonLogin/loginCheck';

const LoginView = ({ history }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('isRemember')) {
      setIsRemember(true);
      setId(localStorage.getItem('id'));
      setPassword(localStorage.getItem('pass'));
    }
  }, []);

  const onLogin = () => {
    axios.post(url, { userId: id, userPw: password }).then((response) => {
      if (response.data.resultCode !== '200') {
        alert('아이디 또는 비밀번호를 확인하세요.');
      } else {
        history.push({
          pathname: '/main',
          state: {
            userid: id,
            userpw: password,
            sabun: response.data.resultMsg,
          },
        });
      }
    });
  };

  return (
    <StyledLogin>
      <Login
        id={id}
        setId={setId}
        password={password}
        setPassword={setPassword}
        isRemember={isRemember}
        setIsRemember={setIsRemember}
        onLogin={onLogin}
      />
    </StyledLogin>
  );
};

export default withRouter(LoginView);
