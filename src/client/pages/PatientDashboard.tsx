import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import PatientTable from "../components/PatientTable/PatientTable";
import CreatePatientForm from "../components/PatientTable/CreatePatientForm";

const PatientDashboard = () => {
  const [allPatients, setAllPatients] = useState(null);

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await fetch("/api/patients");
        const data = await response.json();
        setAllPatients(data);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };
    fetchAllPatients();
  }, []);

  return (
    <div>
      <Box
        sx={(theme) => ({
          width: "100%",
          backgroundRepeat: "no-repeat",

          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
          }),
        })}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}>
          <Stack
            spacing={2}
            useFlexGap
            sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}>
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                fontSize: "clamp(3rem, 10vw, 3.5rem)",
              }}>
              Patients
            </Typography>
          </Stack>
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "right",
              padding: 10,
              width: "100%",
              maxWidth: "100%",
            }}>
            <CreatePatientForm setAllPatients={setAllPatients} />
          </div>
          <PatientTable patients={allPatients} />
        </Container>
      </Box>
    </div>
  );
};

export default PatientDashboard;
