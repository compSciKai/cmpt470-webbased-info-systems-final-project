import {Grid, Button, Carousel, Image, Box} from 'grommet';
export function BotDetails(props){
  return(
    <Box width="35%" alignSelf="center" margin={{"horizontal": "20px"}} pad="20px">
      <img src='/demo4.gif'style={{"width": "100%"}} />
      <Button justify="center" primary margin="10px" label={`Get ${props.botName} bot today!`} href="https://m.me/117136746856965"></Button> 
    </Box>
  )
}