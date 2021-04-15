import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchListitem from './SearchListitem';
import { List } from 'react-virtualized';

const SearchList = ({ AllList, updatePrevList, onHeart }) => {
  const useStyles = makeStyles(() => ({
    searchListArea: {
      overflowY: 'auto',
      height: '680px',
      marginTop: '13px',
    },
  }));

  const rowRenderer = useCallback(
    (props) => {
      const searchitem = AllList[props.index];

      return (
        <SearchListitem
          searchitem={searchitem}
          key={props.key}
          updatePrevList={updatePrevList}
          onHeart={onHeart}
          style={props.style}
          AllList={AllList}
        />
      );
    },
    [AllList, updatePrevList, onHeart],
  );

  const classes = useStyles();
  return (
    <List
      className={classes.searchListArea}
      width={550}
      height={680}
      rowCount={AllList.length}
      rowHeight={45}
      rowRenderer={rowRenderer}
      list={AllList}
      style={{ outline: 'none' }}
    />
  );
};

export default React.memo(SearchList);
