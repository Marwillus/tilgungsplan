

import HeroStage from '@/components/hero-stage/HeroStage';
import Navbar from '@/components/navbar/Navbar';
import RepaymentForm from '@/components/repayment-form/RepaymentForm';
import RepaymentResult from '@/components/repayment-result/RepaymentResult';

function Home() {
  return (
    <>
      <Navbar/>
      <HeroStage/>
      <RepaymentForm/>
      <RepaymentResult/>
    </>
  );
}

export default Home