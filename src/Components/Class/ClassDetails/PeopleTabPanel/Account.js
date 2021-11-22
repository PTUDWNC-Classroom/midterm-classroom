import React from "react"
import Avatar from "@mui/material/Avatar"
import { Typography, Grid } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"
//import MoreVertIcon from "@mui/icons-material/MoreVert"

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0 ${theme.spacing(2)} ${theme.spacing(2)}`,
  borderBottom: `1px solid ${grey[500]}`,
}))

export default function Account({ userName }) {
  return (
    <StyledGrid container>
      <Grid container item alignItems="center" spacing={2} xs={8}>
        {/* <Grid item>
          <Checkbox />
        </Grid> */}
        <Grid item>
          <Avatar alt={userName} src="/user.svg" />
        </Grid>
        <Grid item>
          <Typography>{userName}</Typography>
        </Grid>
      </Grid>
      {/* <Grid item xs={4} textAlign="right">
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Grid> */}
    </StyledGrid>
  )
}
