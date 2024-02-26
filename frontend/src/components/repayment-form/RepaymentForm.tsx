import axios from 'axios';
import { log } from 'console';
import { FormEvent, useState } from 'react';

import EuroIcon from '@mui/icons-material/Euro';
import PercentIcon from '@mui/icons-material/Percent';
import {
    Button, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup,
    Select, Slider, TextField, Typography
} from '@mui/material';

import FormGroupHeader from './form-header/FormGroupHeader';
import s from './style.module.scss';

interface RepaymentFormData {
  loanContribution: number;
  interestRate: number;
  repaymentType: string;
  repaymentRate: number;
  interestPeriod?: number;
}

function RepaymentForm() {
  const [formData, setFormData] = useState<RepaymentFormData>({
    loanContribution: 3000,
    interestRate: 2,
    repaymentType: "cash",
    repaymentRate: 100,
    interestPeriod: 10,
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response = await axios.post('/api/calculate-repayment', formData);
      const response = await axios.post(
        "http://localhost:4000/repayment",
        formData
      );

      if (response.status === 201) {
        console.log("Calculation succeed");
        console.log(response.data);
      } else {
        console.error("Failed to post form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle network errors
    }
  };

  return (
    <div className={s.container}>
      <Typography variant="h3" noWrap sx={{ mb: 4, mt: 2 }}>
        Tilgungsrechner
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid container item md={8} xs={12}>
            <Grid item xs={12}>
              <FormGroupHeader title={"Darlehensbeitrag"} />
            </Grid>
            <Grid item xs={6}>
              <Slider
                min={1000}
                max={100000}
                step={1000}
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
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon />
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid item md={4} xs={12}>
            <FormGroupHeader title={"Sollzinssatz"} />
            <Select
              labelId="Zinnssatz Select"
              value={formData.interestRate}
              onChange={(event) =>
                handleInputChange(event.target.value, "interestRate")
              }
            >
              {Array.from({ length: 10 }, (_value, index) => index + 1).map(
                (index) => (
                  <MenuItem value={index}>{index}%</MenuItem>
                )
              )}
            </Select>
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
                  onChange={(event) => handleRadioChange(event.target.value)}
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
                value={formData.repaymentRate}
                onChange={(event) =>
                  handleInputChange(event.target.value, "repaymentRate")
                }
                required
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {formData.repaymentType === "cash" ? (
                        <EuroIcon />
                      ) : (
                        <PercentIcon />
                      )}
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
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
                min={1}
                max={40}
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
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      Jahre
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
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
