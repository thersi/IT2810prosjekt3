import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import MovieScroll from "../MovieScroll";
const MovieSearch = (props: any) => {
  const [value, setValue] = useState<String>();
  const handleSearch = (event: any) => {
    props.click(value);
  };
  return (
    <div>
      <div className="searchBar">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "auto",
            marginBottom: "50px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Movie"
            inputProps={{ "aria-label": "movies" }}
            value={value}
            onChange={(event) => {
              //adding the onChange event
              setValue(event.target.value);
            }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <MovieScroll search={value} />
    </div>
  );
};

export default MovieSearch;
