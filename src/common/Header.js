import React from 'react';
import headerImg from '../img/pd_common_logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

const Header = ({ history }) => {
  const useStyles = makeStyles((theme) => ({
    AppHeader: {
      height: '60px',
      //position: 'absolute',
      width: '100%',
      textAlign: 'left',
      background: '#ffffff',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
    },
    Header: {
      width: '1000px',
      margin: '0 auto',
    },
    headerImgTitle: {
      position: 'absolute',
      width: '160px',
      height: '27px',
      marginLeft: '95px',
      top: '17px',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '26px',
    },

    headerTitle: {
      position: 'absolute',
      width: '350px',
      height: '24px',
      marginLeft: '275px',
      top: '18px',
      fontSize: '16px',
      lineHeight: '23px',
    },
    headerImg: {
      width: '60px',
      height: '40px',
      top: '10px',
      position: 'absolute',
    },
    login: {
      position: 'absolute',
      marginLeft: '920px',
      top: '15px',
      '&:hover': {
        cursor: 'pointer',
        fontWeight: 'bold',
      },
    },
  }));
  const classes = useStyles();
  return (
    <header className={classes.AppHeader}>
      <div className={classes.Header}>
        <img src={headerImg} alt={''} className={classes.headerImg} />
        <span className={classes.headerImgTitle}>월급날 통합 로그인</span>
        <span className={classes.headerTitle}>
          등록된 아이디를 이용하여 자동으로 로그인 합니다.
        </span>
        <span
          className={classes.login}
          onClick={(e) => history.push('./login')}
        >
          로그아웃
        </span>
      </div>
    </header>
  );
};
export default withRouter(Header);
