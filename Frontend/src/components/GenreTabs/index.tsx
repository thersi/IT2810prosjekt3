import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./styles.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(genre: string, movieGenre: readonly string[], theme: Theme) {
  return {
    fontWeight:
      movieGenre.indexOf(genre) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function GenreTabs() {
  const theme = useTheme();
  const [movieGenre, setMovieGenre] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof movieGenre>) => {
    const {
      target: { value },
    } = event;
    setMovieGenre(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="genreSelect">
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={movieGenre}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Genre</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Genre</em>
          </MenuItem>
          {genres.map((genre) => (
            <MenuItem
              key={genre}
              value={genre}
              style={getStyles(genre, movieGenre, theme)}
            >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
