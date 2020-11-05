import { useState } from "react";
import { Menu } from 'grommet-icons';
import { Box, Button, Collapsible, Heading, Text, Main } from 'grommet';

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
          icon={<Menu color="white"/>}
        />
      </Box>
      <Box flex direction="row">
{/* Content */}
        <Box fill align="center" pad="medium">
          {props.children}
        </Box>
{/* Nav Bar */}
        <Collapsible direction="horizontal" open={nav}>
          <Box flex width="medium" background="light-2" pad="small" elevation="small">
            <Text size="xlarge">TODO ADD ICONS</Text>
          </Box>
        </Collapsible>
      </Box>
    </Box>
  )
}