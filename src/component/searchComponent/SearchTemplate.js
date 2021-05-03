import SearchAutocomplete from './SearchAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const SearchTemplate = ({ AllList, updatePrevList, onHeart }) => {
  const useStyles = makeStyles(() => ({
    Section: {
      position: 'absolute',
      width: '400px',
      background: '#ffffff',
      borderRadius: '10px',
    },
    searchSection: {
      width: '580px',
      height: '820px',
      top: '90px',
      marginLeft: '430px',
    },
  }));

  const classes = useStyles();

  return (
    <article className={`${classes.Section} ${classes.searchSection} `}>
      <SearchAutocomplete
        searchList={AllList}
        updatePrevList={updatePrevList}
        onHeart={onHeart}
      />
    </article>
  );
};

export default React.memo(SearchTemplate);
