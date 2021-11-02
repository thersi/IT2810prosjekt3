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
  const [isAsc, setIsAsc] =
    useState<boolean>(
      true
    ); /* isAsc has value true if list is to be sorted in ascending order, false if descending */
  const [filter, setFilter] =
    useState<string>(
      "title"
    ); /* Initially filtered by title, sets filter to be chosen value. */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); /* Decides if popup menu open or closed */
  };

  const handleClose = () => {
    setAnchorEl(null); /* Closes menu */
  };

  const handleSort = (e: MouseEvent<HTMLElement>, value: boolean) => {
    setIsAsc(value);
    props.handleSort(value); /* Sends value to parent */
  };
  const handleFilter = (e: MouseEvent<HTMLElement>, value: string) => {
    setFilter(value);
    props.handleFilter(value); /* Sends value to parent */
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
        {/* Disabled for visuals */}
        <MenuItem
          id="checkAsc"
          value="asc"
          onClick={(_) => handleSort(_, true)}
        >
          {isAsc && <CheckIcon id="ascCheck" />}{" "}
          {/* if ascending, checkIcon is
          shown */}
          <ArrowUpwardIcon /> Asc
        </MenuItem>
        <MenuItem
          id="checkDesc"
          value="desc"
          onClick={(_) => handleSort(_, false)}
        >
          {!isAsc && <CheckIcon />} {/* If descending, checkIcon is shown */}
          <ArrowDownwardIcon /> Desc
        </MenuItem>
        <Divider />
        <MenuItem disabled>Sort by type: </MenuItem>
        <MenuItem
          id="checkTitle"
          value="Title"
          onClick={(_) =>
            handleFilter(_, "title")
          } /* Calls on function handlefilter to set filter value to 'title' */
        >
          {filter === "title" && <CheckIcon />}
          Title
        </MenuItem>
        <MenuItem
          id="checkYear"
          value="Year"
          onClick={(_) =>
            handleFilter(_, "year")
          } /* Calls on function handlefilter to set filter value to 'year' */
        >
          {filter === "year" && <CheckIcon />}{" "}
          {/* The value chosen is the one that has a checkmark */}
          Year
        </MenuItem>
      </Menu>
    </div>
  );
}
