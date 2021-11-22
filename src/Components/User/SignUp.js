import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



import sendUserInfoSignUp from '../DataConnection/SignUpHandler';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorUserName, setErrorUserName] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const handleError = (error)=>
  {
    let email = error.email;
    let username = error.username;
    let password = error.password; 
    
    setErrorEmail(!email.match(/.+@.+/));
    setErrorUserName((username!=="")? false:true )
    setErrorPassword((password!=="")? false:true )

    if (errorEmail===false&&errorUserName===false&&errorPassword===false)
    {
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   
      const data = new FormData(event.currentTarget);

      const userInfo =
      {
        email: data.get('email'),
        password: data.get('password'),
        username: data.get('username')
      };
  
  
  
      //sendUserInfoSignUp(userInfo);
    
      console.log(handleError(userInfo));
      if(handleError(userInfo)===false)
      {
        sendUserInfoSignUp(userInfo);
      }
     
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorEmail}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  //onChange={handleOnchange}
                  helperText={errorEmail? 'Nhập email sai format!' : ' '}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorUserName}
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  helperText={errorUserName? 'Không thể bỏ trống' : ' '}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorPassword}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  helperText={errorPassword? 'Không thể bỏ trống' : ' '}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}