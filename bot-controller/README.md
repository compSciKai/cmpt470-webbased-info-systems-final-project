## Bot Test Environment

### `npm install`

^ to download dependencies

### `npm run -- --console`

^ to interact with bot through the console (for testing)

### `npm run dev`

^ to generate development webhooks

## To Set up Facebook Messenger Test Environment

### `npx bottender messenger webhook set`

^ to tell Facebook where your server webhook is located

Go to https://www.facebook.com/SFU-Computing-470-Final-Project-117136746856965
To interact with Facebook Messenger Bot.

## To Set up Whatsapp Test Environment

Must manually set webhooks in https://www.twilio.com/console

To Set up Whatsapp webhook test environment:
- Go to https://www.twilio.com/
- Login: kseaman@sfu.ca
- Pass: qCyDu8rjEptND2M
- Click: All Products & Services > Programmable Messaging > Settings > Whatsapp Sandbox 
  Settings 
- paste webhook URL in \<when a message comes in\> & \<status callback url\>

Install whatsapp & send "join most-trace" to 14155238886 and then interact with
Whatsapp Bot. 


## Bot Logic Configuration

### The `bottender.config.js` File

Bottender configuration file. You can use this file to provide settings for the session store and channels.

### The `.env` File

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) package to load your environment variables when developing your app.

To make the bot work, you must put required environment variables into your `.env` file.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.<br>
The bot will automatically reload if you make changes to the code.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000) and ngrok runs on [http://localhost:4040](http://localhost:4040).

To run in [Console Mode](https://bottender.js.org/docs/en/the-basics-console-mode), provide the `--console` option:

```sh
npm run dev -- --console
yarn dev --console
```

### `npm start`

Runs the app in production mode.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000).

To run in [Console Mode](https://bottender.js.org/docs/en/the-basics-console-mode), provide the `--console` option:

```sh
npm start -- --console
yarn start --console
```

### `npm run lint`

Runs the linter rules using [Eslint](https://eslint.org/).

### `npm test`

Runs the test cases using [Jest](https://jestjs.io/).

## Learn More

To learn Bottender, check out the [Bottender documentation](https://bottender.js.org/docs/en/getting-started).

For more examples, see [Bottender examples](https://github.com/Yoctol/bottender/tree/master/examples).
