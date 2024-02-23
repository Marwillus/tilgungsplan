import Image from 'next/image';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import s from './style.module.scss';

function Navbar() {
  return (
    <div className={s.container}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleDrawerOpen} <--out of scope
            edge="start"
          >
            <Image
              src="/sparkasse.svg"
              alt="Sparkasse Logo"
              width={30}
              height={30}
            />
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
