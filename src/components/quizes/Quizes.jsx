import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { questions } from "../fieldDropdown/dummyQuestions";
import "../fieldDropdown/fieldDropdown.style.css";

export default function Quizes() {
  const [value, setValue] = React.useState("");
  const [error] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose an aswer");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // destructuring
  const { question, choices, correctAnswer, index } = questions[activeQuestion];
  const [selectedAnswer] = useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === correctAnswer) {
      setHelperText("You got it!");
    } else {
      setHelperText("Sorry, wrong answer!");
    }
  };

  const calcScore = () => {
    if (value === correctAnswer) {
      setScore(score + 1);
    }
  };

  const onClickNext = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((step) => step + 1);
      return calcScore();
    }

    // this is for "Finish button"
    if (activeQuestion === questions.length - 1) {
      setIsFinished(true);
      calcScore();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="js-quiz">
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        {!isFinished ? (
          <>
            <h5 className="js-quiz__h3">
              Question {index} out of {questions.length}
            </h5>
            <h2 className="js-quiz__question">{question}</h2>

            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              {choices.map((item, index) => (
                <FormControlLabel
                  className="js-quiz__answers"
                  value={item}
                  key={index}
                  control={<Radio />}
                  label={item}
                  sx={{ fontSize: "20px" }}
                />
              ))}
            </RadioGroup>
            <FormHelperText sx={{ color: "black" }}>
              {helperText}
            </FormHelperText>
            <Button
              sx={{ mt: 1, width: "60%", margin: "0 auto" }}
              color="secondary"
              type="submit"
              variant="contained"
            >
              Check Answer
            </Button>
            <Button
              sx={{ width: "60%", margin: "0 auto", mt: "15px" }}
              variant="contained"
              value={selectedAnswer}
              onClick={onClickNext}
            >
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </>
        ) : (
          <div>
            {score >= 2 ? (
              <p>Congratulations !!! You gain a badge</p>
            ) : (
              <p>Poor score : {score} </p>
            )}
            <div className="js-quiz__score">
              <p>{score}</p>
            </div>
          </div>
        )}
      </FormControl>
    </form>
  );
}
