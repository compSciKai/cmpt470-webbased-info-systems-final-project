const { router, text } = require('bottender/router');
const { ScrapeService } = require('../../backend/webserver/scrape.js');
const axios = require('axios');

/*
const NEW_TESTS_URL = 'https://services1.arcgis.com/xeMpV7tU1t4KD3Ei/arcgis/rest/services/BC_COVID19_Lab_Information/FeatureServer/0/query'
const DAILY_RATES_URL = 'https://services1.arcgis.com/xeMpV7tU1t4KD3Ei/ArcGIS/rest/services/COVID19_Cases_by_BC_Health_Authority/FeatureServer/0/query'

class ScrapeService {

    // Structure of this class is TBD
    // Connects to the BC COVID-19 data URL and fetches the data.
    // Processing the data into something more usable may be done in this class, someplace else on the server, or the client (undecided)
    constructor() {
        this.params = {
            f: 'json',
            where: "Region<>'BC'",
            outFields: '*',
            orderByFields: 'Date desc',
            resultRecordCount: 32000,
            resultOffset: 0
        }

        this.dailyRatesParams = {
            f: 'json',
            where: "1=1",
            outFields: '*',
            orderByFields: 'Cases desc',
            resultRecordCount: 4000,
            resultOffset: 0,
            returnGeometry: false,
        }

        this.labData = []
        this.dailyRates = []
    }

    // Simple Example Of Covid Data
    async find(params) {
        if (params && params.query.type === 'lab') {
            if (!this.labData.length) {
                try {
                    let attributes = (await axios.get(NEW_TESTS_URL, {params: this.params})).data['features']
                    attributes.forEach(x => this.labData.push(x.attributes))
                } catch (e) {
                    return "Unable to query lab data"
                }
            }

            return this.labData
        } else {
            if (!this.dailyRates.length) {
                try {
                    let attributes = (await axios.get(DAILY_RATES_URL, {params: this.dailyRatesParams})).data['features']
                    attributes.forEach(x => this.dailyRates.push(x.attributes))
                } catch (e) {
                    console.log(e)
                    return "Unable to query rates data"
                }
            }

            return this.dailyRates
        }
    }
}

*/


async function SayHi(context) {
  await context.sendText('Hi!');
}

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function displayData(context) {
  let scrape = new ScrapeService();
  await scrape.find();
  var text_arr = [];
  text_arr.push('New & Active Cases in BC:\n');
  scrape.dailyRates.forEach(element => {
    text_arr.push(element.HA_Name);
    text_arr.push('new: ' + element.NewCases + ' active: ' + element.ActiveCases
                 + '\n');
  });
  text_arr.push('last updated:\n' + new Date(scrape.dailyRates[0].Date_Updat).toString());
  //console.log(new Date(scrape.dailyRates[0].Date_Updat).toString());
  //console.log(scrape.dailyRates)
  //await context.sendText('data shown here!');
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

