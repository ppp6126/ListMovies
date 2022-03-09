import React , { useState , useEffect} from 'react';
import './App.css';
import Appbar from './component/Appbar';
import Movies from './component/movie';
import Popular from './component/popular';
import TopRated from './component/toprated';
import Moviedetails from './component/moivedetails';
import { Route , Switch} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TEST from './component/test';
function App() {

  return (

      <div className="App">
            <div className="widthdiv">
              <Router>
                <Appbar />
                <Switch>
                      <Route exact path="/" ><Movies /></Route>
                      <Route exact path="/Popular" ><Popular /></Route>
                      <Route exact path="/TopRated" ><TopRated /></Route>
                      <Route exact path="/moviedetails/:Tid/:type" ><Moviedetails /></Route>
                </Switch>
              </Router>
            </div>
    </div>


  );
}
export default App;
