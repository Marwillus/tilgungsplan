import { Box, InputAdornment, Slider, SliderProps, Stack, TextField } from '@mui/material';

interface CustomSliderProps {
  handleInputChange: (event: any) => void;
  unit?: JSX.Element;
}

type ExtendedSliderProps = SliderProps & CustomSliderProps;

function SliderInput({
  value,
  min,
  max,
  step,
  unit,
  handleInputChange,
  ...rest
}: ExtendedSliderProps) {
  return (
    <Stack
      direction={"row"}
      borderRadius={1}
      sx={{ backgroundColor: "background.paper", width: "fit-content" }}
    >
      <Box
        minWidth={"200px"}
        px={4}
        display={"flex"}
        alignItems={"center"}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRight: "none",
        }}
      >
        <Slider
          min={min ? min : 0}
          max={max ? max : 1000}
          step={step ? step : 1}
          value={value}
          onChange={handleInputChange}
          {...rest}
        />
      </Box>
      <TextField
        value={value}
        onChange={handleInputChange}
        required
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">{unit}</InputAdornment>
          ),
          inputProps: {
            style: { textAlign: "center" },
            min: min,
            max: max,
          },
        }}
      />
    </Stack>
  );
}

export default SliderInput;
