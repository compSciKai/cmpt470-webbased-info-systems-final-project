import { Distribution, Box, Text, Grid} from "grommet";
import { MyLineChart } from "../components/Chart";
import { Counts } from "../components/Counts";
import Head from 'next/head';
import { CountsDataTable } from "../components/CountsDataTable";



export default function Home(props) {
  return (
    <Box gap='medium'>
      <Head>
        <title>Bubbly | HOME</title>
      </Head>
      <Grid
          rows={['small', 'small']}
          columns={['large', 'large']}
          gap="small"
          areas={[
              {name: 'left', start: [0, 1], end: [0, 1]},
              {name: 'right', start: [1, 1], end: [1, 1]},
          ]}
      >
          <CountsDataTable gridArea="right"/>
          <MyLineChart gridArea="left"/>
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