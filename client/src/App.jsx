import { NextUIProvider, createTheme } from '@nextui-org/react';


import './App.css'

import TemperaturesHandler from "./components/TemperaturesHandler.jsx";

function App() {

  const customTheme = createTheme({
    type: 'light',
    palette: {
      background: '#060606', // this is your base color
      // other colors and theme properties...
    },
  });

  return (
      <NextUIProvider theme={customTheme}>
          <TemperaturesHandler />
      </NextUIProvider>
  );
}

export default App
