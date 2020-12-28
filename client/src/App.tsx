import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Header } from './components/Header'
import { List } from './components/List'
import { PokemonEntry } from './components/PokemonEntry';



function App() {
  return (
    <Wrapper>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <List />
          </Route>
          <Route path="/:id">
            <PokemonEntry />
          </Route>
        </Switch>
      </Router>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  /* width: 100%; */
  height: 100%;
  
`;

export default App;
