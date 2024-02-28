import Navbar from '@/components/sections/navbar/Navbar';
import RepaymentCalculator from '@/components/sections/repayment-calculator/RepaymentCalculator';

function Home() {
  return (
    <>
      <Navbar />
      {/* <HeroStage /> */}
      <RepaymentCalculator/>
    </>
  );
}

export default Home;
