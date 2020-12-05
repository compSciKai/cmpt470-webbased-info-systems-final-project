import {Grid, Button, Carousel, Image, Box} from 'grommet'
export function BotDetails(props){
  return(

    <Box gridArea="present" alignSelf="center">
      <Button primary margin="10px" label={`Get ${props.botName} bot today!`} href="https://m.me/117136746856965"></Button> 
    </Box>
    
  )
}