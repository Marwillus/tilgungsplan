import Navbar from '@/components/navbar/Navbar';
import RepaymentForm from '@/components/repayment-form/RepaymentForm';
import RepaymentResult from '@/components/repayment-result/RepaymentResult';
import { Box, Container } from '@mui/material';

import { RepaymentContextProvider } from '../../context/repayment-context';

function Home() {
  return (
    <>
      <Navbar />
      {/* <HeroStage /> */}
      <Box sx={{ width: "100%", backgroundColor: "#eee" }}>
        <Container>
          <RepaymentContextProvider>
            <RepaymentForm />
            <RepaymentResult />
          </RepaymentContextProvider>
        </Container>
      </Box>
    </>
  );
}

export default Home;
