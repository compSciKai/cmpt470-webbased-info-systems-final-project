import {Grid, Button, Carousel, Image, Box} from 'grommet'
export function BotDetails(props){
  return(
    <Grid 
          rows={['medium', 'large']}
          columns={['medium', 'large']}
          margin="small"
          gap="medium"
          areas={[
            { name: "present", start: [0, 0], end: [1, 0] },
            { name: "instruction", start: [1, 0], end: [1, 0] },
          ]}>
      <Box gridArea="present">
        <Carousel margin="10px" fill>
          <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Carousel>
        <Button primary margin="10px" label={`Get ${props.botName} bot today!`}></Button> 
      </Box>
      <Box gridArea="instruction">Hello!</Box>
    </Grid>
  )
}