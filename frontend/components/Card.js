import {useState} from "react";
import { Card, CardHeader, CardBody, CardFooter, Heading, Button } from "grommet";

export function WelcomeCard(props) {
    const [count, setCount] =  useState(1);

    return (
        <Card>
            <CardHeader pad="medium" level="1" background="brand">
                <Heading level="1">Web Raccoons</Heading>
            </CardHeader>
            <CardBody pad="medium" >
                This is a smaple card using react, next.js and grommet!
            </CardBody>
            <CardBody pad="medium" >
                My count is {count}!
            </CardBody>
            <CardFooter justify="end" >
                <Button label="Click me" margin="small" onClick={() => setCount(count + 1)} />
            </CardFooter>
        </Card>
    )
}