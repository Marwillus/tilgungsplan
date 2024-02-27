import { ArrowRight } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import {
    Button, CircularProgress, Grid, List, ListItem, ListItemIcon, ListItemText, Slider, Typography
} from '@mui/material';
import { PieChart } from '@mui/x-charts';

import { useRepaymentContext } from '../../../../context/repayment-context';

function RepaymentSummary() {
  const { repaymentResult, isLoading } = useRepaymentContext();
  const duration = 15;

  return (
    <Grid
      container
      position={"relative"}
      sx={isLoading ? { opacity: 0.2 } : {}}
    >
      {isLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      <Grid item sm={6} xs={12} minHeight={500}>
        <Typography variant="h5">Ihr Zinssatz und Ihre Monatsrate</Typography>
        <List sx={{ width: "100%" }}>
          {[1, 2, 3].map((value) => (
            <ListItem key={value}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={`Line item ${value}`} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h5">
          Ihre Eckdaten nach der Zinsbindung von {duration} Jahren
        </Typography>
        <List sx={{ width: "100%" }}>
          {[1, 2, 3].map((value) => (
            <ListItem key={value}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={`Line item ${value}`} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item sm={6} xs={12}>
        <Typography variant="h5">Ihre Jahreswerte</Typography>
        <Slider valueLabelDisplay="auto" />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Restschuld" },
                { id: 1, value: 15, label: "Tilgung" },
                { id: 2, value: 5, label: "Zinsen" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
        <Typography>
          Die tatsächlichen Konditionen hängen von Ihrer Finanzsituation ab. Um
          Ihren persönlichen Zinssatz zu erfahren, fordern Sie einfach konkrete
          Angebote an. Ihr persönlicher Berater meldet sich bei Ihnen.
        </Typography>
        <Button variant="contained">
          {/* @TODO implement link to personal offer */}
          Mit diesen Eckdaten persönliches Angebot einholen{" "}
          <ArrowRight></ArrowRight>
        </Button>
      </Grid>
    </Grid>
  );
}

export default RepaymentSummary;
