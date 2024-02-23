import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import s from './Navbar.module.scss';

function Navbar() {
  return (
    <div className={s.container}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleDrawerOpen} <--out of scope
            edge="start"
          >
            Icon
          </IconButton>
          <Typography variant="h6" noWrap>
            Spasskasse
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
