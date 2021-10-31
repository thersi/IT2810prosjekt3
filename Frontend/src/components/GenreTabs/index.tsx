import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const genres = [
  "ACTION",
  "ADVENTURE",
  "ANIMATION",
  "BIOGRAPHY",
  "COMEDY",
  "CRIME",
  "DOCUMENTARY",
  "DRAMA",
  "FAMILY",
  "FANTASY",
  "FILMNOIR",
  "HISTORY",
  "HORROR",
  "MUSIC",
  "MUSICAL",
  "MYSTERY",
  "ROMANCE",
  "SCIFI",
  "SHORT",
  "SPORT",
  "THRILLER",
  "WAR",
  "WESTERN",
];
export default function GenreTabs(props: any) {
  const [genre, setGenre] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    props.handleGenre(event.target.value);
    setGenre(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1 }}>
      <InputLabel id="demo-simple-select-standard-label">
        Select Genre
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={genre}
        onChange={handleChange}
        label="genre"
        autoWidth
      >
        {" "}
        {genres.map((movieGenre) => (
          <MenuItem value={movieGenre}>{movieGenre}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
