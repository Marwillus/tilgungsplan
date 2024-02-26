import { SyntheticEvent, useState } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import RepaymentSummary from './summary/RepaymentSummary';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`repayment-result-${index}`}
      aria-labelledby={`repayment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `repayment-result-${index}`,
    "aria-controls": `repayment-tabpanel-${index}`,
  };
}

function RepaymentResult() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Ergebnis-Tabs"
          sx={{ ml: 4 }}
        >
          <Tab label="Zusammenfassung" {...a11yProps(0)} />
          <Tab label="Tilgungsplan" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RepaymentSummary />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}

export default RepaymentResult;
