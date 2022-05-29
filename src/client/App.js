import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AllMeals } from "./components/AllMeals";
import { Meal } from "./components/Meal"
import { AddMeal } from "./components/AddMeal"
 

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
          <AllMeals />
        </Route>
        <Route exact path="/meals/:id">
          <Meal />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
