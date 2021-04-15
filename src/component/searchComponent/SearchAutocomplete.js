import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { List } from 'react-virtualized';
import SearchListitem from './SearchListitem';
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
  /*const rowRenderer = useCallback(
    (props, val) => {
      // console.log('gdgd', props);
      // console.log('val', val);
      var searchitem = searchList.filter((item) => item.htmComNm === val);

      //var searchitem = test[props.index];
      //return <div key={props.index}>ㅎㅇㅎㅇ</div>;
      return (
        <SearchListitem
          searchitem={searchitem[0]}
          key={props.key}
          updatePrevList={updatePrevList}
          onHeart={onHeart}
          style={props.style}
        />
      );
    },
    [searchList, onHeart, updatePrevList],
  );

  const RenderTest = React.forwardRef(function RenderTest(props, ref) {
    const { children, role, ...other } = props;
    console.log('t', children);
    const itemCount = Array.isArray(children) ? children.length : 0;
    return (
      <div ref={ref}>
        <div {...other}>
          <List
            className={classes.searchListArea}
            width={480}
            height={680}
            rowCount={itemCount}
            rowHeight={45}
            rowRenderer={(props) =>
              rowRenderer(props, children[props.index].props.children)
            }
            //style={{ outline: 'none' }}
            role={role}
          />
        </div>
      </div>
    );
  });
*/
  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        //freeSolo
        id="free-solo-2-demo"
        options={searchList}
        getOptionLabel={(option) =>
          option.htmComNm ? `${option.htmComNm} - ${option.htmAlias} ` : ''
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
        disableCloseOnSelect={true}
        loading={true}
        value=""
        //loadingText={'loading...'}
        //renderOption 함수를 이용한 성능개성 근데 익스에선 엄청느림ㅠ
        renderOption={(option) => {
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
                {`${option.htmComNm} - ${option.htmAlias} `}
              </span>
            </div>
            //</div>
          );
        }}
      />
    </div>
  );
};

export default React.memo(SearchAutocomplete);
