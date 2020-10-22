import { Distribution, Box, Text} from "grommet";
import { WelcomeCard } from "../components/Card";
import { MyLineChart } from "../components/Chart";


export default function Home() {
    return (
        // <div style={{height: "50vh"}}>
        //     <WelcomeCard style={{width: "400px"}}/>
        //     <MyLineChart />
        //     <Distribution fill={true}
        //                   values={[
        //                       { value: 50, color: 'light-3' },
        //                       { value: 30, color: 'brand' },
        //                       { value: 20, color: 'graph-0' },
        //                       { value: 10, color: 'light-3' },
        //                       { value: 5, color: 'brand' },
        //                   ]}
        //     >
        //         {value => (
        //             <Box pad="small" background={value.color} fill>
        //                 <Text size="large">{value.value}</Text>
        //             </Box>
        //         )}
        //     </Distribution>
        // </div>
        <div>I AM INDEX</div>

    )
}

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}