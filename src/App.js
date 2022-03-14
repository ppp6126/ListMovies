import React , { useState , useEffect} from 'react';
import './App.css';
import Appbar from './component/Appbar';
import Movies from './component/movie';
import Popular from './component/popular';
import TopRated from './component/toprated';
import Moviedetails from './component/moivedetails';
import Favorites from './component/Favorites';
import { Route , Switch} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { I18nPropvider, LOCALES } from './i18nProvider';
import translate from "./i18nProvider/translate";
import {FormattedMessage} from "react-intl";

function App() {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  return (

      <div className="App">
            <div style={{width: 'auto' , backgroundColor:'black'}}>
            <I18nPropvider locale={locale}>
              <div className="App">
                <header className="App-header">
                  <h1>
                    <FormattedMessage id="hello" />
                  </h1>
                  <h2>
                    Not translated part. {translate('hello')}
                  </h2>
                  <p>
                    {translate('edit-file', {file: <code>src/App.js</code>})}
                    <hr/>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>


                  <hr/>

                  <button onClick={() => setLocale(LOCALES.ENGLISH)}>English</button>
                  <button onClick={() => setLocale(LOCALES.THAI)}>THAI</button>
                </header>
              </div>
            </I18nPropvider>
              <Router>
                <Appbar />
                <Switch>
                      <Route exact path="/" ><Movies /></Route>
                      <Route exact path="/Popular" ><Popular /></Route>
                      <Route exact path="/TopRated" ><TopRated /></Route>
                      <Route exact path="/Favorites" ><Favorites /></Route>
                      <Route exact path="/moviedetails/:Tid/:type/:totalPage" ><Moviedetails /></Route>
                </Switch>
              </Router>
            </div>
    </div>


  );
}
export default App;
