import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteTemplete from './FavoriteTemplete';
import PrevListTemplete from './PrevListTemplete';

const FVListTemplete = ({
  prevLists,
  favoriteList,
  onHeart,
  updatePrevList,
}) => {
  const useStyles = makeStyles(() => ({
    Section: {
      position: 'absolute',
      width: '400px',
      background: '#ffffff',
      borderRadius: '10px',
    },
    FVSection: {
      height: '820px',
      top: '90px',
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
    taps: {
      marginTop: 20,
      '& .MuiTabs-indicator': {
        background: '#1976D2',
      },
    },
  }));

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const tapChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <article className={`${classes.Section} ${classes.FVSection} `}>
        <div>
          <Tabs
            //첫번째 탭일 때 value가 0, 두번째 탭일 때 value 1
            value={value}
            onChange={tapChange}
            className={classes.taps}
            centered
          >
            <Tab className={classes.FVtap} label="즐겨찾기" />
            <Tab className={classes.PrevTab} label="최근기록" />
          </Tabs>
          <br />
          {value === 0 ? (
            <FavoriteTemplete
              onHeart={onHeart}
              favoriteList={favoriteList}
              updatePrevList={updatePrevList}
            />
          ) : (
            <PrevListTemplete
              prevLists={prevLists}
              updatePrevList={updatePrevList}
            />
          )}
        </div>
      </article>
    </>
  );
};

export default React.memo(FVListTemplete);
