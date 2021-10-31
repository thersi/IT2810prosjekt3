import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";

export default function SearchBar(props: any) {
  const handleWrite = (e: any) => {
    props.handleSearch(e.target.value);
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id = "search-bar"
        placeholder="Movie Titles..."
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => handleWrite(e)}
      />
    </Search>
  );
}
