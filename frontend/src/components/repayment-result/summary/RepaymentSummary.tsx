import { useState } from 'react';

import TooltipButton from '@/components/tooltip-button/TooltipButton';
import { ArrowRight } from '@mui/icons-material';
import {
    Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Slider, Typography
} from '@mui/material';
import { PieChart } from '@mui/x-charts';

import { useRepaymentContext } from '../../../../context/repayment-context';

function RepaymentSummary() {
  const { repaymentResult } = useRepaymentContext();
  const [timelineSlider, setTimelineSlider] = useState(0);

  return (
    <>
      {repaymentResult && (
        <Grid container gap={4}>
          <Grid item sm={4} xs={12} minHeight={500}>
            <Typography variant="h5">
              Ihr Zinssatz und Ihre Monatsrate
            </Typography>
            <List sx={{ width: "100%" }}>
              {/* usually i would map over the object repaymentResult.data, but for now this will do   */}
              <ListItem>
                <ListItemIcon>
                  <TooltipButton infoText="valuable information" />
                </ListItemIcon>
                <ListItemText primary={"Zinssatz"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={repaymentResult.initialData.interestRate + "%"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TooltipButton infoText="valuable information" />
                </ListItemIcon>
                <ListItemText primary={"Jährliche Rate"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={
                    repaymentResult.initialData.repaymentRateInCash + "€"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TooltipButton infoText="valuable information" />
                </ListItemIcon>
                <ListItemText primary={"Tilgungssatz"} />
                <ListItemText
                  sx={{ textAlign: "end" }}
                  primary={
                    repaymentResult.initialData.repaymentRateInPercent + "%"
                  }
                />
              </ListItem>
            </List>
            {repaymentResult.remainingInstances && (
              <>
                <Typography variant="h5">
                  Ihre Eckdaten nach der Zinsbindung von{" "}
                  {repaymentResult.initialData.interestPeriod} Jahren
                </Typography>
                <List sx={{ width: "100%" }}>
                  <ListItem>
                    <ListItemIcon>
                      <TooltipButton infoText="valuable information" />
                    </ListItemIcon>
                    <ListItemText primary={"Restschuld"} />
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        repaymentResult.remainingInstances?.remainingSum + "€"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TooltipButton infoText="valuable information" />
                    </ListItemIcon>
                    <ListItemText primary={"Getilgter Beitrag"} />
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        repaymentResult.remainingInstances?.amountPaid + "€"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TooltipButton infoText="valuable information" />
                    </ListItemIcon>
                    <ListItemText primary={"Gezahlte Zinsen"} />
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        repaymentResult.remainingInstances?.amountInterest + "€"
                      }
                    />
                  </ListItem>
                </List>
                <Box
                  sx={{
                    p: 3,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  {" "}
                  <Typography>
                    Zeit bis zur Abzahlung des Darlehens bei gleichbleibendem
                    Sollzins:{" "}
                    <b>
                      {
                        repaymentResult.remainingInstances
                          .calculatedRestDuration
                      }{" "}
                      Jahre
                    </b>
                  </Typography>
                </Box>
              </>
            )}
          </Grid>

          <Grid item sm={6} xs={12} display='flex' flexDirection='column' flexGrow={1}>
            <Typography variant="h5">Ihre Jahreswerte</Typography>
            <Slider
              valueLabelDisplay="on"
              value={timelineSlider}
              onChange={(e, value) => setTimelineSlider(value as number)}
              min={0}
              max={repaymentResult.repaymentSchedule.length - 1}
              sx={{ mt: 8, mx: 4 }}
              getAriaValueText={() =>
                repaymentResult.repaymentSchedule[
                  timelineSlider
                ].year.toString()
              }
              valueLabelFormat={() =>
                repaymentResult.repaymentSchedule[
                  timelineSlider
                ].year.toString()
              }
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
                      label: `Restschuld - ${repaymentResult.repaymentSchedule[timelineSlider].remainingLoan}€`,
                    },
                    {
                      id: 1,
                      value:
                        repaymentResult.repaymentSchedule[timelineSlider]
                          .repaymentAmountSum,
                      label: `Tilgung - ${repaymentResult.repaymentSchedule[timelineSlider].repaymentAmountSum}€`,
                    },
                    {
                      id: 2,
                      value:
                        repaymentResult.repaymentSchedule[timelineSlider]
                          .interestAmountSum,
                      label: `Zinsen - ${repaymentResult.repaymentSchedule[timelineSlider].interestAmountSum}€`,
                    },
                  ],
                },
              ]}
              width={550}
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
