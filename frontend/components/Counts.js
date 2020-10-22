import {Card, Box, CardBody, CardHeader} from "grommet";
import CountUp from 'react-countup';

function CountsCard({total_count, new_count, title, color='light-4'}) {
  return (
    <Card background={color}>
      <CardHeader pad="small">{title}</CardHeader>
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
      title: 'Active Cases',
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

