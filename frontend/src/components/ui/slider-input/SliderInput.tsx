import { Box, InputAdornment, Slider, SliderProps, Stack, TextField } from '@mui/material';

function SliderInput({
  value,
  onChange,
  min,
  max,
  step,
  ...rest
}: SliderProps) {
  return (
    <Box>
      <Stack direction={"row"} flexGrow={1}>
        <Box minWidth={"200px"} px={4} display={"flex"} alignItems={"center"}>
          <Slider
            min={min ? min : 0}
            max={max ? max : 1000}
            step={step ? step : 1}
            value={value}
            // value={formData.loanContribution}
            // onChange={(event, value) =>
            //   handleInputChange(value as number, "loanContribution")
            // }
          />
        </Box>
        <TextField
          value={value}
          // value={formData.loanContribution}
          // onChange={(event, newValue) =>
          //   onChange()
          // }
          required
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Euro</InputAdornment>
            ),
            inputProps: {
              style: { textAlign: "center" },
              min: min,
              max: max,
            },
          }}
        />
      </Stack>
    </Box>
  );
}

export default SliderInput;
