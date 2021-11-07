import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import { styled, createTheme } from '@mui/system';

import CreateClassButton from './CreateClassButton';

const theme = createTheme();

const StyledAppBar = styled(AppBar)`
  background-color: ${grey[900]};
  color: ${grey[100]};
`

const MenuIconButton = styled(IconButton)`
  margin-right: ${theme.spacing(2)};
  &:hover {
    background-color: ${grey[800]};
  }
`

export default function MenuAppBar({ handleRender }) {
  return (
    <StyledAppBar elevation={0} position="static">
      <Toolbar>
        <MenuIconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </MenuIconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="left">
          Classroom
        </Typography>
        <CreateClassButton handleRender={handleRender} />
      </Toolbar>
    </StyledAppBar>
  );
}