import {Box, Text, Tab, Tabs} from "grommet";
import Head from 'next/head'
import {BotDetails} from "../components/BotDetails"
export default function Bots(props){
  return (
    <Box >
      <Head>
        <title>Bubbly | Bots</title> 
      </Head>
      <Text alignSelf="center" size="xlarge">Bots page</Text>
      <Tabs>
        <Tab title="Discord">
          <BotDetails botName="Discord" linkToBot="/"/>
        </Tab>
        <Tab title="Whatsapp">
          <BotDetails botName="Whatsapp" linkToBot="/"/>
        </Tab>
        <Tab title="Facebook Messenger">
          <BotDetails botName="Facebook Messenger" linkToBot="/"/>
        </Tab>
      </Tabs>
    </Box>
  )
}