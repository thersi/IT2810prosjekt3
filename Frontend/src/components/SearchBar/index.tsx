import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import { ChangeEvent } from "react-transition-group/node_modules/@types/react";
import { searchProps } from "../../Interfaces/Interfaces";

export default function SearchBar(props: searchProps) {
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
