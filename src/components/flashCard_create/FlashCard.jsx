import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore/lite";
import "./flashCard.style.css";

function FlashCard() {
  const [question, setQuestion] = useState("");
  const [typeValue, setTypeValue] = useState("css");
  const [levelValue, setLevelValue] = useState("easy");
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleChangeType = (event) => {
    setTypeValue(event.target.value);
  };
  const handleChangeLevel = (event) => {
    setLevelValue(event.target.value);
  };

  const handleChangeInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const questionsCollection = collection(db, "flashcards");
      await addDoc(questionsCollection, {
        author: currentUser?.email,
        ...data,
      });
      //resetting the inputs
      setAnswer("");
      setQuestion("");
      setCode("");
    } catch (err) {
      enqueueSnackbar("Sth went wrong. Please try again later", {
        variant: "error",
      });
      console.log("error:", err);
    }
  };

  return (
    <div className="flashCards__container">
      <SnackbarProvider />
      <h2 className="flashCards__header">FLASHCARD</h2>
      <div>
        <FormControl
          sx={{ m: 1, width: 400 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <FormControl component="fieldset">
              <Typography variant="h6" gutterBottom>
                Select category:
              </Typography>
              <RadioGroup
                className="flashCards__typeTab"
                value={typeValue}
                onChange={handleChangeType}
                name="category"
                row
              >
                <FormControlLabel
                  value="html"
                  control={<Radio />}
                  label="HTML"
                />
                <FormControlLabel value="css" control={<Radio />} label="CSS" />
                <FormControlLabel value="js" control={<Radio />} label="JS" />

                <FormControlLabel
                  value="react"
                  control={<Radio />}
                  label="REACT"
                />
                <FormControlLabel
                  value="general"
                  control={<Radio />}
                  label="General"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <Typography variant="h6" gutterBottom>
                Select level:
              </Typography>
              <RadioGroup
                className="flashCards__levelTab"
                value={levelValue}
                onChange={handleChangeLevel}
                row
                name="level"
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
            value={question}
            name="question"
            minRows={5}
            placeholder="Input Question"
          />
          <Typography variant="h6" gutterBottom>
            Answer:
          </Typography>
          <TextareaAutosize
            sx={{ marginTop: "2rem" }}
            id="outlined-basic"
            label="Input Answer"
            variant="outlined"
            onChange={handleChangeAnswer}
            value={answer}
            name="answer"
            minRows={5}
            placeholder="Input Answer"
          />
          <Typography variant="h6" gutterBottom>
            Code:
          </Typography>
          <TextareaAutosize
            sx={{ marginTop: "2rem" }}
            id="outlined-basic"
            label="Input Code"
            variant="outlined"
            onChange={handleCode}
            value={code}
            name="code"
            minRows={5}
            placeholder="Input Code"
          />
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
export default FlashCard;
