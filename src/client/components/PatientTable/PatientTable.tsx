import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PatientTable = ({ patients }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Enrollment Status</TableCell>
            <TableCell align="left">RAF SCORE</TableCell>
          </TableRow>
        </TableHead>
        {patients && (
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {patient.id}
                </TableCell>
                <TableCell align="left">{patient.name}</TableCell>
                <TableCell align="left">{patient.enrollmentStatus}</TableCell>
                <TableCell align="left">
                  {patient.riskProfiles.reduce((accu, profile) => {
                    const demographicSum = profile?.demographicCoefficients
                      ? profile?.demographicCoefficients.reduce(
                          (sum, num) => sum + num,
                          0
                        )
                      : 0;
                    const diagnosisSum = profile?.diagnosisCoefficients
                      ? profile?.diagnosisCoefficients.reduce(
                          (sum, num) => sum + num,
                          0
                        )
                      : 0;

                    return accu + demographicSum + diagnosisSum;
                  }, 0) || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
