import React, { useEffect, useState, useCallback } from 'react';
import '.././App.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../common/Header';
import FPListTemplete from '../component/FPComponent/FPListTemplete';
import axios from 'axios';
import SearchTemplate from '../component/searchComponent/SearchTemplate';
import { time, onHref } from '../common/globalFunction';
import { enableES5 } from 'immer';
import styled from 'styled-components';
import produce from 'immer';
//익스플로러에서 immer 사용하기 위해 실행
enableES5();

var url = 'https://api.himgt.net/commonLogin/list';

const StyleSection = styled.section`
  width: 1000px;
  margin: 0 auto;
`;

const Main = ({ location, match, history }) => {
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

  console.log('main ', location.state);
  const [prevLists, setPrevLists] = useState([]);
  const [AllList, setAllList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const classes = useStyles();
  const { userid, userpw, sabun } = location.state;

  useEffect(() => {
    if (location.state !== undefined) {
      axios.post(url, { htmPerSabun: sabun }).then((response) => {
        console.log('login data', response.data);
        const data = response.data;
        setAllList((AllList) => response.data);
        var getFVList = data.filter((item) => item.favorite === 'true');
        setFavoriteList((favoriteList) => getFVList);
        console.log('getFVList', getFVList);
      });
      var getPVList = [];
      var storageData = JSON.parse(localStorage.getItem('prevList'));
      if (storageData !== null) {
        getPVList = storageData.filter((item) => item.id === userid);
        setPrevLists((prevLists) => getPVList);
      }
    } else {
      alert('로그인 후 이용하세요.');
      history.push('./login');
    }
  }, [userid, sabun, location, history]);

  const FVRemove = useCallback(
    (htmComCd) => {
      axios
        .post('https://api.himgt.net/commonLogin/favoriteDelete', {
          htmComCd: htmComCd,
          htmPerSabun: sabun,
        })
        .then((response) => {
          if (response.data.resultCode !== '200') {
            alert('아이디 또는 비밀번호를 확인하세요.');
            return false;
          } else {
            setFavoriteList((favoriteList) =>
              favoriteList.filter((item) => item.htmComCd !== htmComCd),
            );
          }
        });
      return true;
    },
    [sabun],
  );

  const FVInsert = useCallback(
    (search) => {
      axios
        .post('https://api.himgt.net/commonLogin/favoriteInsert', {
          htmAlias: search.htmAlias,
          htmComCd: search.htmComCd,
          htmComNm: search.htmComNm,
          htmPerSabun: sabun,
        })
        .then((response) => {
          if (response.data.resultCode !== '200') {
            alert('아이디 또는 비밀번호를 확인하세요.');
            return false;
          } else {
            setFavoriteList((favoriteList) =>
              produce(favoriteList, (draft) => {
                draft.push({
                  htmComNm: search.htmComNm,
                  htmComCd: search.htmComCd,
                  htmAlias: search.htmAlias,
                  favorite: 'true',
                });
                draft.sort((a, b) =>
                  a.htmComNm < b.htmComNm
                    ? -1
                    : a.htmComNm > b.htmComNm
                    ? 1
                    : 0,
                );
              }),
            );
          }
        });
      return true;
    },
    [sabun],
  );

  const updatePrevList = useCallback(
    (search) => {
      if (userid !== '') {
        setPrevLists((prevLists) =>
          produce(prevLists, (draft) => {
            draft.push({
              htmComNm: search.htmComNm,
              htmComCd: search.htmComCd,
              htmAlias: search.htmAlias,
              id: userid,
              time: time(),
            });
            localStorage.setItem('prevList', JSON.stringify(draft));
          }),
        );
      }
      onHref(search, userid, userpw);
    },
    [userid, userpw],
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
      if (favorite !== 'true') {
        var result = FVInsert(search);
        if (result) changeFavorite(search, favorite);
      } else {
        result = FVRemove(search.htmComCd);
        if (result) changeFavorite(search, favorite);
      }
    },
    [FVRemove, FVInsert, changeFavorite],
  );

  return (
    <>
      <div className={classes.App}>
        <Header />
        <StyleSection>
          <SearchTemplate
            AllList={AllList}
            updatePrevList={updatePrevList}
            onHeart={onHeart}
          />
          <FPListTemplete
            prevLists={prevLists}
            favoriteList={favoriteList}
            onHeart={onHeart}
            updatePrevList={updatePrevList}
          />
        </StyleSection>
      </div>
    </>
  );
};
export default React.memo(Main);
