import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const FVListitem = (props) => {
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
    FVlistOpen: {
      overflowY: 'auto',
      height: '355px',
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.FVlistOpen}>
      {props.AllFVPrevList.map((item, index) => {
        console.log('item', item);
        if (item.id === props.id) {
          return props.tap === '즐겨찾기'
            ? item.favorite.map((fvitem) => (
                <ListItem key={index} button className={classes.FVList}>
                  <ListItemAvatar style={{ minWidth: '45px' }}>
                    <FavoriteIcon
                      className={classes.FVIcon}
                      onClick={(e) => {
                        props.removeFV(item.id, fvitem);
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.searchCPList}
                    primary={fvitem.title}
                    secondary={`${fvitem.server} / ${fvitem.com} / ${fvitem.time}`}
                    //secondary="mint / NK / 오전 11:06"
                  />
                </ListItem>
              ))
            : item.prevList.map((previtem, index2) => {
                return (
                  <ListItem button className={classes.FVList}>
                    <ListItemText
                      className={classes.searchCPList}
                      primary={
                        item.prevList[item.prevList.length - (index2 + 1)].title
                      }
                      secondary={`${
                        item.prevList[item.prevList.length - (index2 + 1)]
                          .server
                      } / ${
                        item.prevList[item.prevList.length - (index2 + 1)].com
                      } / ${
                        item.prevList[item.prevList.length - (index2 + 1)].time
                      }`}
                    />
                  </ListItem>
                );
              });
        } else {
          return '';
        }
      })}
    </div>
  );
};

export default FVListitem;
