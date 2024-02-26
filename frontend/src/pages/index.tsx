import Navbar from '@/components/navbar/Navbar';
import RepaymentForm from '@/components/repayment-form/RepaymentForm';
import RepaymentResult from '@/components/repayment-result/RepaymentResult';
import { Box, Container } from '@mui/material';

function Home() {
  return (
    <>
      <Navbar />
      {/* <HeroStage /> */}
      <Box sx={{ width: "100%", backgroundColor: "#eee" }}>
        <Container>
          <RepaymentForm />
        </Container>
        <Container>
          <RepaymentResult />
        </Container>
      </Box>
    </>
  );
}

export default Home;
