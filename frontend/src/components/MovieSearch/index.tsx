import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
const MovieSearch = () => {
  return (
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
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default MovieSearch;
