import React from "react";
import "./App.css";
import { RandomPokemon } from "./components/RandomPokemon";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./infrastructure/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RandomPokemon></RandomPokemon>
      </ThemeProvider>
    </div>
  );
}

export default App;
