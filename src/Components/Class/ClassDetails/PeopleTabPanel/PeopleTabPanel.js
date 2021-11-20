import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router"

import { Grid, Container, Typography } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

import TabPanel from "../TabPanel"
import Account from "./Account"
import { styled } from "@mui/system"
import { blue } from "@mui/material/colors"

const BlueTextTypography = styled(Typography)(({ theme }) => ({
  color: blue[500],
}))

const TeachersGrid = styled(Grid)(({ theme }) => ({
  borderBottom: `2px solid ${blue[500]}`,
  paddingBottom: theme.spacing(2),
}))

const StudentGrid = styled(TeachersGrid)(({ theme }) => ({
  marginTop: theme.spacing(10),
}))

const getIdFromUrl = (url) => {
  const arr = url.split("/")
  return arr[arr.length - 1]
}

const StudentTotal = ({ studentList }) => {
  const length = studentList.length

  if (length === 0) {
    return null
  } else if (length === 1) {
    return "1 student"
  } else {
    return `${length} students`
  }
}

export default function PeopleTabPanel({ value, index }) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [teacherList, setTeacherList] = useState([])
  const [studentList, setStudentList] = useState([])
  let location = useLocation()

  useEffect(() => {
    const getTeacherList = async (classId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}classes/teachers-of-class/${classId}`
        )

        setTeacherList(response.data)
        setIsLoaded(true)
      } catch (error) {
        console.error(error)
        setIsLoaded(true)
        setError(error)
      }
    }

    const getStudentList = async (classId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}classes/students-of-class/${classId}`
        )

        setStudentList(response.data)
        setIsLoaded(true)
      } catch (error) {
        console.error(error)
        setIsLoaded(true)
        setError(error)
      }
    }

    const classId = getIdFromUrl(location.pathname)
    getTeacherList(classId)
    getStudentList(classId)

    // eslint-disable-next-line
  }, [])

  if (error) {
    return (
      <Typography variant="h4" color="error" align="center" flexGrow={1}>
        Error: {error.message}
      </Typography>
    )
  } else if (!isLoaded) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <TabPanel value={value} index={index}>
        <Container maxWidth="md">
          <TeachersGrid container>
            <Grid item>
              <BlueTextTypography variant="h4">Teachers</BlueTextTypography>
            </Grid>
            <Grid item></Grid>
          </TeachersGrid>
          <div>
            <Account userName={"Creator"} />
            {teacherList &&
              teacherList.map((teacher) => (
                <Account key={teacher.userId} userName={teacher.userName} />
              ))}
          </div>

          <StudentGrid
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <BlueTextTypography variant="h4">Students</BlueTextTypography>
            </Grid>
            <Grid item>
              <BlueTextTypography>
                <StudentTotal studentList={studentList} />
              </BlueTextTypography>
            </Grid>
          </StudentGrid>
          <div>
            {studentList &&
              studentList.map((student) => (
                <Account key={student.userId} userName={student.userName} />
              ))}
          </div>
        </Container>
      </TabPanel>
    )
  }
}
