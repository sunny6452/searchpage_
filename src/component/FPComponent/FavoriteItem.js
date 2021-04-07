import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const Favoriteitem = ({ favorite, onHeart, updatePrevList }) => {
  const useStyles = makeStyles(() => ({
    FVList: {
      width: '320px',
      marginLeft: 40,
      height: '72px',
      borderBottom: '1px solid',
      borderBottomColor: '#DDDDDD',
      '&:hover': {
        background: '#EDF7FF;',
      },
    },
    FVIcon: {
      color: 'red',
    },
    searchCPList: {
      color: '#333333',
      letterSpacing: -0.01,
    },
  }));

  const classes = useStyles();
  return (
    <ListItem button className={classes.FVList}>
      <ListItemAvatar style={{ minWidth: '45px' }}>
        <FavoriteIcon
          className={classes.FVIcon}
          onClick={(e) => {
            onHeart(favorite, 'true');
          }}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.searchCPList}
        primary={favorite.htmComNm}
        secondary={`${favorite.htmAlias} / ${favorite.htmComCd} / '시간없음'`}
        onClick={(e) => {
          updatePrevList(favorite);
        }}
      />
    </ListItem>
  );
};

export default React.memo(Favoriteitem);
