import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import {Card, CardHeader, CardBody, } from 'grommet';
import React from "react";
import axios from 'axios'


function CustomTick(props) {
  const date = new Date(props.payload.value)
  const label = `${date.toLocaleDateString(undefined, { month: 'short'})}-${date.getDay()}`

  return (
      <g transform={`translate(${props.x},${props.y})`}>
        <text x={25} y={0} dy={16} textAnchor="end" fill="#666">{label}</text>
      </g>
  );
}

export class MyLineChart extends React.Component {


  constructor(props) {
    super(props);
    this.state = {date: new Date(), chartData: [], name: 'Adam'};

  }

  async componentDidMount() {
    const apiUrl = 'http://localhost:1234/scrape?type=lab'
    try {
      let api_data = (await axios.get(apiUrl)).data
      let dates = {}

      const chartData = []
      api_data.forEach(x => {
        if (!dates[x.Date]) {
          dates[x.Date] = chartData.length
          let obj = {date: x.Date}
          obj[x.Region] = x.New_Tests
          chartData.push(obj)
        } else {
          chartData[dates[x.Date]][x.Region] = x.New_Tests
        }

        // console.log(chartData)
      })

      this.setState({chartData: chartData})
    } catch (e) {
      console.log(e)
    }


  }

  render() {
    return (
      <Card width="100%" height="420px" background='white' >
        <CardHeader pad="xsmall" background="brand">
          <h4 level="4">Total Daily COVID-19 tests Over Timey</h4>
        </CardHeader>
        <CardBody pad="none" align="center" justify="center">
          <ResponsiveContainer width='100%' aspect={2.5}>
            <LineChart data={this.state.chartData}>
              <Line type="monotone" dataKey="Fraser" stroke="#FD6FFF" dot={false}/>
              <Line type="monotone" dataKey="Vancouver Coastal" stroke="#00873D" dot={false}/>
              <Line type="monotone" dataKey="Interior" stroke="#81FCED" dot={false}/>
              <Line type="monotone" dataKey="Northern" stroke="#A2423D" dot={false}/>
              <Line type="monotone" dataKey="Vancouver Island" stroke="#FFAA15" dot={false}/>
              <CartesianGrid stroke="#eeeeee"/>
              <XAxis dataKey="date" stroke="#333333" reversed={true} tick={<CustomTick />} angle={315} />
              <YAxis stroke="#333333"/>
              <Tooltip labelFormatter={x => new Date(x).toLocaleDateString()} />
              <Legend verticalAlign="top" height={36} align="center" />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    )
  }
}