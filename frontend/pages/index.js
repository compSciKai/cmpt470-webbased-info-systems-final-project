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
      <Grid fill="true" margin={{"vertical": "xxsmall"}}>
        <Counts gridArea='overall' background="dark-1" />
      </Grid>
      <Grid columns={['medium', 'large']}
            rows={['0', 'medium']}
            areas={[
              {name: 'table', start:[0,0], end:[1, 0]},
              {name: 'line', start:[1,0], end:[1, 0]},
            ]}
            gap={{"column":"medium"}}
            margin={{"bottom":"small"}}
            justify="stretch"
            fill="horizontal"
      >
            <CountsDataTable gridArea='table'/>
            <MyLineChart gridArea='line'/>
      </Grid>
      <MyOutbreakCards/>
    </Box>
  )
}