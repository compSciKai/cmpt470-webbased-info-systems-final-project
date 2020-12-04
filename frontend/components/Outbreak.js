import { Card, CardHeader, CardBody, Tab, Tabs, Table, TableHeader, TableCell, TableRow, TableBody } from 'grommet';
import React from "react";
import { $axios } from '../plugins/axios';

export class MyOutbreakCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      health: [],
      outbreaks: []
    }
  }

  async componentDidMount(){
    try {
      let temp = (await $axios.get('/outbreaks')).data;
      let tempName = [];
      let tempOutbreaks = [];
      temp.forEach((key) => {
        tempName.push(key.name);
        tempOutbreaks.push(key.outbreaks);
      });
      this.setState({health: tempName, outbreaks: tempOutbreaks});
    } catch (e) {
      console.log(e);
    }
  }

  render(){
    return (
      <Card width="100%" flex="grow" margin={{"vertical": "medium"}} >
         <CardHeader pad="xsmall" background="brand">
          <h4 level="4">Current Outbreaks by Health Authority</h4>
        </CardHeader>
        <CardBody justify="center" >
            <Tabs margin="small">
            {this.state.health.map((ho, i) => 
              <Tab title={ho}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell scope="col" border="bottom">
                        Location
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Address
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {this.state.outbreaks[i].map((o) =>
                      <TableRow>
                        <TableCell scope="row"><strong>{o.location}</strong></TableCell>
                        <TableCell>{o.address}</TableCell>
                        <TableCell>{o.date}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Tab>
            )}
            </Tabs>
        </CardBody>
      </Card>
    );
  }
}

