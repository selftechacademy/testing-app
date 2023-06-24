import "./fourChoices.style.css";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function FourChoices() {
  const theme = useTheme();
  const [question, setQuestion] = useState("");
  const [typeValue, setTypeValue] = useState("css");
  const [levelValue, setLevelValue] = useState("easy");
  const [answer, setAnswer] = useState("");

  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setAnswerThree] = useState("");
  const [answerFour, setAnswerFour] = useState("");

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
  const handleChangeAnswerTwo = (e) => {
    setAnswerTwo(e.target.value);
  };
  const handleChangeAnswerThree = (e) => {
    setAnswerThree(e.target.value);
  };
  const handleChangeAnswerFour = (e) => {
    setAnswerFour(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <div className="fourChoices__container">
      <SnackbarProvider />
      <h2 className="fourChoices__header"> Four Choices</h2>
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
                className="fourChoices__typeTab"
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
            <FormControl component="fieldset">
              <Typography variant="h6" gutterBottom>
                Select level:
              </Typography>
              <RadioGroup
                className="fourChoices__levelTab"
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
          <p>
            Please note that there is a one question with multiple-choice
            options, out of which only one answer is correct.
          </p>
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
            label="Input Answer One"
            variant="outlined"
            onChange={handleChangeAnswer}
            value={answer}
            name="answerIncOne"
            minRows={5}
            placeholder="Incorrect Answer"
          />
          <br />
          <TextareaAutosize
            sx={{ marginTop: "2rem" }}
            id="outlined-basic"
            label="Input Answer Two"
            variant="outlined"
            onChange={handleChangeAnswerTwo}
            value={answerTwo}
            name="answerIncTwo"
            minRows={5}
            placeholder="Incorrect Answer"
          />
          <br />
          <TextareaAutosize
            sx={{ marginTop: "2rem" }}
            id="outlined-basic"
            label="Input Answer Three"
            variant="outlined"
            onChange={handleChangeAnswerThree}
            value={answerThree}
            name="answerIncThree"
            minRows={5}
            placeholder="Incorrect Answer"
          />
          <br />
          <TextareaAutosize
            sx={{ marginTop: "2rem" }}
            id="outlined-basic"
            label="Input Answer Four"
            variant="outlined"
            onChange={handleChangeAnswerFour}
            value={answerFour}
            name="answerCorrect"
            minRows={5}
            placeholder="Correct Answer"
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
export default FourChoices;
