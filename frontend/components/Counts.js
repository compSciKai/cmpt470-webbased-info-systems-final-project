import {Card, Box, CardBody, CardHeader, Text} from "grommet";
import CountUp from 'react-countup';

function CountsCard({total_count, new_count, title, color='accent-1'}) {
  return (
    <Card height="small" basis="medium" background={color}>
      <CardHeader size="medium" pad="small" >
        <Text weight="bold"> {title}</Text></CardHeader>
      <CardBody pad="small">
        <CountUp end={total_count} suffix=" total" />
        <CountUp end={new_count} prefix="+ " />
      </CardBody>
    </Card>
  )
}

export function Counts() {
  const data = [
    {
      total_count: 1007,
      new_count: 127,
      title: 'Total Cases',
    },
    {
      total_count: 10023,
      new_count: 121,
      title: 'Recovered',
    },
    {
      total_count: 69,
      new_count: 2,
      title: 'Deaths'
    }
  ]

  return (
    <Box direction="row" gap="small">
      { data.map(counts =><CountsCard {...counts} />) }
    </Box>
  )
}

export function HospitalCount(){
  //Gonna need to change this to API call
  let data = {
    activeCases: 12,
    currentlyHospitalized: 12,
    currentlyInICU: 12,
    changeInActive: 10,
    activeUp: 1,
    changeInHospitalized: 5,
    hospitalizedUp: 0,
    changeInICU: 9,
    ICUUp: 1
  }
  return(
    <Card basis="medium" background="accent-1">
      <Box direction="row" pad="small" justify="evenly">
        <Text weight="bold">Active cases</Text>
        <Text>{data.activeCases}</Text>
        {data.activeUp ? 
          <CountUp end={data.changeInActive} prefix="+ " /> :
          <CountUp end={data.changeInActive} prefix="- " />}
      </Box>
      <Box direction="row" pad="small" justify="evenly">
        <Text weight="bold">Currently hospitalized</Text>
        <Text>{data.currentlyHospitalized}</Text>
        {data.hospitalizedUp ? 
          <CountUp end={data.changeInHospitalized} prefix="+ " /> :
          <CountUp end={data.changeInHospitalized} prefix="- " />}
      </Box>
      <Box direction="row" pad="small" justify="evenly">
        <Text weight="bold">Currently in ICU</Text>
        <Text>{data.currentlyInICU}</Text>
        {data.ICUUp ? 
          <CountUp end={data.changeInICU} prefix="+ " /> :
          <CountUp end={data.changeInICU} prefix="- " />}
      </Box>
    </Card>
  )
}

