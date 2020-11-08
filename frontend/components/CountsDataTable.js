import {Card, CardHeader, CardBody, DataTable, Text} from 'grommet';
import React from "react";
import axios from 'axios'

export class CountsDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tableData: [], name: 'Adam'};

    this.columns = [
        {
            property: 'HA_Name',
            header: <Text>Health Authority</Text>,
            primary: true,
            footer: 'Total',
        },
        {
            property: 'NewCases',
            header: 'New Cases',
            aggregate: 'sum',
            footer: {aggregate: true},
        },

        {
            property: 'CurrentlyHosp',
            header: 'Hospitalized',
            aggregate: 'sum',
            footer: {aggregate: true},
        },
        {
            property: 'CurrentlyICU',
            header: 'In ICU',
            aggregate: 'sum',
            footer: {aggregate: true},
        },
        {
            property: 'Deaths',
            header: 'Total Deaths',
            aggregate: 'sum',
            footer: {aggregate: true},
        },

    ]
  }

  async componentDidMount() {
      try {
          const apiUrl = 'http://localhost:1234/scrape';
          let data = (await axios.get(apiUrl)).data;
          console.log(data);
          this.setState({tableData: data});
      } catch (e) {
          console.log(e)
      }
  }

  render() {
    return (
      <Card width="large" height="420px">
        <CardHeader pad="small" background="accent-1">
          <h4 level="4">Daily Tests Per Day</h4>
        </CardHeader>

        <CardBody pad="medium" overflow="scroll">
            <DataTable columns={this.columns} data={this.state.tableData} />
        </CardBody>
      </Card>
    )
  }
}