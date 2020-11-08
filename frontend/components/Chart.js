import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {Card, CardHeader, CardBody, } from 'grommet';
import React from "react";
import axios from 'axios'

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
          let obj = {name: new Date(x.Date)}
          obj[x.Region] = x.New_Tests
          chartData.push(obj)
        } else {
          chartData[dates[x.Date]][x.Region] = x.New_Tests
        }
      })

      this.setState({chartData: chartData})
    } catch (e) {
      console.log(e)
    }


  }

  render() {
    return (
      <Card width="100%" height="420px">
        <CardHeader pad="small" background="accent-1">
          <h4 level="4">Daily Tests Per Day</h4>
        </CardHeader>
        <CardBody pad="medium">
            <LineChart width={600} height={300} data={this.state.chartData}>
              <Line type="monotone" dataKey="Fraser" stroke="green" dot={false}/>
              <Line type="monotone" dataKey="Vancouver Coastal" stroke="red" dot={false}/>
              <CartesianGrid stroke="#eeeeee"/>
              <XAxis dataKey="name" stroke="#333333" reversed={true}/>
              <YAxis stroke="#333333"/>
            </LineChart>
        </CardBody>
      </Card>
    )
  }
}