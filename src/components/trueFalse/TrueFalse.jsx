import React, { useState } from "react";
import "./trueFalse.style.css";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { TextareaAutosize } from "@mui/material";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";

function TrueFalse() {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [typeValue, setTypeValue] = useState("css");
  const [levelValue, setLevelValue] = useState("easy");
  const [booleanValue, setBooleanValue] = useState("true");

  const handleChangeType = (event) => {
    setTypeValue(event.target.value);
  };
  const handleChangeLevel = (event) => {
    setLevelValue(event.target.value);
  };
  const handleChangeBoolean = (event) => {
    setBooleanValue(event.target.value);
  };

  const handleChangeInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(Object.fromEntries(formData));
    try {
      const questionsCollection = collection(db, "questions");
      await addDoc(questionsCollection, {
        ...data,
        options: ["true", "false"],
      });
    } catch (err) {
      console.log("err:", err);
    }
    setText("");
    setTypeValue("css");
    setLevelValue("easy");
    setBooleanValue("true");
  };

  return (
    <div className="trueFalse__container">
      <SnackbarProvider />
      <h2 className="trueFalse__header">QUIZ FORM</h2>
      <div>
        <FormControl
          sx={{ m: 1, width: 400 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" gutterBottom>
            Select Category:
          </Typography>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <FormControl component="fieldset">
              <RadioGroup
                className="trueFalse__typeTab"
                value={typeValue}
                onChange={handleChangeType}
                name="category"
                row
              >
                <FormControlLabel value="css" control={<Radio />} label="CSS" />
                <FormControlLabel value="js" control={<Radio />} label="JS" />
                <FormControlLabel
                  value="react"
                  control={<Radio />}
                  label="REACT"
                />
                <FormControlLabel
                  value="cs"
                  control={<Radio />}
                  label="CS RELATED"
                />
              </RadioGroup>
            </FormControl>
            <Typography variant="h6" gutterBottom>
              Select Level:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                className="trueFalse__levelTab"
                value={levelValue}
                name="level"
                onChange={handleChangeLevel}
                row
              >
                <FormControlLabel
                  value="easy"
                  control={<Radio />}
                  label="EASY"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="MEDIUM"
                />
                <FormControlLabel
                  value="hard"
                  control={<Radio />}
                  label="HARD"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Typography variant="h6" gutterBottom>
            Question:
          </Typography>
          <TextareaAutosize
            sx={{ marginTop: "1rem" }}
            id="outlined-basic"
            label="Input Question"
            variant="outlined"
            onChange={handleChangeInput}
            value={text}
            name="question"
            placeholder="Input question"
            minRows={5}
          />
          <FormControl component="fieldset">
            <Typography variant="h6" gutterBottom>
              Select Correct Answer:
            </Typography>
            <RadioGroup
              className="trueFalse__booleanTab"
              value={booleanValue}
              onChange={handleChangeBoolean}
              name="answer"
              row
            >
              <FormControlLabel value="true" control={<Radio />} label="TRUE" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="FALSE"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() =>
              enqueueSnackbar("Question created", { variant: "success" })
            }
          >
            Submit
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default TrueFalse;
