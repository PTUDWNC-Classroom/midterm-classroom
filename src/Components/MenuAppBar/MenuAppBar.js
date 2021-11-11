import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';

import {
  useLocation
} from "react-router-dom";

import ClassDetailsTabs from './ClassDetailsTabs';
import CreateClassButton from './CreateClassButton';

const StyledAppBar = styled(AppBar)`
  background-color: ${grey[900]};
  color: ${grey[100]};
`

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: grey[800],
  }
}));

const MainAppBar = ({ path }) => {
  const pathArr = path.split("/");
  //pathArr.shift();

  switch (pathArr[1]) {
    case "classes":
      return <ClassDetailsTabs role="creator" />
    default:
      return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="left">
          Classroom
        </Typography>
      );
  }
}

export default function MenuAppBar({ handleRender }) {
  let location = useLocation();

  return (
    <>
      <StyledAppBar elevation={0} position="fixed">
        <Toolbar>
          <MenuIconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </MenuIconButton>
          <MainAppBar path={location.pathname} />
          <CreateClassButton handleRender={handleRender} />
        </Toolbar>
      </StyledAppBar>
      <Toolbar />
    </>
  );
}