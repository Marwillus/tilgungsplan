import TooltipButton from '@/components/ui/tooltip-button/TooltipButton';
import { Stack, Typography } from '@mui/material';

interface FormGroupHeader {
  title: string;
  infoText?: string;
}

function FormGroupHeader({ title, infoText }: FormGroupHeader) {
  return (
    <Stack direction={"row"} marginBottom={2}>
      {infoText && <TooltipButton infoText={infoText} />}
      <Typography variant="h5" sx={{ verticalAlign: "center" }}>
        {title}
      </Typography>
    </Stack>
  );
}

export default FormGroupHeader;
