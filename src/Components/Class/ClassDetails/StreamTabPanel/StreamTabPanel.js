import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router';

import { Grid, Container } from "@mui/material";

import ClassTopic from '../ClassTopic';
import TabPanel from '../TabPanel';
import ClassInfo from "./ClassInfo";
import UpcommingTask from "./UpcommingTask";
import ClassAnnoucement from './ClassAnnounment';
import { tabsContext } from '../../../../context/TabsContext';


export default function StreamTabPanel({ value, index }) {
  const [classInfo, setClassInfo] = useState({});
  const { handleClassDetails } = React.useContext(tabsContext);
  let location = useLocation();

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const res = await axios.get("http://localhost:3000" + location.pathname);
        setClassInfo(res.data);
        handleClassDetails(res.data)
        document.title = res.data.className;
      } catch (error) {
        console.error(error);
      }
    }

    fetchClassDetail();

    // eslint-disable-next-line 
  }, []);

  return (
    <TabPanel value={value} index={index}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ClassInfo
              role="creatpr"
              className={classInfo.className}
              section={classInfo.section}
              subject={classInfo.subject}
              room={classInfo.room}
              inviteCode={classInfo.inviteCode}
            />
          </Grid>

          <Grid item xs={3}>
            <UpcommingTask />
          </Grid>

          <Grid container item md={9} sm={12} spacing={3}>
            <Grid item xs={12}>
              <ClassAnnoucement />
            </Grid>
            <Grid item xs={12}>
              <ClassTopic />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </TabPanel>
  );
}
