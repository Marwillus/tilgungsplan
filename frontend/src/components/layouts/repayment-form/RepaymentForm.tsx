import axios from 'axios';
import { FormEvent, useState } from 'react';

import EuroIcon from '@mui/icons-material/Euro';
import {
    Alert, Box, Button, Grid, InputAdornment, MenuItem, Select, Slider, Stack, Switch, TextField,
    Typography
} from '@mui/material';

import { useRepaymentContext } from '../../../../context/repayment-context';
import FormGroupHeader from '../../ui/form-header/FormGroupHeader';
import s from './style.module.scss';
import { RepaymentFormData } from './types';

function RepaymentForm() {
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<RepaymentFormData>({
    loanContribution: 10000,
    interestRate: 2,
    repaymentRate: 1000,
    interestPeriodEnabled: true,
    interestPeriod: 10,
  });
  const minContribution = 1000;
  const maxContribution = 100000;

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setRepaymentResult(calculateRepaymentPlan(formData));
    try {
      // const response = await axios.post('/api/calculate-repayment', formData);
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:4000/repayment",
        formData
      );

      if (response.status === 201) {
        console.log("Calculation succeed");
        setRepaymentResult(response.data);
      } else {
        console.error("Failed to post form");
      }
    } catch (error: any) {
      console.error("Error submitting form", error);
      setError(error.response.data.message);
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
              <FormGroupHeader
                title={"Darlehensbeitrag"}
                infoText="Some detail infos about Darlehensbeitrag"
              />
            </Grid>
            <Grid item xs={6}>
              <Slider
                min={minContribution}
                max={maxContribution}
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
            <FormGroupHeader
              title={"Sollzinssatz"}
              infoText="Some detail infos about Sollzinssatz"
            />
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

          <Grid container item xs={12} columnGap={4}>
            <Grid item xs={12}>
              <FormGroupHeader
                title={"Tilgungssatz"}
                infoText="Some detail infos about Tilgungssatz"
              />
            </Grid>

            <Grid item xs={"auto"}>
              <Stack direction={"row"} flexGrow={1}>
                <Box
                  minWidth={"200px"}
                  px={4}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Slider
                    min={1000}
                    max={formData.loanContribution / 2}
                    step={1000}
                    value={formData.repaymentRate}
                    onChange={(event, value) =>
                      handleInputChange(value as number, "repaymentRate")
                    }
                  />
                  <TextField
                    value={formData.repaymentRate}
                    onChange={(event) => {
                      handleInputChange(event.target.value, "repaymentRate");
                    }}
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
                        max: formData.loanContribution / 2,
                      },
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Stack direction={"row"}>
                <FormGroupHeader
                  title={"Zinsbindungsdauer"}
                  infoText="Some detail infos about Zinsbindungsdauer"
                />
                <Switch
                  checked={formData.interestPeriodEnabled}
                  onChange={(e) => {
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
                disabled={!formData.interestPeriodEnabled}
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
                disabled={!formData.interestPeriodEnabled}
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
      {error && (
        <Alert sx={{ my: 2 }} severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default RepaymentForm;
