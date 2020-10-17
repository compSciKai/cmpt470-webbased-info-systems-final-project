import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {Card, CardHeader, CardBody, } from 'grommet';

const data = [
    {name: 'A', uv: 400, pv: 2400, amt: 2400},
    {name: 'B', uv: 300, pv: 2400, amt: 2400},
    {name: 'C', uv: 450, pv: 2400, amt: 2400},
    {name: 'D', uv: 200, pv: 2400, amt: 2400},
    {name: 'E', uv: 20, pv: 2400, amt: 2400},
];

export function MyLineChart(props) {
    return (
        <Card width="large" >
            <CardHeader pad="small" background="accent-1">
                <h4 level="4">A simple Graph</h4>
            </CardHeader>
            <CardBody pad="medium">
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#7D4CDB"/>
                    <CartesianGrid stroke="#EDEDED"/>
                    <XAxis dataKey="name" stroke="#333333"/>
                    <YAxis stroke="#333333"/>
                </LineChart>
            </CardBody>
        </Card>

    )
}