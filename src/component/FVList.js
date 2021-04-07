import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import produce from 'immer';
import FVListitem from './FVListitem';

const FVList = ({ id, AllFVPrevList, setAllFVPrevList }) => {
  const useStyles = makeStyles(() => ({
    Section: {
      position: 'absolute',
      width: '400px',
      background: '#ffffff',
      borderRadius: '10px',
    },
    FVSection: {
      height: '450px',
      top: '460px',
    },
    FVtap: {
      color: '#1976D2',
      fontWeight: 'bold',
      fontSize: 14,
    },
    PrevTab: {
      color: '#1976D2',
      fontWeight: 'bold',
      fontSize: 14,
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [FVChecked, setFVChecked] = useState(true);
  const [testList1, setTestList1] = useState([]);
  const tapChange = (event, newValue) => {
    setValue(newValue);
    //console.log(newValue);
    if (newValue === 0) {
      setFVChecked(true);
    } else {
      setFVChecked(false);
    }
  };

  useEffect(() => {
    //immer 썼을때
    const getFVList = produce(AllFVPrevList, (draft) => {
      draft.map((item) => {
        if (item.id === id) {
          item.favorite.sort((a, b) =>
            a.title < b.title ? -1 : a.title > b.title ? 1 : 0
          );
        }
      });
    });
    setAllFVPrevList(getFVList);

    //*************immer 안썼을때***********************
    const cloneObj = (obj) => JSON.parse(JSON.stringify(obj));
    var test = cloneObj(AllFVPrevList);
    var testList = test.find((item) => {
      if (item.id === id) {
        return item.favorite.sort((a, b) =>
          a.title < b.title ? -1 : a.title > b.title ? 1 : 0
        );
      }
    });

    //console.log("testList", testList);
    setTestList1(
      AllFVPrevList.map((allList) =>
        allList.id === id
          ? {
              ...allList,
              favorite: testList.favorite,
            }
          : allList
      )
    );
    // console.log("testList1", testList1);
  }, [id, AllFVPrevList, setAllFVPrevList]);

  const removeFV = (id, removeName) => {
    //스프레드 연산자 썼을 때
    const localFavoriteList = AllFVPrevList.map((allList) =>
      allList.id === id
        ? {
            ...allList,
            favorite: allList.favorite.filter(
              (fvName) => fvName !== removeName
            ),
          }
        : allList
    );
    setAllFVPrevList(localFavoriteList);
    localStorage.setItem('FPList', JSON.stringify(localFavoriteList));

    //**************스프레드 연산자 안썼을때**************************
    var testList = AllFVPrevList.map((test2) =>
      test2.id === id
        ? {
            id: test2.id,
            favorite: test2.favorite.filter((fvName) => fvName !== removeName),
            prevList: test2.prevList,
          }
        : test2
    );
    //console.log('testList', testList);
    //setAllFVPrevList(testList);
    //localStorage.setItem('FPList', JSON.stringify(testList));
  };

  return (
    <>
      <article className={`${classes.Section} ${classes.FVSection} `}>
        <div>
          <Tabs
            //첫번째 탭일 때 value가 0, 두번째 탭일 때 value 1
            value={value}
            onChange={tapChange}
            indicatorColor="primary"
            TabIndicatorProps={{
              style: { background: '#1976D2' },
            }}
            style={{ marginTop: 20 }}
            className={classes.taps}
            centered
          >
            <Tab className={classes.FVtap} label="즐겨찾기" name="FV" />
            <Tab className={classes.PrevTab} name="prev" label="최근기록" />
          </Tabs>
          <br />

          <div className={classes.listOpen}>
            {FVChecked ? (
              <FVListitem
                AllFVPrevList={AllFVPrevList}
                removeFV={removeFV}
                id={id}
                tap="즐겨찾기"
              />
            ) : (
              <div></div>
            )}
            {!FVChecked ? (
              <FVListitem
                AllFVPrevList={AllFVPrevList}
                id={id}
                tap="최근기록"
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default FVList;
