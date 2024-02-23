import { useState } from 'react';

import { Button, Grid, Slider, Stack, TextField, Typography } from '@mui/material';

import FormGroupHeader from './form-header/FormGroupHeader';
import s from './style.module.scss';

interface FormGroup {
  header: string;
  slider?: number;
  textInput: string;
  button1?: string;
  button2?: string;
}

function RepaymentForm() {
  const [formGroup1, setFormGroup1] = useState<FormGroup>({
    header: "",
    slider: 50,
    textInput: "",
  });

  const [formGroup2, setFormGroup2] = useState<FormGroup>({
    header: "",
    textInput: "",
  });

  const [formGroup3, setFormGroup3] = useState<FormGroup>({
    header: "",
    button1: "Button 1",
    button2: "Button 2",
  });

  const [formGroup4, setFormGroup4] = useState<FormGroup>({
    header: "",
    slider: 50,
    textInput: "",
  });

  const handleInputChange = (
    event: Event,
    formGroup: FormGroup,
    setFormGroup: FormGroup
  ) => {
    const { name, value } = event.target;
    setFormGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSliderChange = (event: Event, formGroup, setFormGroup) => {
    const value = event.target.value;
    setFormGroup((prevState) => ({
      ...prevState,
      slider: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className={s.container}>
      <Typography variant="h3" noWrap sx={{ mb: 4, mt: 2 }}>
        Tilgungsrechner
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <FormGroupHeader title={"Darlehensbeitrag"} />
              <Stack direction={"row"} spacing={2}>
                <Slider
                  name="slider"
                  value={formGroup1.slider}
                  onChange={(event) =>
                    handleSliderChange(event, formGroup1, setFormGroup1)
                  }
                />
                <TextField
                  name="textInput"
                  label="Text Input"
                  value={formGroup1.textInput}
                  onChange={(event) =>
                    handleInputChange(event, formGroup1, setFormGroup1)
                  }
                  required
                />
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <FormGroupHeader title={"Sollzinssatz"} />
              <TextField
                name="textInput"
                label="Text Input"
                value={formGroup2.textInput}
                onChange={(event) =>
                  handleInputChange(event, formGroup2, setFormGroup2)
                }
                required
              />
            </Grid>
          </Grid>

          <FormGroupHeader title={"Tilgungssatz"} />
          <Button variant="contained" color="primary">
            {formGroup3.button1}
          </Button>
          <Button variant="contained" color="secondary">
            {formGroup3.button2}
          </Button>

          <FormGroupHeader title={"Zinsbindungsdauer"} />
          <Stack direction={"row"}>
            <Slider
              name="slider"
              value={formGroup4.slider}
              onChange={(event) =>
                handleSliderChange(event, formGroup4, setFormGroup4)
              }
            />
            <TextField
              name="textInput"
              label="Text Input"
              value={formGroup4.textInput}
              onChange={(event) =>
                handleInputChange(event, formGroup4, setFormGroup4)
              }
              required
            />
          </Stack>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default RepaymentForm;
