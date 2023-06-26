import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Quizes from "../quizes/Quizes";
import { enqueueSnackbar } from "notistack";
import "./fieldDropdown.style.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["JavaScript", "CSS", "HTML", "React"];

export default function FieldDropDown() {
  const [personName, setPersonName] = React.useState([]);
  const [isSubmited, setIsSubmited] = React.useState(false);

  const handleChange = async (event) => {
    try {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } catch (err) {
      enqueueSnackbar("Error in handleChange", { variant: "error" });
    }
  };

  const onClickHandler = () => {
    setIsSubmited(true);
  };

  return (
    <div className="dropdown-app">
      {!isSubmited ? (
        <>
          <h3>Select Category and test size</h3>
          <FormControl
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
            className="dropdown"
          >
            {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              sx={{
                width: "350px",
                marginRight: "15px",
                backgroundColor: "white",
              }}
              className="dropdown__selectbox dropdown__selectbox--category"
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <Select
              sx={{
                width: "100px",
                marginRight: "15px",
                backgroundColor: "white",
              }}
              className="dropdown__selectbox"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <Button
              variant="contained"
              sx={{ width: "150px", marginRight: "15px" }}
              onClick={onClickHandler}
              className="dropdown__btn"
            >
              Start quiz{" "}
            </Button>
          </FormControl>
        </>
      ) : (
        <Quizes />
      )}
    </div>
  );
}
