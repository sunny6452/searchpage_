import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
      marginRight: '15px',
    },
    searchCPList: {
      color: '#333333',
      letterSpacing: -0.01,
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <ListItem button className={classes.FVList}>
        <FavoriteIcon
          className={classes.FVIcon}
          onClick={(e) => {
            onHeart(favorite, 'true');
          }}
        />
        <ListItemText
          className={classes.searchCPList}
          primary={favorite.htmComNm}
          secondary={`${favorite.htmAlias} / ${favorite.htmComCd} / '시간없음'`}
          onClick={(e) => {
            updatePrevList(favorite);
          }}
        />
      </ListItem>
    </div>
  );
};

export default React.memo(Favoriteitem);
