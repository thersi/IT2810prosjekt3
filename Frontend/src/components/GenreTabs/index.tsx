import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./styles.css";
import { genreProps } from "../../Interfaces/Interfaces";

const genres = [
  "ALL GENRES",
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

/**
 * component creating markdown with genres
 */
export default function GenreTabs(props: genreProps) {
  const [genre, setGenre] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "ALL GENRES") {
      /*  If target value is equal to ALL, genre is set to empty string to exit filter */

      props.handleGenre(""); /* Sends info to parent */
      setGenre("");
    } else {
      props.handleGenre(event.target.value);

      /* Else, sets filter to chosen genre, sends to parent */

      setGenre(event.target.value);
    }
  };

  return (
    <div className="genreTabs">
      <FormControl
        id="filterForm"
        variant="filled"
        sx={{ m: 1, minWidth: 300 }}
      >
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
          {genres.map(
            (
              movieGenre /* Map through the different genres to create menuItems for each. */
            ) => (
              <MenuItem key={movieGenre} value={movieGenre}>
                {movieGenre}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
}
