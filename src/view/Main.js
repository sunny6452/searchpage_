import React, { useEffect, useState, useCallback } from 'react';
import '.././App.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../common/Header';
import Login from '../component/loginComponent/Login';
import FPListTemplete from '../component/FPComponent/FPListTemplete';
import axios from 'axios';
import SearchTemplate from '../component/searchComponent/SearchTemplate';
import { time, onHref, idCheck } from '../common/globalFunction';
import { enableES5 } from 'immer';
import produce from 'immer';
//익스플로러에서 immer 사용하기 위해 실행
enableES5();
var searchList = [];
var url = 'https://api.himgt.net/commonLogin/list/empty';
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
      //if (id !== '') url = 'https://api.himgt.net/commonLogin/list/' + id;
    }
    axios.get(url).then((response) => {
      setAllList((AllList) => response.data);
    });
  }, []);

  const onLogin = useCallback((id, password) => {
    idCheck(id, password);
    setId((id) => id);
    setPassword((password) => password);
    if (id !== '') url = 'https://api.himgt.net/commonLogin/list/' + id;
    axios.get(url).then((response) => {
      const data = response.data;
      setAllList((AllList) => response.data);
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
          console.log(response.data);
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
          htmPerSabun: id,
          userId: id,
        })
        .then((response) => {
          if (response.data.resultCode !== '200') {
            alert('아이디 또는 비밀번호를 확인하세요.');
          }
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
      if (id !== '') {
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
      }
      onHref(search, id, password);
    },
    [id, password],
  );

  const changeFavorite = useCallback((search, bool) => {
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
  }, []);

  const onHeart = useCallback(
    (search, favorite) => {
      if (idCheck(id, password) === true) {
        if (favorite !== 'true') {
          changeFavorite(search, favorite);
          FVInsert(search);
        } else {
          changeFavorite(search, favorite);
          FVRemove(search.htmComCd);
        }
      }
    },
    [FVRemove, FVInsert, changeFavorite, id, password],
  );

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
            updatePrevList={updatePrevList}
            onHeart={onHeart}
          />
        </section>
      </div>
    </>
  );
};
export default React.memo(Main);
