import {Main, Button, Carousel, Image} from 'grommet'
export function BotDetails(props){
  return(
    <Main align="center">
      <Carousel margin="10px" fill>
        <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
        <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
        <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
      </Carousel>
      <Button primary margin="10px" label={`Get ${props.botName} bot today!`}></Button> 
    </Main>
  )
}