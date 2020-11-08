const { router, text } = require('bottender/router');
const { ScrapeService } = require('../../backend/webserver/scrape');
const axios = require('axios');

async function SayHi(context) {
  await context.sendText('Hi!');
}

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function displayData(context) {
  let scrape = new ScrapeService;
  await scrape.find();
  var text_arr = [];
  text_arr.push('New & Active Cases in BC:\n');
  scrape.dailyRates.forEach(element => {
    text_arr.push(element.HA_Name);
    text_arr.push('new: ' + element.NewCases + ' active: ' + element.ActiveCases
                 + '\n');
  });
  text_arr.push('last updated:\n' + new Date(scrape.dailyRates[0].Date_Updat).toString());
  await context.sendText(`${text_arr.join('\n')}`);
}

module.exports = async function App() {
  return router([
    // return the `SayHi` action when receiving "hi" text messages
    text(['hi', 'hola'], SayHi),
    // return the `SayHello` action when receiving "hello" text messages
    text('hello', SayHello),
    // return the `displayData` action when receiving "data" text messages
    text('data', displayData),
  ]);
}

