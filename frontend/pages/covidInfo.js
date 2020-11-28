import {Box, List, Text} from "grommet"
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
        
        <Text size="large" margin={{vertical: "small"}}>Common Symptoms</Text>

        <List
          data={[
            { symptom: "New or worsening coughs" },
            { symptom: "Breathing problems" },
            { symptom: "Temperatures of at least 38 degrees Celsius" },
            { symptom: "Feeling feverish/chills" },
            { symptom: "Fatigue, weakness, muscle or body aches" },
            { symptom: "Loss of smell or taste" },
            { symptom: "Headaches" },
            { symptom: "Gastrointernal symptoms (vomiting, diarrhea, etc.)" },
            { symptom: "Feeling very unwell in general" },
          ]}
        />

        <Text size="medium" margin={{vertical: "small"}}>
          Even after being exposed to COVID-19, it may take up to 14 days for any symptoms to appear.
          <br />
          Infected individuals that are not showing symptoms can still spread the virus.
          <br />
          
        </Text>

        <Text size="large" margin={{vertical: "small"}}>Sources</Text>
        
        <Text size="medium">BubbleBot retrieves COVID-19 data from the following sources.</Text>
        <Link href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19/data">
          <a>BC Center For Disease Control</a>
        </Link>

      </Box>
      
    </Box>
  )
  // https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms.html
}