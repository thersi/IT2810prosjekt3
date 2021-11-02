import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "../SearchBar";
import MovieFilter from "../MovieFilter";
import { MovieAppBarProps } from "../../Interfaces/Interfaces";

export default function MovieAppBar(props: MovieAppBarProps) {
  //The below methods are used to get parent from child to parent
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
            Møvies
          </Typography>
          <MovieFilter
            aria-label={
              "Movie filter to filter movies by ascending or descending order. Also filters by title og year. "
            }
            aria-required="true"
            handleFilter={filterValue} //Sends filter value from child to parent
            handleSort={sortValue} //Sends sort value from child to parent
          />
          <SearchBar
            aria-label={"Search bar to search through movie titles"}
            aria-required="true"
            handleSearch={searchValue} //Sends search value from child to parent
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
