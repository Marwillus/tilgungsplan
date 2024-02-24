import { useState } from 'react';

import { Button, FormGroup, Grid, Slider, TextField, Typography } from '@mui/material';

import FormGroupHeader from './form-header/FormGroupHeader';
import s from './style.module.scss';

interface FormData {
  loanContribution: number;
  interestRate: number;
  repaymentRate: number;
  interestPeriod?: number;
}

function RepaymentForm() {
  const [formData, setFormData] = useState<FormData>({
    loanContribution: 3000,
    interestRate: 2,
    repaymentRate: 100,
    interestPeriod: 0,
  });

  const handleInputChange = (value: number | string, key: string) => {
    if (typeof value === 'string') {
      Number(value)
    }
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = (event: Event) => {
    console.log(formData);
    event.preventDefault();

    // Handle form submission here
  };

  return (
    <div className={s.container}>
      <Typography variant="h3" noWrap sx={{ mb: 4, mt: 2 }}>
        Tilgungsrechner
      </Typography>

      <form onSubmit={() => handleSubmit}>
        <Grid container spacing={2}>
          <Grid container item md={6} xs={12}>
            <Grid item xs={12}>
              <FormGroupHeader title={"Darlehensbeitrag"} />
            </Grid>
            <Grid item xs={6}>
              <Slider
                min={0}
                max={10000}
                value={formData.loanContribution}
                onChange={(event, value) =>
                  handleInputChange(value as number, "loanContribution")
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={formData.loanContribution}
                onChange={(event) =>
                  handleInputChange(event.target.value, "loanContribution")
                }
                required
              />
            </Grid>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormGroupHeader title={"Sollzinssatz"} />
            <TextField
              value={formData.interestRate}
              onChange={(event) =>
                handleInputChange(event.target.value, "interestRate")
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormGroup>
              <FormGroupHeader title={"Tilgungssatz"} />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.option1}
                    onChange={handleChangeCheckbox}
                    name="option1"
                    color="primary"
                  />
                }
                label="Option 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.option2}
                    onChange={handleChangeCheckbox}
                    name="option2"
                    color="primary"
                  />
                }
                label="Option 2"
              />
              <TextField
                label="Text Field"
                name="textField"
                value={formData.textFieldValue}
                onChange={handleChangeTextField}
                variant="outlined"
                margin="normal"
                disabled={!formData.option1 && !formData.option2}
              /> */}
              <TextField
                value={formData.interestRate}
                onChange={(event) =>
                  handleInputChange(event.target.value, "repaymentRate")
                }
                required
              />
            </FormGroup>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={12}>
              <FormGroupHeader title={"Zinsbindungsdauer"} />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="slider"
                value={formData.interestPeriod}
                onChange={(event, value) =>
                  handleInputChange(value as number, "interestPeriod")
                }
              />
              <TextField
                value={formData.interestPeriod}
                onChange={(event) =>
                  handleInputChange(event.target.value, "interestPeriod")
                }
                required
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default RepaymentForm;
