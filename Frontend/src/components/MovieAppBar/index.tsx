import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "../SearchBar";
import MovieFilter from "../MovieFilter";


interface MovieAppBarProps {
  handleSearch: (value: string) => void;
}

export default function MovieAppBar(props: MovieAppBarProps) {

  let searchValue = (value: string) => {
    props.handleSearch(value);
  };

  // const handleInput = (text: any) => {
  //   props.sendSearch(text);
  // };
  
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
          <MovieFilter />
          <SearchBar handleSearch={searchValue} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
