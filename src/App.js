import React , { useState , useEffect , useMemo} from 'react';
import './App.css';
import Appbar from './component/Appbar';
import Movies from './component/movie';
import Popular from './component/popular';
import TopRated from './component/toprated';
import Moviedetails from './component/moivedetails';
import Favorites from './component/Favorites';
import ListAllActor from './component/ListAllActor';
import { Route , Switch} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider,  styled, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { useSelector , useDispatch } from 'react-redux';

function App() {

const mode = useSelector((state) => state.mode.color);
const themefonts = createTheme({
  typography: {
    fontFamily: 'Raleway, Courier New',
    fontSize: 16,
  },
  button: {
    fontStyle: 'italic',
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },

});

  return (
    <ThemeProvider theme={themefonts}>
      <div className="App" >
          <div style={{width: 'auto' , backgroundColor:'black'}}>
              <Router>
              <CssBaseline />
                <Appbar />
                <Switch>
                  <Route exact path="/" ><Movies /></Route>
                  <Route exact path="/Popular" ><Popular /></Route>
                  <Route exact path="/TopRated" ><TopRated /></Route>
                  <Route exact path="/Favorites" ><Favorites /></Route>
                  <Route exact path="/SeeMoreActor/:Tid/:type/:totalPage" ><ListAllActor /></Route>
                  <Route exact path="/moviedetails/:Tid/:type/:totalPage" ><Moviedetails /></Route>
                </Switch>
              </Router>
              
          </div>
      </div>
    </ThemeProvider>


  );
}
export default App;


