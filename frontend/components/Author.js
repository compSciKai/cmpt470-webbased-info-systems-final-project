import { Box, Text, Grid} from "grommet";
import Link from 'next/link'

export function Author(props) {
  return (
    <Box margin={`${props.margin}`}>
      <Text size="large" alignSelf="center">
        {`${props.name}`}
      </Text>

      <Link size="xxsmall" href={`mailto:${props.email}`}>
        <a style={{color: "gray", fontSize: 13, alignSelf: "center"}}>
          {`${props.email}`}
        </a>
      </Link>
    </Box>
  )
}