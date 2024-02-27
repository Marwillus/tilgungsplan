import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useRepaymentContext } from '../../../../context/repayment-context';

function createData(
  year: string,
  rate: number,
  interest: number,
  repayment: number,
  residualDebt: number
) {
  return { year, rate, interest, repayment, residualDebt };
}

function RepaymentResultTable() {
  const { repaymentResult } = useRepaymentContext();
  return (
    <TableContainer>
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Jahr</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Zinsanteil</TableCell>
            <TableCell align="right">Tilgungsanteil</TableCell>
            <TableCell align="right">Restschuld</TableCell>
          </TableRow>
        </TableHead>
        {repaymentResult && (
          <TableBody>
            {repaymentResult.repaymentSchedule.map((row) => (
              <TableRow
                key={row.year}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell align="right">{row.repaymentRate}</TableCell>
                <TableCell align="right">{row.interestAmount}</TableCell>
                <TableCell align="right">{row.repaymentAmount}</TableCell>
                <TableCell align="right">{row.remainingLoan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default RepaymentResultTable;
