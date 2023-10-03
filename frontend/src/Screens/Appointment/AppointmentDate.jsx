import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import AppointmentSteps from "../../components/AppointmentSteps";
import { Container, Box, Paper, Grid } from "@material-ui/core";
import images01 from "../../images/appointment/appointment2.svg";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { saveDateTime } from "../../slices/choiceSlice";
import DateFnsUtils from "@date-io/date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AppointmentDate = () => {
  const choice = useSelector((state) => state.choice);
  const { DateTime } = choice;

  const [selectedDate, setSelectedDate] = useState(DateTime.selectedDate || "");
  const [selectedTime, setSelectedTime] = useState(DateTime.selectedTime || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDateTime({ selectedDate, selectedTime }));
    navigate("/appointmentaddress");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log(selectedTime);
  };
  return (
    <>
      <FormContainer>
        <AppointmentSteps steps={1} />
      </FormContainer>
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <div className="row mt-4">
            <div className="col-md-5">
              <img
                src={images01}
                className="img-fluid"
                alt="appointment booking"
              ></img>
            </div>
            <div className="col-md-5 mt-4">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container-fluid>
                  <KeyboardDatePicker
                    disableToolbar
                    margin="normal"
                    id="date-picker-dialog"
                    placeholder="Select The Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid container>
                  <KeyboardTimePicker
                    placeholder="Select The Time"
                    mask="__:__ _M"
                    value={selectedTime}
                    onChange={(time) => handleTimeChange(time)}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="d-grid gap-2 d-md-block mt-5 ml-5">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={submitHandler}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default AppointmentDate;