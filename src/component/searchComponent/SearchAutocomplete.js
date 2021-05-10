import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import redHeart from '../../img/redHeart.png';
import borderHeart from '../../img/borderHeart.png';

const useStyles = makeStyles(() => ({
  searchCompany: {
    marginTop: 55,
    width: 480,
    height: '56px',
    marginLeft: '50px',
    maxHeight: '700px',
    '& label': {
      fontSize: '14px',
      fontWeight: 'bold',
      lineHeight: '20px',
    },
    '& TextField': {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.01em',
      color: '#263238',
      display: 'flex',
    },
    '& .MuiOutlinedInput-root': {
      height: '56px',
    },
    '& .paper': {
      position: 'fixed',
    },
  },
  listbox: {
    maxHeight: '99999999999px',
    backgroundColor: 'white',
  },
  paper: {
    height: '680px',
    marginTop: '8px',
    width: '480px',
    position: 'absolute',
    boxShadow: 'none',
    overflowY: 'auto',
  },
  option: {
    height: '45px',

    '&:hover': {
      backgroundColor: '#EDF7FF;',
    },
    '& span': {
      display: 'inline-block',
      fontSize: '14px',
      letterSpacing: -0.01,
      verticalAlign: 'middle',
      height: '30px',
    },
    '& img': {
      marginTop: '10px',
      marginLeft: '20px',
      marginRight: '15px',
    },
  },
}));

const SearchAutocomplete = ({ searchList, updatePrevList, onHeart }) => {
  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        options={searchList}
        getOptionLabel={(option) =>
          option.htmComNm !== undefined
            ? `${option.htmComNm} - ${option.htmAlias}`
            : ''
        }
        classes={{
          paper: classes.paper,
          popper: classes.popper,
          listbox: classes.listbox,
          option: classes.option,
        }}
        className={classes.searchCompany}
        renderInput={(params) => {
          return <TextField {...params} label="회사검색" variant="outlined" />;
        }}
        value=""
        //openOnFocus={true}
        disableCloseOnSelect={true}
        loading={true}
        //value=""
        //renderOption 함수를 이용한 성능개성 근데 익스에선 엄청느림ㅠ
        renderOption={(option, state) => {
          return (
            <div className={classes.searchList}>
              {option.favorite === 'true' ? (
                <img
                  src={redHeart}
                  alt={''}
                  className={classes.HeartImg}
                  onClick={() => onHeart(option, option.favorite)}
                />
              ) : (
                <img
                  src={borderHeart}
                  alt={''}
                  className={classes.HeartImg}
                  onClick={() => onHeart(option, option.favorite)}
                />
              )}
              <span
                onClick={(e) => {
                  updatePrevList(option);
                }}
              >
                {option.htmComNm} - {option.htmAlias}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default React.memo(SearchAutocomplete);
