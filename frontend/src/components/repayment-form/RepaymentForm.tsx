import { useState } from 'react';

import {
    Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Slider, TextField, Typography
} from '@mui/material';

import FormGroupHeader from './form-header/FormGroupHeader';
import s from './style.module.scss';

interface FormData {
  loanContribution: number;
  interestRate: number;
  repaymentType: string;
  repaymentRate: number;
  interestPeriod?: number;
}

function RepaymentForm() {
  const [formData, setFormData] = useState<FormData>({
    loanContribution: 3000,
    interestRate: 2,
  repaymentType: 'percent',
    repaymentRate: 100,
    interestPeriod: 0,
  });

  const handleInputChange = (value: number | string, key: string) => {
    if (typeof value === "string") {
      Number(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      repaymentType: value,
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
        <Grid container spacing={3}>
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

          <Grid container item xs={12}>
            <Grid item xs={12}>
              <FormGroupHeader title={"Tilgungssatz"} />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <RadioGroup
                  defaultValue="percent"
                  name="repaymentRadio"
                  value={formData.repaymentType}
                  onChange={(event)=>handleRadioChange(event.target.value)}
                >
                  <FormControlLabel
                    value="percent"
                    control={<Radio />}
                    label="Tilgungssatz"
                  />
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Monatliche Rate"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={formData.interestRate}
                onChange={(event) =>
                  handleInputChange(event.target.value, "repaymentRate")
                }
                required
              />
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={12}>
              <FormGroupHeader title={"Zinsbindungsdauer"} />
            </Grid>
            <Grid item xs={6}>
              <Slider
                name="slider"
                value={formData.interestPeriod}
                onChange={(event, value) =>
                  handleInputChange(value as number, "interestPeriod")
                }
              />
            </Grid>
            <Grid item xs={6}>
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
