import { useState } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Box, IconButton, Popover } from '@mui/material';

interface TooltipButtonProps {
  infoText: string;
}

const genRand = (len: number) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

function TooltipButton({ infoText }: TooltipButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? genRand(4) : undefined;

  return (
    <>
      <IconButton size="small" sx={{ pl: 0 }} onClick={handleClick}>
        <InfoIcon />
      </IconButton>
      {/* we use a popover, 'cause tooltip won't work on mobile */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 1, bgcolor: "background.paper" }}>{infoText}</Box>
      </Popover>
    </>
  );
}

export default TooltipButton;
