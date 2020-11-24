import { Box, Text, Grid, Avatar} from "grommet";
import Link from 'next/link'
import { User } from 'grommet-icons'

export function Author(props) {
  // https://material.io/resources/icons/
  return (
    <Box direction="row" alignSelf="stretch">
      <Avatar background="#555555">
        <User color="#ffffff"/>
      </Avatar>
      <Box direction="column" margin={`${props.margin}`}>
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