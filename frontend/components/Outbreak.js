import { Card, CardHeader, CardBody, Tab, Tabs, Table, TableHeader, TableCell, TableRow, TableBody, Anchor, Box } from 'grommet';
import React from "react";
import { $axios } from '../plugins/axios';

export class MyOutbreakCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      health: [],
      outbreaks: [],
      url: []
    }
  }

  async componentDidMount(){
    try {
      let temp = (await $axios.get('/outbreaks')).data;
      let tempName = [];
      let tempOutbreaks = [];
      let tempUrl = [];
      temp.forEach((key) => {
        tempName.push(key.name);
        tempOutbreaks.push(key.outbreaks);
        tempUrl.push(key.url);
      });
      this.setState({health: tempName, outbreaks: tempOutbreaks, url: tempUrl});
    } catch (e) {
      console.log(e);
    }
  }

  render(){
    return (
      <Card width="100%" flex="grow" margin={{"vertical": "large"}}>
         <CardHeader pad="xsmall" background="brand">
          <h4 level="4">Current Outbreaks by Health Authority</h4>
        </CardHeader>
        <CardBody background="white" align="center" justify="center" >
            <Tabs margin="small">
            {this.state.health.map((ho, i) => 
              <Tab title={ho}>
                <Box margin="small" height="380px" width="800px" overflow="scroll">
                  <Table alignSelf="center">
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
                <Anchor href={this.state.url[i]} label="Source" alignSelf="center"/>
                </Box>
              </Tab>
            )}
            </Tabs>
        </CardBody>
      </Card>
    );
  }
}

