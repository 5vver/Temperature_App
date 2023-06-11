import {useState, useEffect, useContext} from "react";
import { NextUIProvider, createTheme, useTheme } from '@nextui-org/react';

import chroma from 'chroma-js';
import { styled } from '@stitches/react';

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
