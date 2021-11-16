import React, { useState, useEffect } from "react";


import { Grid, Paper, IconButton, Typography, Stack, Tooltip, } from "@mui/material";
import { styled, createTheme } from "@mui/system";
import { grey, blue } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: blue[700],
  color: grey[50],
}));

const InfoGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  padding: theme.spacing(3),
  borderRadius: "0 0 4px 4px"
}));

const ShowDetail = ({ subject, room }) => {
  const theme = createTheme();

  return (
    <InfoGrid item xs style={{ padding: theme.spacing(3) }}>
      {subject && <Typography variant="body1"><b>Topic: </b>{subject}</Typography>}
      {room && <Typography variant="body1"><b>Room:</b> {room}</Typography>}
    </InfoGrid>
  )
}

export default function ClassInfo({ role, className, section, subject, room, inviteCode }) {
  const [showInfoBtn, setShowInfoBtn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copy, setCopy] = useState(false);
  const theme = createTheme();
  const location = window.location.href.split('/classes')[0];



  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  }

  const handleCopyClassCode = (location) => {

    navigator.clipboard.writeText(location + `/join/${inviteCode}`);
    setCopy(true);
  }

  const handleResetCopyState = () => {
    setCopy(false);
  }

  useEffect(() => {
    if (subject || room) {
      setShowInfoBtn(true);
    }
  }, [subject, room]);

  if (role === "creator") {
    return (
      <StyledPaper elevation={6}>
        <Grid
          container
          justifyContent="space-around"
          alignItems="flex-end"
          style={{ height: 180, padding: theme.spacing(3) }}
        >
          <Grid item xs>
            <Typography variant="h4">{className}</Typography>
            <Typography variant="h6">{section}</Typography>
          </Grid>

          {showInfoBtn && (
            <Grid item>
              <Tooltip title="View class information">
                <IconButton aria-label="display topic and room" onClick={handleShowDetails}>
                  <InfoIcon sx={{ color: grey[50] }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
        {showDetails && <ShowDetail subject={subject} room={room} />}
      </StyledPaper>
    );
  } else return (
    <StyledPaper elevation={6}>
      <Grid
        container
        alignItems="flex-start"
        style={{ height: 180, padding: theme.spacing(3) }}
        direction="row"
      >
        <Grid item xs={12}>
          <Typography variant="h4">{className}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              display = "block"
              width = "250px"
              variant="h6"
              noWrap
              overflow="hidden"
              text-overflow="ellipsis"
            >
              <b>Class code:</b> {location + `/join/${inviteCode}`}
            </Typography>
            <Tooltip title={copy ? "Copied!" : "Click to copy"}>
              <IconButton
                sx={{ color: grey[50] }}
                onClick={()=>handleCopyClassCode(location)}
                onMouseLeave={handleResetCopyState}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}