import {Grid, Button, Carousel, Image, Box} from 'grommet';
export function BotDetails(props){
  return(
    <Box direction="row">
      <Box width="35%" margin={{"horizontal": "20px"}}>
        <Carousel margin="10px" fill>
          <img src='/demo4.gif'style={{"width": "100%"}}/>
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Carousel>
        <Button justify="center" primary margin="10px" label={`Get ${props.botName} bot today!`} href="https://m.me/117136746856965"></Button> 
      </Box>
      <Box width="55%" margin={{"left": "10px", "right": "20px"}}>Hello!</Box>
    </Box>
  )
}