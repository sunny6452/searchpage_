import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchListitem from './SearchListitem';

const SearchList = ({ AllList, updatePrevList, onHeart }) => {
  const useStyles = makeStyles(() => ({
    searchListArea: {
      overflowY: 'auto',
      height: '680px',
      marginTop: '13px',
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.searchListArea}>
      {AllList.map((searchitem, index) => (
        <SearchListitem
          searchitem={searchitem}
          key={index + searchitem}
          updatePrevList={updatePrevList}
          onHeart={onHeart}
        />
      ))}
    </div>
  );
};

export default React.memo(SearchList);
