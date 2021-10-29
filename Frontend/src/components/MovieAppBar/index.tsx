import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "../SearchBar";
import MovieFilter from "../MovieFilter";
import { createTheme } from "@mui/system";

export default function MovieAppBar(props: any) {
  let searchValue = (value: string) => {
    props.handleSearch(value);
  };
  let filterValue = (value: string) => {
    props.handleFilter(value);
  };
  let sortValue = (value: string) => {
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
