import { Distribution, Box, Text, Grid} from "grommet";
import { MyLineChart } from "../components/Chart";
import { Counts } from "../components/Counts";
import { CountsDataTable } from "../components/CountsDataTable";



export default function Home(props) {
  return (
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
  )
}