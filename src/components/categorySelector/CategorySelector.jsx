// import { flashcards } from "../../flashcards";
// import React, { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-flip";
// import { EffectFlip } from "swiper";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Button from "@mui/material/Button";
// import { useContext } from "react";
// import { AuthContext } from "../../context/auth-context";
// import { db } from "../../firebase-config";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   setDoc,
// } from "firebase/firestore/lite";
// import { enqueueSnackbar } from "notistack";

// // category checkbox style
// // const ITEM_HEIGHT = 48;
// // const ITEM_PADDING_TOP = 8;
// // const MenuProps = {
// //   PaperProps: {
// //     style: {
// //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// //       width: 250,
// //     },
// //   },
// // };

// // checkbox categories
// const categories = ["React", "Js", "Html", "Css", "General"];

// // flash cards functions
// const CategorySelector = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [numberOfCards, setNumberOfCards] = useState(0);

//   const { currentUser } = useContext(AuthContext);

//   // category selection
//   const handleChangeCategory = (e) => {
//     setSelectedCategory(e.target.value);
//     // getAllFlashcards(e.target.value);
//   };

//   // number of cards selection
//   const SelectNumberOfCards = () => {
//     const handleChangeNrCards = (e) => {
//       setNumberOfCards(e.target.value);
//     };

//     return (
//       <div>
//         <FormControl sx={{ m: 1, minWidth: 350 }}>
//           <InputLabel id="demo-simple-select-autowidth-label">
//             questions
//           </InputLabel>
//           <Select
//             labelId="demo-simple-select-autowidth-label"
//             id="demo-simple-select-autowidth"
//             value={numberOfCards}
//             onChange={handleChangeNrCards}
//             label="Number of cards"
//           >
//             <MenuItem value={10}>Ten (10)</MenuItem>
//             <MenuItem value={20}>Twenty (20)</MenuItem>
//             <MenuItem value={30}>Thirty (30)</MenuItem>
//           </Select>
//         </FormControl>
//       </div>
//     );
//   };

//   // flash cards app
//   return (
//     <>
//       <div className="flash-cards__app">
//         <h2>Flash Cards</h2>
//         <div className="flash-cards__categories__checkbox">
//           <div>
//             <FormControl sx={{ m: 1, minWidth: 350 }}>
//               <InputLabel id="demo-simple-select-autowidth-label">
//                 Categories
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-autowidth-label"
//                 id="demo-simple-select-autowidth"
//                 value={selectedCategory}
//                 onChange={handleChangeCategory}
//                 label="Number of cards"
//               >
//                 {categories.map((el) => {
//                   return (
//                     <MenuItem key={el} value={el}>
//                       {el}
//                     </MenuItem>
//                   );
//                 })}
//               </Select>
//             </FormControl>
//           </div>
//           <SelectNumberOfCards />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CategorySelector;
