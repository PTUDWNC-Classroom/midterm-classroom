import { Grid, Paper, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { createTheme, styled } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import MovingIcon from '@mui/icons-material/Moving';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import { blue, grey } from '@mui/material/colors';
import axios from "axios";

const theme = createTheme();

const StyledGrid = styled(Grid)`
  margin-top: ${theme.spacing(1)};
  margin-Bottom: ${theme.spacing(2)};
`;

const StyledInfoGrid = styled(Grid)`
  background-color: ${blue[700]};
  color: ${grey[50]};
  padding:${theme.spacing(2)};
  border-radius: 4px 4px 0 0;
`

const MoreVertIconButton = styled(IconButton)`
  &:hover {
    background-color: ${blue[800]};
  }
`

const ClassList = ({ newClassId }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const getClassList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);

        if (response) { 
          setIsLoaded(true);
          setItems(response.data);
        }
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      }
    }

    getClassList();
  }, [newClassId]);

  if (error) {
    return <Typography variant="h4" color="error" align="center" flexGrow={1}>Error: {error.message}</Typography>;
  } else if (!isLoaded) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '90vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <StyledGrid container spacing={3}>
        {items.length > 0 ? items.map(item => (
          <Grid item md={3} sm={6} xs={12} key={item.id}>
            <Paper elevation={6}>
              <StyledInfoGrid container alignItems="flex-start" justifyContent="flex-start">
                <Grid container item xs={10} minHeight="60px">
                  <Grid item xs={12}>
                    <Typography variant="h6" noWrap textAlign="left"
                      sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        paddingTop: 0.5,
                      }}>
                      {item.className}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" noWrap textAlign="left"
                      sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}>
                      {item.section}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <MoreVertIconButton
                    aria-label="menu of class setting"
                    aria-controls="menu-class-setting"
                    aria-haspopup="true"
                    onClick={handleClick}
                    color="inherit"
                  >
                    <MoreVertIcon />
                  </MoreVertIconButton>
                </Grid>
                <Grid item xs={12} textAlign="left" mt={1}>
                  {item.studentTotal}
                  {item.studentTotal <= 1 ? " student" : " students"}
                </Grid>
              </StyledInfoGrid>

              <Grid container alignItems="center" justifyContent="flex-start"
                sx={{ padding: 4 }}>
              </Grid>
              <Grid container alignItems="center" justifyContent="flex-end"
                sx={{ padding: 1, borderTop: '2px solid #eeeeee' }}>
                <Grid item>
                  <IconButton>
                    <MovingIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <FolderIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )) : <Typography variant="h4" color="error" align="center" flexGrow={1}>Class not found!</Typography>}

        <Menu
          id="menu-class-setting"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Change background</MenuItem>
          <MenuItem onClick={handleClose}>
            Delete
          </MenuItem>
        </Menu>
      </StyledGrid>
    );
  }
}

export default ClassList;
