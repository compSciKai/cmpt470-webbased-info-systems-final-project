import {Card, Box, CardBody, CardHeader, Text, CardFooter, } from "grommet";
import React from "react";
import { $axios } from '../plugins/axios';
import CountUp from 'react-countup';



function CountsCard({value, name, color='brand'}) {
  return (
    <Card height="small" basis="large" background={color}>
      <CardHeader size="medium" pad="small" >
        <Text weight="bold"> {name}</Text></CardHeader>
      <CardBody pad="small">
        <CountUp end={value} />
      </CardBody>
    </Card>
  )
}


export class Counts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: []
    }
  }

  async componentDidMount() {
    const data = (await $axios.get('/scrape?type=totals')).data
    console.log(data)
    this.setState({totals: data})
  }

  // const api_data = (await $axios.get('/scrape?type=totals')).data

  render() {
    return (
      <Box direction="row" gap="small">
        {this.state.totals.map(counts => <CountsCard {...counts} />)}
      </Box>
    )
  }
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
      <Card height="small" background="brand">
        <CardBody>
          <Box direction="row" pad="small" justify="evenly">
            <Text weight="bold">Active cases</Text>
            <Text>{data.activeCases}</Text>
            {data.activeUp ?
                <CountUp end={data.changeInActive} prefix="+ "/> :
                <CountUp end={data.changeInActive} prefix="- "/>}
          </Box>
          <Box direction="row" pad="small" justify="evenly">
            <Text weight="bold">Currently hospitalized</Text>
            <Text>{data.currentlyHospitalized}</Text>
            {data.hospitalizedUp ?
                <CountUp end={data.changeInHospitalized} prefix="+ "/> :
                <CountUp end={data.changeInHospitalized} prefix="- "/>}
          </Box>
          <Box direction="row" pad="small" justify="evenly">
            <Text weight="bold">Currently in ICU</Text>
            <Text>{data.currentlyInICU}</Text>
            {data.ICUUp ?
                <CountUp end={data.changeInICU} prefix="+ "/> :
                <CountUp end={data.changeInICU} prefix="- "/>}
          </Box>
        </CardBody>

        <CardFooter justify="center" background={'status-warning'}>
          This is Mock Data
        </CardFooter>
      </Card>
  )
}

