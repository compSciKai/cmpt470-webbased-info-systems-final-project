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
        
        <Text size="large" margin={{vertical: "small"}}>What To Do If Infected</Text>
        <Text size="medium" margin={{vertical: "small"}}>
          The only way to confirm if you have COVID-19 is to go through a laboratory test.
          <br />
          However, there are self-assessment tests you can take to help determine if you should do a laboratory test.
          <br />
          If you suspect that you have been infected with COVID-19, contact your local public health authority.
          <br />
          If you suspect or a test has determined that you have COVID-19, self-isolate at home for 14 days to avoid spread.
          <br />
          In both cases, follow instructions from your local public health authority.
        </Text>

        <Link margin={{vertical: "small"}} href="https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html">
          <a>More info on up-to-date COVID-19 guidelines and procedures in Canada</a>
        </Link>

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