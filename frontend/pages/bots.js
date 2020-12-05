import {Box, Text, Tab, Tabs} from "grommet";
import Head from 'next/head'
import {BotDetails} from "../components/BotDetails"
export default function Bots(props){
  return (
    <Box background="white">
      <Head>
        <title>Bubbly | BUBBLE BOTS</title> 
      </Head>
      <Text alignSelf="center" size="xlarge" margin={{"vertical": "small"}}>Bubble Bots</Text>
      <Text alignSelf="center">At the moment, only Facebook Messenger bot is supported.</Text>
      <BotDetails botName="Facebook Messenger" linkToBot="m.me/117136746856965"/>
    </Box>
  )
}