import axios from 'axios';
import { FormEvent, useState } from 'react';

import SliderInput from '@/components/ui/slider-input/SliderInput';
import EuroIcon from '@mui/icons-material/Euro';
import {
    Alert, Box, Button, Grid, MenuItem, Select, Stack, Switch, Typography
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
      <Box paddingTop={8} paddingBottom={2} mx={8}>
        <Typography variant="h3" noWrap fontSize={32} marginBottom={4}>
          Tilgungsrechner
        </Typography>
        <form onSubmit={handleSubmit} className={s.form}>
          <Grid container spacing={4} marginBottom={4}>
            <Grid item xs>
              <FormGroupHeader
                title={"Darlehensbeitrag"}
                infoText="Some detail infos about Darlehensbeitrag"
              />
              <SliderInput
                min={1000}
                max={100000}
                step={1000}
                value={formData.loanContribution}
                handleInputChange={(event) =>
                  handleInputChange(event.target.value, "loanContribution")
                }
                unit={<EuroIcon />}
              />
            </Grid>

            <Grid item md xs={12}>
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
                sx={{ backgroundColor: "background.paper" }}
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

            <Grid item md={6} xs={12} columnGap={4}>
              <FormGroupHeader
                title={"Tilgungssatz"}
                infoText="Some detail infos about Tilgungssatz"
              />

              <Stack direction={"row"} flexGrow={1}>
                <SliderInput
                  min={1000}
                  step={1000}
                  max={formData.loanContribution / 2}
                  value={formData.repaymentRate}
                  handleInputChange={(event) =>
                    handleInputChange(event.target.value, "repaymentRate")
                  }
                  unit={<EuroIcon />}
                />
              </Stack>
            </Grid>

            <Grid item md={6} xs={12}>
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
              <SliderInput
                min={2}
                max={40}
                value={formData.interestPeriod}
                handleInputChange={(event) =>
                  handleInputChange(event.target.value, "interestPeriod")
                }
                unit={<Typography>Jahre</Typography>}
              />
            </Grid>

            {error && (
              <Grid item xs>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            
            <Grid display={"flex"} gap={4} item xs>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 6 }}
              >
                Berechnen
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default RepaymentForm;
