import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Meals } from "./components/pages/Meals";
import { MealById } from "./components/pages/MealById";
import { AddMeal } from "./components/pages/AddMeal";
import { PageNotFound } from "./components/pages/Page404";

 

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/addmeal">
          <AddMeal />
        </Route>
        <Route exact path="/meals">
          <Meals />
        </Route>
        <Route exact path="/meals/:id">
          <MealById />
        </Route>
        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
