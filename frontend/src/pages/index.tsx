import Navbar from '@/components/navbar/Navbar';
import RepaymentForm from '@/components/repayment-form/RepaymentForm';
import RepaymentResult from '@/components/repayment-result/RepaymentResult';
import { Container } from '@mui/material';

function Home() {
  return (
    <>
      <Navbar />
      {/* <HeroStage /> */}
      <Container>
        <RepaymentForm />
        <RepaymentResult />
      </Container>
    </>
  );
}

export default Home;
