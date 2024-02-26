import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function createData(
  year: string,
  rate: number,
  interest: number,
  repayment: number,
  residualDebt: number
) {
  return { year, rate, interest, repayment, residualDebt };
}

const rows = [
  createData("2024", 159, 6.0, 24, 4.0),
  createData("2025", 237, 9.0, 37, 4.3),
];

function RepaymentResultTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Jahr</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Zinsanteil</TableCell>
            <TableCell align="right">Tilgungsanteil</TableCell>
            <TableCell align="right">Restschuld</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.year}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.year}
              </TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.interest}</TableCell>
              <TableCell align="right">{row.repayment}</TableCell>
              <TableCell align="right">{row.residualDebt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RepaymentResultTable;
