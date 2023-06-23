import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StyleIcon from "@mui/icons-material/Style";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="todoapp" style={{ textDecoration: "none" }}>
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PlayCircleOutlineIcon />
      </ListItemIcon>
      <Link to="todoapp" style={{ textDecoration: "none" }}>
        <ListItemText primary="Take exam" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <StyleIcon />
      </ListItemIcon>
      <Link to="flashcards" style={{ textDecoration: "none" }}>
        <ListItemText primary="Flashcards" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link to="flashcards" style={{ textDecoration: "none" }}>
        <ListItemText primary="Personal Report" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EmojiEventsIcon />
      </ListItemIcon>
      <Link to="flashcards" style={{ textDecoration: "none" }}>
        <ListItemText primary="Standings" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Admin
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Create Questions" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DesignServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Questions" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Users" />
    </ListItemButton>
  </React.Fragment>
);
