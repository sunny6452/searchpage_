import SearchList from './SearchList';
import SearchAutocomplete from './SearchAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback } from 'react';

const SearchTemplate = ({
  AllList,
  setAllList,
  updatePrevList,
  onHeart,
  searchList,
}) => {
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

  //입력한 text랑 이름이 같은 리스트만 보이기
  const search = useCallback(
    (val) => {
      setAllList((AllList) =>
        AllList.filter(
          (item) => item.htmComNm === val || item.htmAlias === val,
        ),
      );
    },

    [setAllList],
  );

  const changeSearch = useCallback(
    (inputText) => {
      if (inputText)
        inputText.htmComNm !== undefined
          ? search(inputText.htmComNm)
          : search(inputText);
      else setAllList((AllList) => searchList);
    },
    [setAllList, search, searchList],
  );

  return (
    <article className={`${classes.Section} ${classes.searchSection} `}>
      <div>
        <SearchAutocomplete
          searchList={searchList}
          changeSearch={changeSearch}
        />
        <SearchList
          AllList={AllList}
          updatePrevList={updatePrevList}
          onHeart={onHeart}
        />
      </div>
    </article>
  );
};

export default React.memo(SearchTemplate);
