import { MouseEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Divider } from "@mui/material";
import { MovieFilterProps } from "../../Interfaces/Interfaces";

export default function MovieFilter(props: MovieFilterProps) {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (e: MouseEvent<HTMLElement>, value: boolean) => {
    setIsAsc(value);
    props.handleSort(value);
  };
  const handleFilter = (e: MouseEvent<HTMLElement>, value: string) => {
    setFilter(value);
    props.handleFilter(value);
  };
  return (
    <div>
      <IconButton
        id="sortButton"
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
        <MenuItem disabled>Sort by order: </MenuItem>
        <MenuItem
          id="checkAsc"
          value="asc"
          onClick={(_) => handleSort(_, true)}
        >
          {isAsc && <CheckIcon id="ascCheck" />}
          <ArrowUpwardIcon /> Asc
        </MenuItem>
        <MenuItem
          id="checkDesc"
          value="desc"
          onClick={(_) => handleSort(_, false)}
        >
          {!isAsc && <CheckIcon />}
          <ArrowDownwardIcon /> Desc
        </MenuItem>
        <Divider />
        <MenuItem disabled>Sort by type: </MenuItem>
        <MenuItem id="checkTitle" onClick={(_) => handleFilter(_, "title")}>
          {filter === "title" && <CheckIcon />}
          Title
        </MenuItem>
        <MenuItem id="checkYear" onClick={(_) => handleFilter(_, "year")}>
          {filter === "year" && <CheckIcon />}
          Year
        </MenuItem>
      </Menu>
    </div>
  );
}
