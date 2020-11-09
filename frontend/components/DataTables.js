import {Card, CardHeader, CardBody, DataTable, Text, Table, TableHeader, TableBody, TableCell, TableRow, Button} from 'grommet';
import React from "react";
import { $axios } from '../plugins/axios';

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
          let data = (await $axios.get('/scrape')).data;
          this.setState({tableData: data});
      } catch (e) {
          console.log(e)
      }
  }

  render() {
    return (
      <Card width="large" height="420px" background='white'>
        <CardHeader pad="xsmall" background="brand">
          <h4 level="4">Daily Tests Per Day</h4>
        </CardHeader>

        <CardBody pad="x-small" overflow="scroll">
            <DataTable columns={this.columns} data={this.state.tableData} />
        </CardBody>
      </Card>
    )
  }
}

export function TestingLocationDataTable(){
  let locations = [
    {
      name: `St. Vincent's assisted living facility`,
      timeOpen: '7AM',
      timeClose: '6PM',
      phoneNumer: '(604) 333-333'
    },
    {
      name: 'City Centre UPCC',
      timeOpen: '7AM',
      timeClose: '6PM',
      phoneNumer: '(604) 333-333'
    },
    {
      name: 'North Vancouver UPCC',
      timeOpen: '7AM',
      timeClose: '6PM',
      phoneNumer: '(604) 333-333'
    },
    {
      name: 'Reach UPCC',
      timeOpen: '7AM',
      timeClose: '6PM',
      phoneNumer: '(604) 333-333'
    },
    {
      name: 'Sunshine Coast',
      timeOpen: '7AM',
      timeClose: '6PM',
      phoneNumer: '(604) 333-333'
    }
  ]
  return(
    <Card width="medium" height="medium" background="accent-1">
      <CardHeader size="medium" pad="small" >
        <Text weight="bold"> Testing locations near your area </Text>
        </CardHeader>
      <CardBody pad="small">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Name
              </TableCell>
              <TableCell scope="col" border="bottom">
                Navigate
              </TableCell>
              <TableCell scope="col" border="bottom">
                Time
              </TableCell>
              <TableCell scope="col" border="bottom">
                Phone #
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map(location => 
              <TableRow>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    <Button primary label="Map"/>
                  </TableCell>
                  <TableCell>{location.timeOpen}-{location.timeClose}</TableCell>
                  <TableCell>{location.phoneNumer}</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}