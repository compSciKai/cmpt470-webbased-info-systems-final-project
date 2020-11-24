import {Box, Text} from "grommet"
import Head from 'next/head'

export default function CovidInfo(props){
  return (
    <Box>
      <Head>
        <title>Bubbly | COVID-19 INFO</title> 
      </Head>
      <Text size="xlarge" margin="small" alignSelf="center">COVID-19 Info</Text>
      <Text size="medium" margin="small" alignSelf="center">BubbleBot retrieves COVID-19 data from several sources.</Text>
    </Box>
  )
}