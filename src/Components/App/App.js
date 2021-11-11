import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { styled } from "@mui/system";
import { Container } from "@mui/material";

import './App.css';
import Homepage from '../Homepage/Homepage';
import MenuAppBar from "../MenuAppBar/MenuAppBar";
import TabsProvider from "../../context/TabsContext";
import ClassDetails from "../Class/ClassDetails/ClassDetails";

const StyledContainer = styled(Container)(({theme}) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3)
}));

function App() {
  const [newClassId, setNewClassId] = useState('');

  return (
    <Router> 
      <TabsProvider>
        <MenuAppBar handleRender={setNewClassId} />
        <StyledContainer maxWidth="xl">
          <Routes>
            <Route path="/" element={<Homepage newClassId={newClassId} />} />
            <Route path="/classes/*" element={<ClassDetails />} />
          </Routes>
        </StyledContainer>
      </TabsProvider>
    </Router>
  );
}

export default App;
