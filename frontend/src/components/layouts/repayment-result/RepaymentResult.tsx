import { SyntheticEvent, useState } from 'react';

import { Box, CircularProgress, Tab, Tabs } from '@mui/material';

import { useRepaymentContext } from '../../../../context/repayment-context';
import RepaymentResultTable from '../../ui/result-table/RepaymentResultTable';
import s from './style.module.scss';
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
        <Box sx={{ p: 3, mx:4, mb:8, border: 1, borderColor: "divider", borderRadius: 1 }}>
          {children}
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
  const { repaymentResult, isLoading } = useRepaymentContext();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        opacity: isLoading ? 0.2 : 1,
        width: "100%",
        backgroundColor: "#fff",
      }}
      position={"relative"}
      height={repaymentResult ? "auto" : 0}
      display={repaymentResult ? "block" : "none"}
      className={s.container}
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

      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Ergebnis-Tabs"
          sx={{ ml: 8 }}
        >
          <Tab label="Zusammenfassung" {...a11yProps(0)} />
          <Tab label="Tilgungsplan" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RepaymentSummary />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RepaymentResultTable />
      </CustomTabPanel>
    </Box>
  );
}

export default RepaymentResult;
