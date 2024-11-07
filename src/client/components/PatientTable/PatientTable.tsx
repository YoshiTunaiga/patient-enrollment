import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PatientTable = ({ patients }) => {
  interface HighestRAFSegment {
    segmentName: string;
    avgScore: string;
  }

  const [highestRAFSegment, setHighestRAFSegment] =
    useState<HighestRAFSegment | null>(null);

  useEffect(() => {
    if (patients) {
      calculateHighestRAFSegment();
    }
  }, [patients]);

  const calculateHighestRAFSegment = () => {
    const segmentScores = {};

    // Step 1: Calculate RAF scores for each patient's risk profile
    patients.forEach((patient) => {
      patient.riskProfiles.forEach((profile) => {
        if (profile.demographicCoefficients && profile.diagnosisCoefficients) {
          const demographicSum = profile.demographicCoefficients
            ? profile.demographicCoefficients.reduce((sum, num) => sum + num, 0)
            : 0;
          const diagnosisSum = profile.diagnosisCoefficients
            ? profile.diagnosisCoefficients.reduce((sum, num) => sum + num, 0)
            : 0;

          const rafScore = demographicSum + diagnosisSum;

          // Step 2: Aggregate RAF scores by segment name
          if (!segmentScores[profile.segmentName]) {
            segmentScores[profile.segmentName] = { totalScore: 0, count: 0 };
          }
          segmentScores[profile.segmentName].totalScore += rafScore;
          segmentScores[profile.segmentName].count += 1;
        }
      });
    });

    // Step 3: Calculate average RAF scores for each segment
    let highestAvgScore = 0;
    let highestSegment: HighestRAFSegment = { segmentName: "", avgScore: "" };

    for (const segment in segmentScores) {
      const { totalScore, count } = segmentScores[segment];
      const avgScore = totalScore / count;

      if (avgScore > highestAvgScore) {
        highestAvgScore = avgScore;
        highestSegment = {
          segmentName: segment,
          avgScore: avgScore.toFixed(3),
        };
      }
    }

    setHighestRAFSegment(highestSegment);
  };

  return (
    <>
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
                    {Math.max(
                      ...patient.riskProfiles.map((profile) => {
                        if (
                          profile?.demographicCoefficients &&
                          profile?.diagnosisCoefficients
                        ) {
                          const demographicSum = profile.demographicCoefficients
                            ? profile.demographicCoefficients.reduce(
                                (sum, num) => sum + num,
                                0
                              )
                            : 0;
                          const diagnosisSum = profile.diagnosisCoefficients
                            ? profile.diagnosisCoefficients.reduce(
                                (sum, num) => sum + num,
                                0
                              )
                            : 0;

                          const rafScore = demographicSum + diagnosisSum;
                          return rafScore;
                        } else {
                          return 0;
                        }
                      })
                    ) || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Typography>
        {patients &&
          highestRAFSegment &&
          `Segment: ${highestRAFSegment.segmentName}, Average RAF Score: ${highestRAFSegment.avgScore}
`}
      </Typography>
    </>
  );
};

export default PatientTable;
