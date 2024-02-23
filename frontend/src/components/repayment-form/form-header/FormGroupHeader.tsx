import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Stack, Typography } from '@mui/material';

interface FormGroupHeader {
    title: string
}

function FormGroupHeader({title}: FormGroupHeader) {
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
    <div>
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
          {title}
        </Typography>
      </Stack>
    </div>
  );
}

export default FormGroupHeader;
