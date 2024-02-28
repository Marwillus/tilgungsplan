import Image from 'next/image';

import { Box, Container, Grid, Link, Typography } from '@mui/material';

import s from './style.module.scss';

function HeroStage() {
  return (
    <div className={s.container}>
      <div className={s["image-container"]}>
        <Image
          src="/empty-wallet.jpg"
          alt="Hero Image"
          priority
          fill
          objectFit="cover"
        />
      </div>
      <Container>
        <Grid container spacing={2} sx={{ py: 4 }}>
          <Grid item sm={8} xs={12}>
            <Typography variant="h1" fontSize={48} marginBottom={4}>
              Tilgungsplan berechnen
            </Typography>
            <Typography maxWidth={"60ch"}>
              Kein Geld? Kein Problem! Leih dir einfach was! Hier kannst du dir
              berechnen lassen wie hoch die Zinsen sind. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Odit a fuga, officia quasi
              culpa, iusto, repudiandae laborum saepe ab reprehenderit veritatis
              nemo ea inventore. Consequatur dolorem possimus doloremque. Est,
              minima.
            </Typography>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Box
              height={200}
              width={200}
              display="flex"
              flexDirection={"column"}
              flexGrow={1}
              gap={4}
              p={2}
              sx={{ border: "2px solid grey" }}
            >
              <Typography>
                Some Werbung Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Dolorem aperiam blanditiis consequuntur delectus rem!
              </Typography>
              <Link>Achtung, Link Dummy</Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HeroStage;
