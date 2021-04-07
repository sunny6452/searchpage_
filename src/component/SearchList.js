import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchListitem from "./SearchListitem";

const SearchList = ({ AllList, id, AllFVPrevList, setAllFVPrevList }) => {
  const useStyles = makeStyles(() => ({
    Section: {
      position: "absolute",
      width: "400px",
      background: "#ffffff",
      borderRadius: "10px",
    },
    searchSection: {
      width: "580px",
      height: "820px",
      top: "90px",
      marginLeft: "430px",
    },
    searchCompany: {
      marginTop: 55,
      width: 480,
      height: "56px",
      marginLeft: "50px",
      "& label": {
        fontSize: "14px",
        fontWeight: "bold",
        lineHeight: "20px",
      },
      "& TextField": {
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0.01em",
        color: "#263238",
        display: "flex",
      },
      "& .MuiOutlinedInput-root": {
        height: "56px",
      },
    },
    searchList: {
      width: 480,
      marginLeft: 50,
      "&:hover": {
        background: "#EDF7FF;",
      },
    },
  }));

  const classes = useStyles();
  const [searchList, setSearchList] = useState([]);

  //처음 화면 켜졌을 때 모든 리스트 가져오기
  useEffect(() => {
    setSearchList(AllList);
  }, [AllList]);

  //입력한 text랑 이름이 같은 리스트만 보이기
  const search = (val) => {
    var filterList = AllList.filter(
      (item) => item.htmComNm === val || item.htmAlias === val
    );
    setSearchList(filterList);
  };

  return (
    <>
      <article className={`${classes.Section} ${classes.searchSection} `}>
        <div>
          <Autocomplete
            freeSolo
            id="combo-box-demo"
            options={AllList}
            getOptionLabel={(option) => option.htmComNm}
            className={classes.searchCompany}
            onChange={(e, value) => {
              console.log("AllList", AllList);
              if (value)
                value.htmComNm !== undefined
                  ? search(value.htmComNm)
                  : search(value);
              else setSearchList(AllList);
            }}
            renderInput={(params) => {
              return (
                <TextField {...params} label="회사검색" variant="outlined" />
              );
            }}
          />
          <br />
          <SearchListitem
            AllList={searchList}
            setAllFVPrevList={setAllFVPrevList}
            AllFVPrevList={AllFVPrevList}
            id={id}
          />
        </div>
      </article>
    </>
  );
};

export default SearchList;
