import {Box, Text, Tab, Tabs} from "grommet";
import Head from 'next/head'
import {BotDetails} from "../components/BotDetails"
export default function Bots(props){
  return (
    <Box background="white" width="80%">
      <Head>
        <title>Bubbly | BUBBLE BOTS</title> 
      </Head>
      <Text alignSelf="center" size="xlarge" margin={{"vertical": "small"}}>Bubble Bots</Text>
      <Text margin={{"horizontal": "20px"}}>At the moment, only Facebook Messenger bot is supported</Text>
      <BotDetails botName="Facebook Messenger" linkToBot="m.me/117136746856965"/>
    </Box>
  )
}