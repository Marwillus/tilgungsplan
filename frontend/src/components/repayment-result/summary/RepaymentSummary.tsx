import { useState } from 'react';

import { ArrowRight } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import {
    Button, Grid, List, ListItem, ListItemIcon, ListItemText, Slider, Typography
} from '@mui/material';
import { PieChart } from '@mui/x-charts';

import { useRepaymentContext } from '../../../../context/repayment-context';

function RepaymentSummary() {
  const { repaymentResult } = useRepaymentContext();
  const [timelineSlider, setTimelineSlider] = useState(0);
  console.log( repaymentResult?.repaymentSchedule[timelineSlider]);

  return (
    <>
      {repaymentResult && (
        <Grid container>
          <Grid item sm={6} xs={12} minHeight={500}>
            <Typography variant="h5">
              Ihr Zinssatz und Ihre Monatsrate
            </Typography>
            <List sx={{ width: "100%" }}>
              {/* usually i would map over the object repaymentResult.data, but for now this will do   */}
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Zinssatz"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={repaymentResult.data.interestRate + "%"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Jährliche Rate"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={repaymentResult.data.repaymentRateInCash + "€"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Tilgungssatz"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={repaymentResult.data.repaymentRateInPercent + "%"}
                />
              </ListItem>
            </List>
            <Typography variant="h5">
              Ihre Eckdaten nach der Zinsbindung von{" "}
              {repaymentResult.data.interestPeriod} Jahren
            </Typography>
            <List sx={{ width: "100%" }}>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Restschuld"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={
                    repaymentResult.repaymentSchedule[
                      repaymentResult.repaymentSchedule.length - 1
                    ].remainingLoan + "€"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Getilgter Beitrag"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={
                    repaymentResult.repaymentSchedule[
                      repaymentResult.repaymentSchedule.length - 1
                    ].repaymentAmount + "€"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Gezahlte Zinsen"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={repaymentResult.data.repaymentRateInPercent + "€"}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Typography variant="h5">Ihre Jahreswerte</Typography>
            <Slider
              valueLabelDisplay="auto"
              value={timelineSlider}
              onChange={(e, value) => setTimelineSlider(value as number)}
              max={repaymentResult.repaymentSchedule.length}
            />
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value:
                        repaymentResult.repaymentSchedule[timelineSlider]
                          .remainingLoan,
                      label: "Restschuld",
                    },
                    {
                      id: 1,
                      value:
                        repaymentResult.repaymentSchedule[timelineSlider]
                          .principalAmount,
                      label: "Tilgung",
                    },
                    {
                      id: 2,
                      value:
                        repaymentResult.repaymentSchedule[timelineSlider]
                          .interestAmount,
                      label: "Zinsen",
                    },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
            <Typography>
              Die tatsächlichen Konditionen hängen von Ihrer Finanzsituation ab.
              Um Ihren persönlichen Zinssatz zu erfahren, fordern Sie einfach
              konkrete Angebote an. Ihr persönlicher Berater meldet sich bei
              Ihnen.
            </Typography>
            <Button variant="contained">
              {/* @TODO implement link to personal offer */}
              Mit diesen Eckdaten persönliches Angebot einholen{" "}
              <ArrowRight></ArrowRight>
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default RepaymentSummary;
