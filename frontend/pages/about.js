import {Box, Text, Grid} from "grommet";
import Head from 'next/head'
import {Author} from '../components/Author'
export default function About(props){
  return (
    <Box background="white" width="80%" margin="auto">
      <Head>
        <title>Bubbly | ABOUT</title> 
      </Head>

      <Text textAlign="center" margin="small" size="xlarge">About</Text>
      <Box>
        <Text size="large" margin="small" textAlign="center">
          BubbleBot is a web-based information system for providing quick and convenient access to COVID-19 data and alerts in British Columbia, Canada.
        </Text>
        <Text size="large" margin="small" textAlign="center">
          It was created as a project in the CMPT 470 course at Simon Fraser University during the Fall 2020 semester by a group of five students.
        </Text>
      </Box>

      <Box alignSelf="center" margin="small">
        <Author name="Kainoa Seaman" email="kseaman@sfu.ca" margin="small"/>
        <Author name="Joergen Reyes" email="joergenr@sfu.ca" margin="small"/>
        <Author name="Daniel Zhao" email="zxzhao@sfu.ca" margin="small"/>
        <Author name="Adam Watkins" email="awa111@sfu.ca" margin="small"/>
        <Author name="Alex Hoang" email="nqhoang@sfu.ca" margin="small"/>
      </Box>
    </Box>
  )
}