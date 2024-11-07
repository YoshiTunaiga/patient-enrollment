import { Router } from "express";
import { getPatients, getPatientRiskProfiles } from "./database/helpers";

const router = Router();

router.get("/api/patients", async (req, res) => {
  try {
    let patients = await getPatients();
    const patientRiskProfiles = await getPatientRiskProfiles();
    patients.forEach((patient) => {
      patient["riskProfiles"] = patientRiskProfiles.filter(
        (profile) => profile.patientId === patient.id
      );
    });
    return res.send(patients);
  } catch (error) {
    console.error("Error getting patients", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/patients", async (req, res) => {
  try {
    const listOfPatients = await getPatients();
    const newID = listOfPatients.length + 1;
    const newPatient = {
      id: 1000 + newID,
      ...req.body,
    };
    listOfPatients.push(newPatient);

    return res.send(listOfPatients);
  } catch (error) {
    console.error("Error getting patients", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
