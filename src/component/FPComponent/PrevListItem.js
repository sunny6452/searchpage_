import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const PrevListitem = ({ index, prevLists, updatePrevList }) => {
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
    searchCPList: {
      color: '#333333',
      letterSpacing: -0.01,
    },
  }));
  const classes = useStyles();
  var htmComNm = prevLists[prevLists.length - (index + 1)].htmComNm;
  var htmAlias = prevLists[prevLists.length - (index + 1)].htmAlias;
  var htmComCd = prevLists[prevLists.length - (index + 1)].htmComCd;
  var time = prevLists[prevLists.length - (index + 1)].time;
  var search = {
    htmComNm: htmComNm,
    htmAlias: htmAlias,
    htmComCd: htmComCd,
  };

  return (
    <ListItem className={classes.FVList}>
      <ListItemText
        onClick={(e) => {
          updatePrevList(search);
        }}
        className={classes.searchCPList}
        primary={htmComNm}
        secondary={`${htmAlias} 
                / ${htmComCd} 
                / ${time}`}
      />
    </ListItem>
  );
};

export default React.memo(PrevListitem);
