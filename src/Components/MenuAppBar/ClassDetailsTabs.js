import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';

import { tabsContext } from '../../context/TabsContext';

const StyledTab = styled(Tab)`
  text-transform: none;
`

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Grades({ role, ...a11yProps }) {
  if (role === "member") {
    return null;
  } else return (
    <StyledTab label="Grades" {...a11yProps} />
  );
}

export default function ClassDetailsTabs({ role }) {
  const { value, handleChange, classDetails } = React.useContext(tabsContext);

  return (
    <Grid container spacing={2}>
      <Grid container item xs={3} direction="column" justifyContent="center">
        <Grid item>
          <Typography>
            {classDetails.className}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {classDetails.section}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Tabs
          TabIndicatorProps={{ style: { background: `${grey[50]}` } }}
          textColor="inherit" value={value} onChange={handleChange} centered
        >
          <StyledTab label="Stream" {...a11yProps(0)} />
          <StyledTab label="Classwork" {...a11yProps(1)} />
          <StyledTab label="People" {...a11yProps(2)} />
          <Grades role={role} {...a11yProps(3)} />
        </Tabs>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}