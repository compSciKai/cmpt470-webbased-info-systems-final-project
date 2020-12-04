import { Box, Text, Grid} from "grommet";
import { MyLineChart } from "../components/Chart";
import { MyOutbreakCards } from "../components/Outbreak";
import { Counts, HospitalCount } from "../components/Counts";
import Head from 'next/head';
import { CountsDataTable, TestingLocationDataTable } from "../components/DataTables";



export default function Home(props) {
  return (
    <Box gap='medium' align="center">
      <Head>
        <title>Bubbly | HOME</title>
      </Head>
      {/*<TestingLocationDataTable/>*/}
      {/* 
          <Box gridArea='specific'pad="small" background="dark-3" /> */}
      <Grid columns={['x-large']}
            rows={['0', 'small']}
            areas={[
              {name: 'overall', start:[0,0], end:[1, 0]},
              {name: 'other', start:[1,0], end:[1, 0]}
            ]}
            gap="small"
      >
            <Counts gridArea='overall' background="dark-1" />
      </Grid>
      <Grid columns={['medium', 'large']}
            rows={['0', 'medium']}
            areas={[
              {name: 'table', start:[0,0], end:[1, 0]},
              {name: 'line', start:[1,0], end:[1, 0]},
            ]}
            gap="small"
      >
            <CountsDataTable gridArea='table'/>
            <MyLineChart gridArea='line'/>
      </Grid>
      <MyOutbreakCards/>
    </Box>
  )
}