import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const LoginInput = (props) => {
  const useStyles = makeStyles(() => ({
    id: {
      overflow: 'hidden',
      borderRadius: 10,
      opacity: 0.7,
      width: 270,
      height: 45,
      '& label': {
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '20px',
        marginTop: -4,
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <TextField
        label={props.label}
        variant="filled"
        size="small"
        className={classes.id}
        onChange={(e) => {
          props.reset();
          props.setUser(e.target.value);
          props.lcst(props.inputName, e.target.value);
        }}
        value={props.userValue}
        type={props.label === '비밀번호' ? 'password' : ''}
        style={
          props.label === '비밀번호' ? { marginTop: 10 } : { marginTop: 100 }
        }
      />
    </div>
  );
};

export default LoginInput;
