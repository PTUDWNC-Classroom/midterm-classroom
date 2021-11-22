import React, { useState } from "react";
//import { useGoogleLogin } from 'react-google-login'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Redirect, Switch } from 'react-router'

import { styled } from "@mui/system";
import { Container } from "@mui/material";

import './App.css';
import Homepage from '../Homepage/Homepage';
import MenuAppBar from "../MenuAppBar/MenuAppBar";
import TabsProvider from "../../context/TabsContext";
import ClassDetails from "../Class/ClassDetails/ClassDetails";
import ClassJoin from "../Class/ClassJoin/ClassJoin";
import SignIn from "../User/SignIn";
import SignUp from "../User/SignUp";
//import SocialLogin from "../User/Social-SignIn/Google-Login-Button";
import SocialLogout from "../User/Social-SignIn/Google-Logout-Button";
import SocialLogin from "../User/Social-SignIn/Google-Login-Button";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3)
}));

// function checkLoginHomePage(newClassId) {
//   const isLogin = localStorage.getItem('isLogedin');
//   console.log(isLogin);
//   return isLogin? <Homepage newClassId={newClassId} />: <Navigate to="/log-in" replace/>;
// }

function App() {
  const isLogin = sessionStorage.getItem('isSocialLogin');
  console.log(isLogin);
  const [newClassId, setNewClassId] = useState('');


  //console.log(isLogin);
  return (
    <Router>
      <TabsProvider>
        <MenuAppBar handleRender={setNewClassId} />
        <StyledContainer maxWidth="xl">
          <Switch>
            <Route exact path="/" render={() => {
              const isLogin = (sessionStorage.getItem('isSocialLogin')||sessionStorage.getItem('isLogin'));
              console.log(isLogin);
              return isLogin ? <Homepage newClassId={newClassId} /> : <Redirect to="/sign-in" />;
            }}
            />
            <Route exact path="/log-in">
              <SocialLogin />
            </Route>
            <Route exact path="/log-out">
              <SocialLogout />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/sign-in">
              <SignIn />
            </Route>
            <Route exact path="/classes/*">
              <ClassDetails />
            </Route>
            <Route exact path="/join/*">
              <ClassJoin />
            </Route>
          </Switch>
        </StyledContainer>
      </TabsProvider>
      {/* <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes> */}
    </Router>
  );
}

export default App;
