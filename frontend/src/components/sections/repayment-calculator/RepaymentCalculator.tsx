import RepaymentForm from '@/components/layouts/repayment-form/RepaymentForm';
import RepaymentResult from '@/components/layouts/repayment-result/RepaymentResult';
import { Box, Container } from '@mui/material';

import { RepaymentContextProvider } from '../../../../context/repayment-context';

function RepaymentCalculator() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#eee" }}>
      <Container>
        <RepaymentContextProvider>
          <RepaymentForm />
          <RepaymentResult />
        </RepaymentContextProvider>
      </Container>
    </Box>
  );
}

export default RepaymentCalculator;
