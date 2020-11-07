import {Box, Text} from "grommet";
import Head from 'next/head'
export default function About(props){
  return (
    <Box>
      <Head>
        <title>Bubbly | ABOUT</title> 
      </Head>
      <Text size="xlarge">About</Text>
    </Box>
  )
}