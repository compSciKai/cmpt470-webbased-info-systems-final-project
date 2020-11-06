// Connects to the BC COVID-19 site and fetches data from it.
// http://www.bccdc.ca/health-info/diseases-conditions/covid-19/data
const axios = require('axios');

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
        if (params.query.type === 'lab') {
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

module.exports = ScrapeService;