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
    <Link to="/" style={{ textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to="flashcards" style={{ textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <StyleIcon />
        </ListItemIcon>
        <ListItemText primary="Flashcards" />
      </ListItemButton>
    </Link>
    <Link to="quiz" style={{ textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <PlayCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Take exam" />
      </ListItemButton>
    </Link>
    <Link to="personalReport" style={{ textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Personal Report" />
      </ListItemButton>
    </Link>
    <Link to="flashcards" style={{ textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="Standings" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Admin
    </ListSubheader>
    <Link to="createquestions" style={{ textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Create Questions" />
      </ListItemButton>
    </Link>
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
