import React, { useEffect, useState, useCallback } from 'react';
import '.././App.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../common/Header';
import Login from '../component/loginComponent/Login';
import FPListTemplete from '../component/FPComponent/FPListTemplete';
import axios from 'axios';
import SearchTemplate from '../component/searchComponent/SearchTemplate';
import { time, onHref } from '../common/globalFunction';
import produce from 'immer';

var searchList = [];
const Main = () => {
  const useStyles = makeStyles(() => ({
    App: {
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Noto Sans KR',
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: '#333333',
    },
    section: {
      width: '1000px',
      margin: '0 auto',
    },
  }));

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [prevLists, setPrevLists] = useState([]);
  const [AllList, setAllList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isRemember, setIsRemember] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem('isRemember')) {
      setIsRemember(true);
      setId(localStorage.getItem('id'));
      setPassword(localStorage.getItem('pass'));
    }
  }, []);

  const onLogin = useCallback((id, password) => {
    setId((id) => id);
    setPassword((password) => password);
    var url = 'https://api.himgt.net/commonLogin/list/' + id;
    if (id === '') url = 'https://api.himgt.net/commonLogin/list/empty';

    axios.get(url).then((response) => {
      const data = response.data;
      setAllList((AllList) => response.data);
      searchList = response.data;
      var getFVList = data.filter((item) => item.favorite === 'true');
      setFavoriteList((favoriteList) => getFVList);
    });
    var getPVList = [];
    var storageData = JSON.parse(localStorage.getItem('prevList'));
    if (storageData !== null) {
      getPVList = storageData.filter((item) => item.id === id);
      setPrevLists((prevLists) => getPVList);
    }
  }, []);

  const reset = () => {
    setAllList([]);
    setPrevLists([]);
    setFavoriteList([]);
  };

  const FVRemove = useCallback(
    (htmComCd) => {
      axios
        .delete('https://api.himgt.net/commonLogin/favoriteDelete', {
          data: {
            htmComCd: htmComCd,
            userId: id,
          },
        })
        .then((response) => {
          console.log(response);
        });
      setFavoriteList((favoriteList) =>
        favoriteList.filter((item) => item.htmComCd !== htmComCd),
      );
    },
    [id],
  );

  const FVInsert = useCallback(
    (search) => {
      axios
        .put('https://api.himgt.net/commonLogin/favoriteInsert', {
          htmAlias: search.htmAlias,
          htmComCd: search.htmComCd,
          htmComNm: search.htmComNm,
          //htmPerSabun: id,
          userId: id,
        })
        .then((response) => {
          console.log(response);
        });
      setFavoriteList((favoriteList) =>
        produce(favoriteList, (draft) => {
          draft.push({
            htmComNm: search.htmComNm,
            htmComCd: search.htmComCd,
            htmAlias: search.htmAlias,
            favorite: 'true',
          });
          draft.sort((a, b) =>
            a.htmComNm < b.htmComNm ? -1 : a.htmComNm > b.htmComNm ? 1 : 0,
          );
        }),
      );
    },
    [id],
  );

  const updatePrevList = useCallback(
    (search) => {
      setPrevLists((prevLists) =>
        produce(prevLists, (draft) => {
          draft.push({
            htmComNm: search.htmComNm,
            htmComCd: search.htmComCd,
            htmAlias: search.htmAlias,
            id: id,
            time: time(),
          });
          localStorage.setItem('prevList', JSON.stringify(draft));
        }),
      );
      onHref(search, id, password);
    },
    [id, password],
  );

  const onHeart = useCallback(
    (search, favorite) => {
      if (favorite !== 'true') {
        changeFavorite(search, favorite);
        FVInsert(search);
      } else {
        changeFavorite(search, favorite);
        FVRemove(search.htmComCd);
      }
    },
    [FVRemove, FVInsert],
  );

  const changeFavorite = (search, bool) => {
    var setbool = 'false';
    bool !== 'true' && (setbool = 'true');
    setAllList((AllList) =>
      AllList.map((allList) =>
        allList.htmComCd === search.htmComCd
          ? {
              ...allList,
              favorite: setbool,
            }
          : allList,
      ),
    );
  };
  return (
    <>
      <div className={classes.App}>
        <Header />

        <section className={classes.section}>
          <Login
            onLogin={onLogin}
            id={id}
            reset={reset}
            setId={setId}
            password={password}
            setPassword={setPassword}
            isRemember={isRemember}
            setIsRemember={setIsRemember}
          />
          <FPListTemplete
            prevLists={prevLists}
            favoriteList={favoriteList}
            onHeart={onHeart}
            updatePrevList={updatePrevList}
          />
          <SearchTemplate
            AllList={AllList}
            searchList={searchList}
            setAllList={setAllList}
            updatePrevList={updatePrevList}
            onHeart={onHeart}
          />
        </section>
      </div>
    </>
  );
};
export default React.memo(Main);
