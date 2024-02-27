import axios from 'axios';
import { log } from 'console';
import { FormEvent, useState } from 'react';

import EuroIcon from '@mui/icons-material/Euro';
import PercentIcon from '@mui/icons-material/Percent';
import {
    Button, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup,
    Select, Slider, Stack, Switch, TextField, Typography
} from '@mui/material';

import { useRepaymentContext } from '../../../context/repayment-context';
import FormGroupHeader from './form-header/FormGroupHeader';
import s from './style.module.scss';
import { RepaymentFormData, RepaymentType } from './types';

function RepaymentForm() {
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("cash");
  const [formData, setFormData] = useState<RepaymentFormData>({
    loanContribution: 3000,
    interestRate: 2,
    repaymentRateInPercent: 1,
    repaymentRateInCash: 100,
    interestPeriodEnabled: true,
    interestPeriod: 10,
  });

  // context just for show of reasons
  const { setRepaymentResult, setIsLoading } = useRepaymentContext();

  const handleInputChange = (value: number | string | boolean, key: string) => {
    if (typeof value === "string") {
      Number(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleRadioChange = (value: RepaymentType) => {
    setRepaymentType(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response = await axios.post('/api/calculate-repayment', formData);
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/repayment",
        formData
      );

      if (response.status === 201) {
        console.log("Calculation succeed");
        console.log(response.data);
        setRepaymentResult(response.data);
      } else {
        console.error("Failed to post form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle network errors
    }
    setIsLoading(false);
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
                  <MenuItem key={"interestRateSelect-" + index} value={index}>
                    {index}%
                  </MenuItem>
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
                  name="repaymentRadio"
                  value={repaymentType}
                  onChange={(event) =>
                    handleRadioChange(event.target.value as RepaymentType)
                  }
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
              {repaymentType === "cash" ? (
                <TextField
                  value={formData.repaymentRateInCash}
                  onChange={(event) =>
                    handleInputChange(event.target.value, "repaymentRateInCash")
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
              ) : (
                <TextField
                  value={formData.repaymentRateInPercent}
                  onChange={(event) =>
                    handleInputChange(
                      event.target.value,
                      "repaymentRateInPercent"
                    )
                  }
                  required
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                    inputProps: {
                      style: { textAlign: "center" },
                    },
                  }}
                />
              )}
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Stack direction={"row"}>
                <FormGroupHeader title={"Zinsbindungsdauer"} />
                <Switch
                  value={formData.interestPeriodEnabled}
                  onChange={(e, value) => {
                    handleInputChange(
                      !formData.interestPeriodEnabled,
                      "interestPeriodEnabled"
                    );
                  }}
                ></Switch>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Slider
                name="slider"
                min={1}
                max={40}
                value={formData.interestPeriod as number}
                onChange={(event, value) =>
                  handleInputChange(value as number, "interestPeriod")
                }
                disabled={formData.interestPeriodEnabled}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={formData.interestPeriod ? formData.interestPeriod : "-"}
                onChange={(event) =>
                  handleInputChange(event.target.value, "interestPeriod")
                }
                required
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">Jahre</InputAdornment>
                  ),
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
                disabled={formData.interestPeriodEnabled}
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
