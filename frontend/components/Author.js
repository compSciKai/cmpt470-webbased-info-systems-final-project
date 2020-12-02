import { Box, Text, Grid, Avatar} from "grommet";
import Link from 'next/link'
import { User } from 'grommet-icons'

export function Author(props) {
  // https://material.io/resources/icons/
  return (
    <Box direction="row" alignSelf="stretch" margin={`${props.margin}`}>
      
      <Box pad={{horizontal: "small"}}>
        <Avatar background="#555555">
          <User color="#ffffff"/>
        </Avatar>
      </Box>

      <Box direction="column">
        <Text size="large" alignSelf="start">
          {`${props.name}`}
        </Text>

        <Link size="xxsmall" href={`mailto:${props.email}`}>
          <a style={{color: "gray", fontSize: 13, alignSelf: "start"}}>
            {`${props.email}`}
          </a>
        </Link>
      </Box>
    </Box>
    
  )
}