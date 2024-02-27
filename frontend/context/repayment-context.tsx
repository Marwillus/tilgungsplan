import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';

import { RepaymentResult } from '@/components/repayment-form/types';

interface RepaymentContextValue {
  repaymentResult: RepaymentResult | null;
  setRepaymentResult: React.Dispatch<React.SetStateAction<RepaymentResult | null>>;
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const RepaymentContext = createContext<
  RepaymentContextValue | undefined
>(undefined);

export const useRepaymentContext = (): RepaymentContextValue => {
  const context = useContext(RepaymentContext);
  if (!context) {
    throw new Error(
      "useRepaymentContext must be used within a RepaymentContextProvider"
    );
  }
  return context;
};

export const RepaymentContextProvider = ({
  children,
}: PropsWithChildren): ReactNode => {
  const [repaymentResult, setRepaymentResult] = useState<RepaymentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <RepaymentContext.Provider value={{ repaymentResult, setRepaymentResult, isLoading, setIsLoading }}>
      {children}
    </RepaymentContext.Provider>
  );
};
