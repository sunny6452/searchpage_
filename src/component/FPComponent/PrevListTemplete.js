import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PrevListItem from './PrevListItem';

const PrevListTemplete = ({ prevLists, updatePrevList }) => {
  const useStyles = makeStyles(() => ({
    FVlistOpen: {
      marginTop: '-10px',
      overflowY: 'auto',
      height: '360px',
    },
  }));
  console.log('prevListsTemplate prevList', prevLists);
  const classes = useStyles();
  return (
    <div className={classes.FVlistOpen}>
      {prevLists.map(
        (previtem, index) =>
          previtem.htmComNm !== undefined && (
            <PrevListItem
              prevLists={prevLists}
              index={index}
              key={index + previtem}
              updatePrevList={updatePrevList}
            />
          ),
      )}
    </div>
  );
};

export default React.memo(PrevListTemplete);
