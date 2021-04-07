import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const SearchAutocomplete = ({ searchList, changeSearch }) => {
  const useStyles = makeStyles(() => ({
    searchCompany: {
      marginTop: 55,
      width: 480,
      height: '56px',
      marginLeft: '50px',
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
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        freeSolo
        id="combo-box-demo"
        options={searchList}
        getOptionLabel={(option) => option.htmComNm}
        className={classes.searchCompany}
        onChange={(e, value) => changeSearch(value)}
        renderInput={(params) => {
          return <TextField {...params} label="회사검색" variant="outlined" />;
        }}
      />
    </div>
  );
};

export default React.memo(SearchAutocomplete);
