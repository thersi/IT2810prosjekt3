import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "../SearchBar";
import MovieFilter from "../MovieFilter";
import { MovieAppBarProps } from "../../Interfaces";

export default function MovieAppBar(props: MovieAppBarProps) {
  let searchValue = (value: string) => {
    props.handleSearch(value);
  };
  let filterValue = (value: string) => {
    props.handleFilter(value);
  };
  let sortValue = (value: boolean) => {
    props.handleSort(value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Movies
          </Typography>
          <MovieFilter handleFilter={filterValue} handleSort={sortValue} />
          <SearchBar handleSearch={searchValue} handleSort={sortValue} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
