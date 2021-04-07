import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const SearchListitem = ({ searchitem, updatePrevList, onHeart }) => {
  const { htmComNm, htmComCd, htmAlias, favorite } = searchitem;
  const useStyles = makeStyles(() => ({
    searchIcon: {
      color: 'red',
    },
    searchIcon2: {
      color: '#CCCCCC',
    },
    searchList: {
      width: 480,
      marginLeft: 50,
      '&:hover': {
        background: '#EDF7FF;',
      },
    },
    searchCPList: {
      color: '#333333',
      lineHeight: 20,
      letterSpacing: -0.01,
      '& span': {
        fontSize: '14px',
      },
    },
  }));

  const classes = useStyles();
  return (
    <ListItem button className={classes.searchList}>
      <ListItemIcon
        style={{ minWidth: '45px' }}
        id={htmComCd}
        onClick={() => onHeart(searchitem, favorite)}
      >
        {favorite === 'true' ? (
          <FavoriteIcon style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon style={{ color: '#CCCCCC' }} />
        )}
      </ListItemIcon>
      <ListItemText
        className={classes.searchCPList}
        id="최근기록"
        primary={`${htmComNm} - ${htmAlias} `}
        onClick={(e) => {
          updatePrevList(searchitem);
        }}
      />
    </ListItem>
  );
};

export default React.memo(SearchListitem);
