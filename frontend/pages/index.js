import { Distribution, Box, Text, Grid} from "grommet";
import { MyLineChart } from "../components/Chart";
import { Counts, HospitalCount } from "../components/Counts";
import Head from 'next/head';
import { CountsDataTable } from "../components/CountsDataTable";



export default function Home(props) {
  return (
    <Box gap='medium' width="90%" align="center">
      <Head>
        <title>Bubbly | HOME</title>
      </Head>
      {/* 
          <Box gridArea='specific'pad="small" background="dark-3" /> */}
      <Grid columns={['large', 'medium']}
            rows={['0', 'small']}
            areas={[
              {name: 'overall', start:[0,0], end:[1, 0]},
              {name: 'other', start:[1,0], end:[1, 0]}
            ]}
            gap="small"
      >
            <Counts gridArea='overall' background="dark-1" />
            <HospitalCount gridArea="other"/>
      </Grid>
      <Grid columns={['medium', 'large']}
            rows={['medium', 'medium']}
            areas={[
              {name: 'table', start:[0,0], end:[1, 0]},
              {name: 'line', start:[1,0], end:[1, 0]}
            ]}
            gap="small"
      >
            <CountsDataTable gridArea='table'/>
            <MyLineChart gridArea='line'/>
      </Grid>
    </Box>
      // <Distribution
      //   fill={true}
      //   values={[
      //     {value: 50, color: 'light-3'},
      //     {value: 30, color: 'brand'},
      //     {value: 20, color: 'graph-0'},
      //     // {value: 10, color: 'light-3'},
      //     // {value: 5, color: 'brand'},
      //
      //   ]}
      // >
      //   {value => (
      //     <Box pad="small" background={value.color} fill>
      //       <Text size="large">{value.value}</Text>
      //     </Box>
      //   )}
      // </Distribution>
  )
}

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}