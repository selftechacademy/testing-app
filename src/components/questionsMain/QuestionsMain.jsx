import "./questionsMain.style.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TrueFalse from "../trueFalse/TrueFalse";

import FlashCard from "../flashCard_2/FlashCard";
import FourChoices from "../fourChoices/FourChoices";

function QuestionsMain() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <h1 className="header__questionsMain">CREATE A QUESTION</h1>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="TRUE/FALSE" value="1" />
              <Tab label="FOUR CHOICES" value="2" />
              <Tab label="FLASHCARDS" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TrueFalse />
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <FourChoices />{" "}
          </TabPanel>
          <TabPanel value="3">
            <FlashCard />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default QuestionsMain;
