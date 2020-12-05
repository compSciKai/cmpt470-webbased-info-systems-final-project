import { useState } from "react";
import { Menu, User } from 'grommet-icons';
import { Box, Button, Collapsible, Heading, Text, Main, Anchor } from 'grommet';
import Link from 'next/link'

export default function DefaultLayout(props) {
  const [nav, setNav] = useState(false);

  return (
    <Box fill>
      <Box
        as="header"
        direction="row"
        align="center"
        pad={{vertical: 'small', horizontal: 'medium'}}
        justify="between"
        background="brand"
        elevation="large"
        style={{zIndex: '1000'}}
      >
        <Heading level={3} margin="none" color="white">
        <Anchor href="/" size="xlarge" margin={{vertical:"10px"}} alignSelf="center" color={'white'}>BubbleBot</Anchor>
        </Heading>
        <Button onClick={() => setNav(!nav)}
          icon={<Menu color="white"/>}
        />
      </Box>
      <Box flex direction="row">
{/* Content */}
        <Box fill align="center" pad="small" >
          {props.children}
        </Box>
{/* Nav Bar */}
        <Collapsible direction="horizontal" open={nav}>
          <Box flex width="medium" background="light-2" pad="small" elevation="small" style={{zIndex: 100}}>
            <Anchor href="/bots" size="xlarge" margin={{vertical:"8px"}} alignSelf="end">BUBBLE BOTS</Anchor>
            <Anchor href="/covidInfo" size="xlarge" margin={{vertical:"8px"}} alignSelf="end">COVID INFO</Anchor>
            <Anchor href="/about" size="xlarge" margin={{vertical:"8px"}} alignSelf="end">ABOUT US</Anchor>
          </Box>
        </Collapsible>
      </Box>
    </Box>
  )
}