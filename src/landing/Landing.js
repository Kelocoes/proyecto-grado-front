import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FormEstimation from './FormEstimation';
import Footer from './Footer';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Landing() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Riesgo cardiovascular UV"/>
        <main>
          <MainFeaturedPost />
          <FormEstimation />
        </main>
      </Container>
      <Footer
        title="Créditos"
        description="Desarrollado por Kevin David Rodríguez Belalcázar"
      />
    </ThemeProvider>
  );
}
