import React, { useState } from "react";
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

export default function GenreTabs() {
  const [genre, setGenre] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
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
