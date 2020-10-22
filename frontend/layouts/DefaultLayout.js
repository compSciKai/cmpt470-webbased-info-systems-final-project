import { useState } from "react";
import { Notification } from 'grommet-icons';
import { Box, Button, Collapsible, Heading, Text } from 'grommet';

export function DefaultLayout(props) {
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
          <strong>Bubbly</strong>
        </Heading>
        <Button onClick={() => setNav(!nav)}
          icon={<Notification color="white"/>}
        />
      </Box>
      <Box flex direction="row">
{/* Content */}
        <Box flex align="center" justify="center">
          {props.children}
        </Box>
{/* Nav Bar */}
        <Collapsible direction="horizontal" open={nav}>
          <Box flex width="medium" background="light-2" pad="small" elevation="small">
            <Text size="xlarge">Nav Bar</Text>
          </Box>
        </Collapsible>
      </Box>
    </Box>
  )
}