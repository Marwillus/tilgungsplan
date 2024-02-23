import Image from 'next/image';

import { Box, Container } from '@mui/material';

import s from './style.module.scss';

function HeroStage() {
  return (
    <div className={s.container}>
      <div className={s.image}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={s.image}
          priority
          width={1200}
          height={600}
          objectFit='cover'
        />
      </div>
      <Container maxWidth="lg">
        <h1>Tilgungsplan berechnen</h1>
        <p>
          Kein Geld? Kein Problem! Leih dir einfach was! Hier kannst du dir
          berechnen lassen wie hoch die Zinsen sind
        </p>
        <Box>Some Werbung</Box>
      </Container>
    </div>
  );
}

export default HeroStage;
