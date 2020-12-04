import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import {Card, CardHeader, CardBody, Menu } from 'grommet';
import React from "react";
import { $axios } from '../plugins/axios';


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
    this.state = {
      date: new Date(),
      chartData: [],
      chartDescription: '',
      chartLabel: '',
      title: 'Daily Test Positivity Over Time'
    };

    this.menuLabels = [
      { label: 'New Tests', onClick: () => this.reloadData('New_Tests')},
      { label: 'Total Tests', onClick: () => this.reloadData('Total_Tests')},
      { label: 'Positivity', onClick: () => this.reloadData('Positivity')},
      { label: 'Turn Around Time', onClick: () => this.reloadData('Turn_Around')},
    ]

    this.charts = {
      New_Tests: 'Daily Tests Over Time',
      Total_Tests: 'Total Tests Over Time',
      Positivity: 'Daily Test Positivity Over Time',
      Turn_Around: 'Test Turn Around Time (hrs) Over Time',
    }
  }

  async reloadData(param) {
    try {
      let api_data = (await $axios.get('/scrape?type=lab')).data
      let dates = {}

      const chartData = []
      api_data.forEach(x => {
        if (!dates[x.Date]) {
          dates[x.Date] = chartData.length
          let obj = {date: x.Date}
          obj[x.Region] = x[param]
          chartData.push(obj)
        } else {
          chartData[dates[x.Date]][x.Region] = x[param]
        }
      })

      this.setState({chartData: chartData, title: this.charts[param]})
    } catch (e) {
      console.log(e)
    }
  }

  async componentDidMount() {
    await this.reloadData('Positivity')
  }

  render() {
    return (
      <Card height="420px" background='white'>
        <CardHeader pad="xsmall" background="brand">
          <h4 level="4">{ this.state.title }</h4>
          <Menu
            items={this.menuLabels}
            dropProps={{
              elevation: 'xlarge',
            }}
          />
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