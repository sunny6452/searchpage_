//import reactDom from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { time } from '../common/globalFunction';
import produce from 'immer';
const SearchListitem = ({ AllList, id, AllFVPrevList, setAllFVPrevList }) => {
  const useStyles = makeStyles(() => ({
    searchListArea: {
      overflowY: 'auto',
      height: '680px',
    },
    searchIcon: {
      color: 'red',
    },
    searchIcon2: {
      color: '#CCCCCC',
    },
    searchList: {
      width: 480,
      marginLeft: 50,
      // borderBottom: '1px solid',
      // borderBottomColor: '#DDDDDD',
      '&:hover': {
        background: '#EDF7FF;',
      },
    },
    searchCPList: {
      color: '#333333',
      lineHeight: 20,
      letterSpacing: -0.01,
      '& span': {
        fontSize: '14px',
      },
    },
  }));

  const classes = useStyles();

  const setPrevList = (data, server, com, tapName) => {
    const setFPList = produce(AllFVPrevList, (draft) => {
      //조회한 아이디랑 일치하는 최근기록 리스트를 list에 넣기
      var list = draft.find((item) => item.id === id);
      //아이디가 있으면
      if (list !== undefined) {
        //데이터 넣기
        if (tapName === '최근기록') {
          if (list.prevList.length === 101) list.prevList.splice(0, 1);

          list.prevList = list.prevList.concat({
            title: data,
            server: server,
            com: com,
            time: time(),
          });
          var fvtimeUpdate = list.favorite.find((item) => {
            return item.title === data;
          });
          if (fvtimeUpdate) fvtimeUpdate.time = time();
          //console.log("test2", test2.title);
        } else {
          //즐겨찾기에 일치하는 값이 없으면
          if (list.favorite.findIndex((item) => item.title === data) === -1) {
            if (list.favorite.length === 100) {
              return alert('저장실패. 즐겨찾기 항목은 100개까지만 저장됩니다.');
            } else {
              //즐겨찾기 항목에 추가
              list.favorite = list.favorite.concat({
                title: data,
                server: server,
                com: com,
                time: '방문기록없음',
              });
            }
          } else {
            //일치하면 항목에서 제외
            list.favorite.splice(
              list.favorite.findIndex((item) => item.title === data),
              1
            );
          }
        }
      } else {
        tapName === '최근기록'
          ? //아이디가 없으면 새로만들어주기
            draft.push({
              id: id,
              favorite: [],
              prevList: [
                {
                  title: data,
                  server: server,
                  com: com,
                  time: time(),
                },
              ],
            })
          : draft.push({
              id: id,
              favorite: [
                {
                  title: data,
                  server: server,
                  com: com,
                  time: '방문기록없음',
                },
              ],
              prevList: [],
            });
      }
    });
    localStorage.setItem('FPList', JSON.stringify(setFPList));
    setAllFVPrevList(setFPList);
  };

  return (
    <div className={classes.searchListArea}>
      {AllList.map((search, index) => {
        //검색리스트랑 즐겨찾기 리스트중 id 같은 것만 temp에 담기
        const temp = AllFVPrevList.find((item) => {
          return item.id === id;
        });
        //temp가 없으면 false (빈하트)
        var heart = false;
        if (temp !== undefined) {
          //즐겨찾기 리스트랑 검색리스트랑 이름같으면 true
          heart = temp.favorite.find(
            (FAName) => FAName.title === search.htmComNm
          )
            ? true
            : false;
        }
        return (
          <ListItem key={index + search} button className={classes.searchList}>
            <ListItemIcon
              style={{ minWidth: '45px' }}
              //name="즐겨찾기"
              id="즐겨찾기"
              onClick={(e) => {
                setPrevList(
                  search.htmComNm,
                  search.htmAlias,
                  search.htmComCd,
                  e.currentTarget.id
                );
              }}
            >
              {heart ? (
                <FavoriteIcon className={classes.searchIcon} />
              ) : (
                <FavoriteBorderIcon className={classes.searchIcon2} />
              )}
            </ListItemIcon>
            <ListItemText
              className={classes.searchCPList}
              //name="최근기록"
              id="최근기록"
              primary={`${search.htmComNm} - ${search.htmAlias} `}
              onClick={(e) => {
                setPrevList(
                  search.htmComNm,
                  search.htmAlias,
                  search.htmComCd,
                  e.currentTarget.id
                );
              }}
            />
          </ListItem>
        );
      })}
    </div>
  );
};

export default SearchListitem;
