import { Distribution, Box, Text, Grid} from "grommet";
import { WelcomeCard } from "../components/Card";
import { MyLineChart } from "../components/Chart";
import { Counts } from "../components/Counts";
import Head from 'next/head';

export default function Home(props) {
  return (
    <Box gap='medium'>
      <Head>
        <title>Bubbly | HOME</title> 
      </Head>
      <Counts pad />
      <MyLineChart gridArea="nav" background="light-5" />
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