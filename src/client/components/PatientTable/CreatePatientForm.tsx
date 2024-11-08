import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Patient } from "../../../server/types";

const CreatePatientForm = ({
  setAllPatients,
}: {
  setAllPatients: (patients: Patient[]) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [patientForm, setPatientForm] = useState({
    name: "",
    enrollmentStatus: "Prospect",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPatientForm({
      ...patientForm,
      enrollmentStatus: event.target.value as string,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatientForm({
      ...patientForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const updatedPatientList = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientForm),
    });
    if (updatedPatientList.ok) {
      const data = await updatedPatientList.json();
      setAllPatients(data);
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Patient
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}>
        <DialogTitle>Add Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new patient, please enter their name and enrollment
            status here.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={handleInputChange}
            margin="dense"
            id="name"
            name="name"
            label="Patient Name"
            fullWidth
            value={patientForm.name}
          />
          <div style={{ marginTop: 10 }}>
            <InputLabel>Enrollment Status</InputLabel>
            <Select
              required
              style={{ width: "100%" }}
              label="Enrollment Status"
              value={patientForm.enrollmentStatus}
              onChange={handleChange}>
              <MenuItem value={"Prospect"}>Prospect</MenuItem>
              <MenuItem value={"Insurance Eligibility Verified"}>
                Insurance Eligibility Verified
              </MenuItem>
              <MenuItem value={"Enrollment Contract Signed"}>
                Enrollment Contract Signed
              </MenuItem>
              <MenuItem value={"Patient Record Created"}>
                Patient Record Created
              </MenuItem>
              <MenuItem value={"Intake Appointment Scheduled"}>
                Intake Appointment Scheduled
              </MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreatePatientForm;
