//import reactDom from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import SearchListitem from "./SearchListitem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { time } from "../common/globalFunction";
import produce from "immer";
const SearchListitemArray = ({
  AllList,
  id,
  AllFVPrevList,
  setAllFVPrevList,
  setAllList,
  onFVClick,
  onPrevInsert,
}) => {
  const useStyles = makeStyles(() => ({
    searchListArea: {
      overflowY: "auto",
      height: "680px",
    },
    searchIcon: {
      color: "red",
    },
    searchIcon2: {
      color: "#CCCCCC",
    },
    searchList: {
      width: 480,
      marginLeft: 50,
      // borderBottom: '1px solid',
      // borderBottomColor: '#DDDDDD',
      "&:hover": {
        background: "#EDF7FF;",
      },
    },
    searchCPList: {
      color: "#333333",
      lineHeight: 20,
      letterSpacing: -0.01,
      "& span": {
        fontSize: "14px",
      },
    },
  }));

  const classes = useStyles();
  /*
  const setPrevList = useCallback(
    (data, server, com, tapName) => {
      var x = "";
      const setFPList = produce(AllFVPrevList, (draft) => {
        //조회한 아이디랑 일치하는 최근기록 리스트를 list에 넣기
        //  var list = draft.find((item) => item.id === id);
        //아이디가 있으면
        // if (list !== undefined) {
        //데이터 넣기
        draft.map((fvList) => {
          if (tapName === "최근기록") {
            if (fvList.prevList.length === 101) fvList.prevList.splice(0, 1);
            fvList.prevList = fvList.prevList.concat({
              title: data,
              server: server,
              com: com,
              time: time(),
            });
            var fvtimeUpdate = fvList.favorite.find((item) => {
              return item.title === data;
            });
            if (fvtimeUpdate) fvtimeUpdate.time = time();
            //console.log("test2", test2.title);
            console.log("item", fvList);
          } else {
            //즐겨찾기에 일치하는 값이 없으면
            if (
              fvList.favorite.findIndex((item) => item.title === data) === -1
            ) {
              if (fvList.favorite.length === 100) {
                return alert(
                  "저장실패. 즐겨찾기 항목은 100개까지만 저장됩니다."
                );
              } else {
                //즐겨찾기 항목에 추가
                fvList.favorite = fvList.favorite.concat({
                  title: data,
                  server: server,
                  com: com,
                  time: "방문기록없음",
                });
                /*     x = produce(AllList, (draft) => {
                  const test = draft.find((heart1) => heart1.htmComNm === data);
                  console.log("test", test);
                  test.heart = true;
                });
                //console.log("x", x);
                //setAllList(x);
              }
            } else {
              //일치하면 항목에서 제외
              fvList.favorite.splice(
                fvList.favorite.findIndex((item) => item.title === data),
                1
              );
              /*   x = produce(AllList, (draft) => {
                const test = draft.find((heart1) => heart1.htmComNm === data);
                console.log("test", test);
                test.heart = false;
              }); 
            }
          }
        });
      });
      localStorage.setItem("FPList", JSON.stringify(setFPList));
      //console.log("x2", x);
      //   setAllList((AllList) => x);
      //setAllList(x);
      setAllFVPrevList((AllFVPrevList) => setFPList);
    },
    [AllFVPrevList]
  );
  console.log("AllList12346", AllList);

  */
  return (
    <div className={classes.searchListArea}>
      {AllList.map((search, index) => {
        return (
          <>
            <SearchListitem
              search={search}
              index={index}
              //setPrevList={setPrevList}
              onFVClick={onFVClick}
              key={index}
              onPrevInsert={onPrevInsert}
            />
          </>
        );
      })}
    </div>
  );
};

export default React.memo(SearchListitemArray);
