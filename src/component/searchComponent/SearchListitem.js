import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const SearchListitem = ({ searchitem, updatePrevList, onHeart, style }) => {
  console.log('searchitem', searchitem);
  const { htmComNm, htmComCd, htmAlias, favorite } = searchitem;
  const useStyles = makeStyles(() => ({
    searchList: {
      '&:hover': {
        backgroundColor: '#EDF7FF;',
      },
      '& span': {
        display: 'inline-block',
        fontSize: '14px',
        letterSpacing: -0.01,
        color: '#333333',
        verticalAlign: 'middle',
        height: '35px',
      },
      '& svg': {
        marginTop: '10px',
        marginLeft: '20px',
        marginRight: '15px',
      },
    },
  }));

  const classes = useStyles();
  return (
    <div style={style} className={classes.searchList}>
      {favorite === 'true' ? (
        <FavoriteIcon
          onClick={() => onHeart(searchitem, favorite)}
          style={{ color: 'red' }}
        />
      ) : (
        <FavoriteBorderIcon
          onClick={() => onHeart(searchitem, favorite)}
          style={{ color: '#CCCCCC' }}
        />
      )}
      <span
        onClick={(e) => {
          updatePrevList(searchitem);
        }}
      >{`${htmComNm} - ${htmAlias} `}</span>
    </div>
  );
};

export default React.memo(SearchListitem);
