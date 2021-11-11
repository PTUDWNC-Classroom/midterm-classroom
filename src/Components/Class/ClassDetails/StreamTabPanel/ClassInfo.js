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

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  }

  const handleCopyClassCode = () => {
    navigator.clipboard.writeText(inviteCode);
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
            <Typography variant="h6"><b>Class code:</b> {inviteCode}</Typography>
            <Tooltip title={copy ? "Copied!" : "Click to copy"}>
              <IconButton
                sx={{ color: grey[50] }}
                onClick={handleCopyClassCode}
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