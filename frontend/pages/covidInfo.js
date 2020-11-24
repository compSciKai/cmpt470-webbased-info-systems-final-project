import {Box, Text} from "grommet"
import Head from 'next/head'
import Link from "next/link"

export default function CovidInfo(props){
  return (
    <Box>
      <Head>
        <title>Bubbly | COVID-19 INFO</title> 
      </Head>
      <Box alignSelf="center">
        <Text size="xlarge" margin={{vertical: "small"}}>COVID-19 Info</Text>
        <Text size="medium" margin={{vertical: "small"}}>BubbleBot retrieves COVID-19 data from several sources.</Text>

        <Link margin={{vertical: "small"}} href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19/data">
          <a>BC Center For Disease Control</a>
        </Link>
        
      </Box>
      
    </Box>
  )
}