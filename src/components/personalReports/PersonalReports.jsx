import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

const PersonalReports = () => {
  const [tableData, setTableData] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const calcEachCategory = (data, category) => {
    let totalScoreList = [];
    let totalCards = 0;
    let totalScore = 0;

    if (data.length) {
      data?.forEach((el) => {
        totalCards += el?.numberOfCards;
        totalScore += el?.score;
      });
      totalScoreList.push({
        category: category,
        totalScore: totalScore,
        totalCards: totalCards,
        totalTakes: data.length,
      });
    }

    return totalScoreList[0];
  };

  const calcScore = (data, category) => {
    switch (category) {
      case "React":
        return calcEachCategory(data, category);
      case "Js":
        return calcEachCategory(data, category);
      case "Html":
        return calcEachCategory(data, category);
      case "Css":
        return calcEachCategory(data, category);
      case "General":
        return calcEachCategory(data, category);
      default:
        break;
    }
  };

  const getTheUserReport = async () => {
    const q1 = query(
      collection(db, "users"),
      where("email", "==", currentUser?.email)
    );
    const querySnapshot = await getDocs(q1);
    let report = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      report = doc.data();
    });

    //calculating total score and cards
    let tempData = [];
    for (let item in report) {
      if (typeof report[item] === "object") {
        tempData.push(calcScore(report[item], item));
      }
      setTableData(tempData);
    }
  };
  useEffect(() => {
    getTheUserReport();
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Total Score</TableCell>
            <TableCell align="right">Total Cards</TableCell>
            <TableCell align="right">Total Takes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row) => (
            <TableRow
              key={row?.category}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.category}
              </TableCell>
              <TableCell align="right">{row?.totalScore}</TableCell>
              <TableCell align="right">{row?.totalCards}</TableCell>
              <TableCell align="right">{row?.totalTakes}</TableCell>
              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PersonalReports;
