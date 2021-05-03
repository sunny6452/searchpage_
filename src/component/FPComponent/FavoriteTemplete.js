import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteItem from './FavoriteItem';

const FavoriteTemplete = ({ favoriteList, onHeart, updatePrevList }) => {
  const useStyles = makeStyles(() => ({
    FVlistOpen: {
      marginTop: '-10px',
      overflowY: 'auto',
      height: '720px',
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.FVlistOpen}>
      {favoriteList.map((favorite, index) => (
        <FavoriteItem
          favorite={favorite}
          onHeart={onHeart}
          updatePrevList={updatePrevList}
          key={index + favorite}
        />
      ))}
    </div>
  );
};

export default React.memo(FavoriteTemplete);
