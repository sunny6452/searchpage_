import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import LoginInput from './LoginInput';
import { lcst } from '../common/globalFunction';

const Login = ({ onLogin /*, id, setId */ }) => {
  const useStyles = makeStyles(() => ({
    Section: {
      position: 'absolute',
      width: '400px',
      background: '#ffffff',
      borderRadius: '10px',
    },
    loginSection: {
      height: '350px',
      top: '90px',
      borderRadius: '10px',
      background: '#ffffff',
    },
    loginTitle: {
      position: 'absolute',
      marginTop: '55px',
      marginLeft: '-130px',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '-0.01em',
    },
    checkedTitle: {
      fontSize: '14px',
      lineHeight: '26px',
      color: '#666666',
    },
    searchButton: {
      '&.MuiButton-root:hover': {
        background: '#3474E4',
        fontWeight: 'bold',
      },
      width: 270,
      height: 45,
      background: '#3474E4',
      borderRadius: 10,
      marginTop: 10,
      fontSize: 16,
    },
    loginChecked: {
      marginLeft: -125,
    },
  }));

  const classes = useStyles();
  const [isRemember, setIsRemember] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isRemember')) {
      setIsRemember(true);
      setId(localStorage.getItem('id'));
      setPassword(localStorage.getItem('pass'));
    }
  }, [isRemember]);

  return (
    <article className={`${classes.Section} ${classes.loginSection} `}>
      <span className={classes.loginTitle}>HTMS 계정 정보</span>
      <LoginInput
        setUser={setId}
        lcst={lcst}
        userValue={id}
        label="아이디"
        inputName="id"
      />
      <LoginInput
        setUser={setPassword}
        lcst={lcst}
        userValue={password}
        label="비밀번호"
        inputName="pass"
      />
      <Checkbox
        defaultChecked
        size="small"
        className={classes.loginChecked}
        inputProps={{ 'aria-label': 'checkbox with small size' }}
        checked={isRemember}
        onChange={(e) => {
          setIsRemember(e.target.checked);
          lcst('isRemember', e.target.checked);
          if (!e.target.checked) lcst('', '', true);
        }}
      />
      <span className={classes.checkedTitle}>아이디/비밀번호 저장</span>
      <br />
      <Button
        variant="contained"
        className={classes.searchButton}
        color="primary"
        TabIndicatorProps={{
          style: { background: '#1976D2' },
        }}
        disableElevation
        onClick={(e) => {
          onLogin(id);
        }}
      >
        조회하기
      </Button>
    </article>
  );
};

export default Login;
