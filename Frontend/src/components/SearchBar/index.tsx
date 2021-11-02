import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import { searchProps } from "../../Interfaces/Interfaces";
import { ChangeEvent } from "react";

export default function SearchBar(props: searchProps) {
  /* Function that collects information tha user writes into search bar */
  const handleWrite = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.handleSearch(e.target.value);
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="search-bar"
        placeholder="Movie Titles..."
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => handleWrite(e)}
      />
    </Search>
  );
}
