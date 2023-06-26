// import * as React from "react";
// // import OutlinedInput from "@mui/material/OutlinedInput";
// // import MenuItem from "@mui/material/MenuItem";
// // import FormControl from "@mui/material/FormControl";
// // import ListItemText from "@mui/material/ListItemText";
// // import Select from "@mui/material/Select";
// // import Checkbox from "@mui/material/Checkbox";
// // import Button from "@mui/material/Button";
// import Quizes from "../quizes/Quizes";
// import CategorySelector from "../categorySelector/CategorySelector";
// import { enqueueSnackbar } from "notistack";
// import "./fieldDropdown.style.css";

// const names = ["JavaScript", "CSS", "HTML", "React"];

// export default function FieldDropDown() {
//   const [personName, setPersonName] = React.useState([]);
//   const [isSubmited, setIsSubmited] = React.useState(false);

//   const handleChange = async (event) => {
//     try {
//       const {
//         target: { value },
//       } = event;
//       setPersonName(
//         // On autofill we get a stringified value.
//         typeof value === "string" ? value.split(",") : value
//       );
//     } catch (err) {
//       enqueueSnackbar("Error in handleChange", { variant: "error" });
//     }
//   };

//   const onClickHandler = () => {
//     setIsSubmited(true);
//   };

//   return (
//     <div className="dropdown-app">
//       {!isSubmited ? (
//         <>
//           <h3>Select Category and test size</h3>
//           <CategorySelector />
//         </>
//       ) : (
//         <Quizes />
//       )}
//     </div>
//   );
// }
