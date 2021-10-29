import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Checkbox, Divider, Select } from "@mui/material";

export default function MovieFilter(props: any) {
  //MÅ få fikset slik at denne holder seg konstant størrelse på menyen ++
  const [auth, setAuth] = React.useState(true);
  const [isChosen, setIsChosen] = React.useState<string>();
  const [isAsc, setIsAsc] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (e: any) => {
    setIsAsc(!isAsc);
    props.handleSort(isAsc);
  };
  const handleFilter = (e: any, value: string) => {
    setFilter(value); //sjekk hvorfor denne ikke oppdateres
    props.handleSort(filter);
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={handleMenu}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>Sort Order: </MenuItem>
        <MenuItem value="asc" onClick={handleSort}>
          {isAsc && <CheckIcon />}
          <ArrowUpwardIcon /> Asc
        </MenuItem>
        <MenuItem value="desc" onClick={handleSort}>
          {!isAsc && <CheckIcon />}
          <ArrowDownwardIcon /> Desc
        </MenuItem>
        <Divider />
        <MenuItem disabled>Sort by: </MenuItem>
        <MenuItem onClick={(_) => handleFilter(_, "title")}>
          {filter === "title" && <CheckIcon />}
          Title
        </MenuItem>
        <MenuItem onClick={(_) => handleFilter(_, "year")}>
          {filter === "year" && <CheckIcon />}
          Year
        </MenuItem>
      </Menu>
    </div>
  );
}
