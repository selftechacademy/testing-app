import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import { EffectFlip } from "swiper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
// import { useContext } from "react";
// import { AuthContext } from "../../context/auth-context";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import "./flashcards.style.css";
import { enqueueSnackbar } from "notistack";

// category checkbox style
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// checkbox categories
const categories = ["React", "Js", "Html", "Css", "General"];

// flash cards functions
const FlashCards = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [countCards, setCountCards] = useState(0);
  const [score, setScore] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState("");
  const [startFlashCards, setStartFlashCards] = useState(false);
  const [dbFlashCards, setDbFlashcards] = useState([]);
  const [selectedFlashCards, setSelectedFlashCards] = useState([]);

  // const { currentUser } = useContext(AuthContext);

  // go to initial slide
  const swiperRef = useRef(null);

  const getRandomFlashCards = () => {
    const flashCardsList = [];
    const randomNumList = [];
    //getting the random index numbers first
    do {
      for (let i = 0; i < numberOfCards; i++) {
        let randomNum = Math.floor(Math.random() * dbFlashCards.length);
        if (!randomNumList.includes(randomNum)) {
          randomNumList.push(randomNum);
        }
        if (randomNumList.length === numberOfCards) {
          break;
        }
      }
    } while (randomNumList.length !== numberOfCards);

    //picking up questions
    randomNumList.forEach((num) => {
      flashCardsList.push(dbFlashCards[num]);
    });

    //setting the selected cards
    setSelectedFlashCards([...flashCardsList]);
  };

  const getAllFlashcards = async (category) => {
    try {
      const q1 = query(
        collection(db, "flashcards"),
        where("category", "==", category.toLowerCase())
      );
      const querySnapshot = await getDocs(q1);
      const allFlashCards = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        allFlashCards.push(doc.data());
      });
      setDbFlashcards([...allFlashCards]);
    } catch (err) {
      enqueueSnackbar("sth went wrong", { variant: "erro" });
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (numberOfCards) {
      getRandomFlashCards();
    }
    // eslint-disable-next-line
  }, [startFlashCards]);

  const handleSlideTo = (slide) => {
    swiperRef.current.swiper.slideTo(slide);
  };

  // const endGame = async () => {
  //   // if user exists
  //   // const todoRef = doc(db, "users", currentUser.email);
  //   // await setDoc(todoRef, { isCompleted: true }, { merge: true });
  // };

  // click I know the answer
  const onClickIknow = () => {
    setScore(score + 1);
    setCountCards(countCards + 1);
    onClickNextCard();
    handleSlideTo(0);
    if (countCards === numberOfCards - 1) {
      console.log("game is ended");
    }
  };

  // click I didnt know the answer
  const onClickIdontknow = () => {
    setCountCards(countCards + 1);
    onClickNextCard();
    handleSlideTo(0);
  };

  // draw next card
  const onClickNextCard = () => {
    setCountCards(countCards + 1);
  };

  // category selection
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
    getAllFlashcards(e.target.value);
  };

  // number of cards selection
  const SelectNumberOfCards = () => {
    const handleChangeNrCards = (e) => {
      setNumberOfCards(e.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 350 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Number of cards
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={numberOfCards}
            onChange={handleChangeNrCards}
            label="Number of cards"
          >
            <MenuItem value={10}>Ten (10)</MenuItem>
            <MenuItem value={20}>Twenty (20)</MenuItem>
            <MenuItem value={30}>Thirty (30)</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  // set the cards to start
  const onClickStart = () => {
    console.log("flashcard", selectedFlashCards);
    console.log("count", countCards);
    console.log("db flashcard", dbFlashCards);
    setStartFlashCards(true);
  };

  // play again
  const onClickRestart = () => {
    setStartFlashCards(false);
    setSelectedCategory("");
    setCountCards(0);
    setScore(0);
    setNumberOfCards("");
  };

  // start screen
  const start = () => {
    return (
      <div className="flash-cards__start">
        <p>Select category and number of cards</p>
        <Button color="success" variant="contained" onClick={onClickStart}>
          Start
        </Button>
      </div>
    );
  };

  // end screen
  const end = () => {
    return (
      <div className="flash-cards__end">
        <h4>Congratulations!</h4>
        <p>
          Your score is {score} out of {countCards}
        </p>
        <p>{((score / countCards) * 100).toFixed(2)}% correct answers!</p>
        <Button variant="contained" color="success" onClick={onClickRestart}>
          Again
        </Button>
      </div>
    );
  };

  // flash cards app
  return (
    <>
      <div className="flash-cards__app">
        <h2>Flash Cards</h2>
        {!startFlashCards && (
          <div className="flash-cards__categories__checkbox">
            <div>
              <FormControl sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedCategory}
                  onChange={handleChangeCategory}
                  label="Number of cards"
                >
                  {categories.map((el) => {
                    return (
                      <MenuItem key={el} value={el}>
                        {el}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <SelectNumberOfCards />
          </div>
        )}
        {countCards >= numberOfCards && countCards > 0 ? (
          end()
        ) : selectedCategory.length > 0 &&
          numberOfCards > 0 &&
          startFlashCards ? (
          <>
            <div className="flash-cards__score">
              <p className="flash-cards__correctAnsw" id="correctAnsw">
                Correct answers {score} out of {countCards}
              </p>
              <p className="flash-cards__correctAnsw" id="correctAnsw">
                Your score is{" "}
                {countCards ? ((score / countCards) * 100).toFixed(2) : 0}%
              </p>
            </div>
            <Swiper
              effect={"flip"}
              grabCursor={true}
              modules={[EffectFlip]}
              className="mySwiper"
              initialSlide={0}
              ref={swiperRef}
              roundLengths={true}
            >
              <div key={countCards}>
                <SwiperSlide onClick={() => handleSlideTo(1)}>
                  <p className="flash-cards__question">
                    {selectedFlashCards[countCards]?.question}
                  </p>
                </SwiperSlide>
                <SwiperSlide onClick={() => handleSlideTo(0)}>
                  <p className="flash-cards__answer">
                    {selectedFlashCards[countCards]?.answer}
                  </p>
                </SwiperSlide>
              </div>
              <div className="flesh-cards__btns">
                <Button
                  variant="contained"
                  className="flash-cards__inotknow-btn"
                  color="error"
                  onClick={onClickIdontknow}
                >
                  I don't know it
                </Button>
                <Button
                  variant="contained"
                  className="flash-cards__iknow-btn"
                  color="success"
                  onClick={onClickIknow}
                >
                  I know it
                </Button>
              </div>
            </Swiper>
          </>
        ) : (
          start()
        )}
      </div>
    </>
  );
};

export default FlashCards;
