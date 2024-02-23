import { useState } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Button, Grid, IconButton, Slider, Stack, TextField, Typography } from '@mui/material';

import s from './style.module.scss';

interface FormGroup {
  header: string;
  slider?: number;
  textInput: string;
  button1?: string;
  button2?: string;
}

function RepaymentForm() {
  const [formGroup1, setFormGroup1] = useState<FormGroup>({
    header: "",
    slider: 50,
    textInput: "",
  });

  const [formGroup2, setFormGroup2] = useState<FormGroup>({
    header: "",
    textInput: "",
  });

  const [formGroup3, setFormGroup3] = useState<FormGroup>({
    header: "",
    button1: "Button 1",
    button2: "Button 2",
  });

  const [formGroup4, setFormGroup4] = useState<FormGroup>({
    header: "",
    slider: 50,
    textInput: "",
  });

  const handleInputChange = (
    event: Event,
    formGroup: FormGroup,
    setFormGroup: FormGroup
  ) => {
    const { name, value } = event.target;
    setFormGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSliderChange = (event: Event, formGroup, setFormGroup) => {
    const value = event.target.value;
    setFormGroup((prevState) => ({
      ...prevState,
      slider: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  // @TODO ADD INFO POPOVERHANDLING
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  return (
    <div className={s.container}>
      <Typography variant="h3" noWrap sx={{ mb: 4, mt: 2 }}>
        Tilgungsrechner
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {/*
              @TODO ADD INFO POPOVERHANDLING
              <IconButton aria-describedby={"id"} onClick={handleClick}>
                <InfoIcon />
              </IconButton>
              <Popover
                id={"id"}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  The content of the Popover.
                </Typography>
              </Popover> */}
              <Stack direction={"row"}>
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
                <Typography variant="h5" sx={{ verticalAlign: "center" }}>
                  Darlehensbetrag
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Slider
                  name="slider"
                  value={formGroup1.slider}
                  onChange={(event) =>
                    handleSliderChange(event, formGroup1, setFormGroup1)
                  }
                />
                <TextField
                  name="textInput"
                  label="Text Input"
                  value={formGroup1.textInput}
                  onChange={(event) =>
                    handleInputChange(event, formGroup1, setFormGroup1)
                  }
                  required
                />
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction={"row"}>
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
                <Typography variant="h5" sx={{ verticalAlign: "center" }}>
                  Sollzinssatz
                </Typography>
              </Stack>

              <TextField
                name="textInput"
                label="Text Input"
                value={formGroup2.textInput}
                onChange={(event) =>
                  handleInputChange(event, formGroup2, setFormGroup2)
                }
                required
              />
            </Grid>
          </Grid>

          <Stack direction={"row"}>
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
            <Typography variant="h5" sx={{ verticalAlign: "center" }}>
              Tilgungssatz
            </Typography>
          </Stack>
          <Button variant="contained" color="primary">
            {formGroup3.button1}
          </Button>
          <Button variant="contained" color="secondary">
            {formGroup3.button2}
          </Button>

          <Stack direction={"row"}>
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
            <Typography variant="h5" sx={{ verticalAlign: "center" }}>
            Zinsbindungsdauer
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <Slider
              name="slider"
              value={formGroup4.slider}
              onChange={(event) =>
                handleSliderChange(event, formGroup4, setFormGroup4)
              }
            />
            <TextField
              name="textInput"
              label="Text Input"
              value={formGroup4.textInput}
              onChange={(event) =>
                handleInputChange(event, formGroup4, setFormGroup4)
              }
              required
            />
          </Stack>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default RepaymentForm;
