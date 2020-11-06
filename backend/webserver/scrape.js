// Connects to the BC COVID-19 site and fetches data from it.
// http://www.bccdc.ca/health-info/diseases-conditions/covid-19/data
const axios = require('axios');

const NEW_TESTS_URL = 'https://services1.arcgis.com/xeMpV7tU1t4KD3Ei/arcgis/rest/services/BC_COVID19_Lab_Information/FeatureServer/0/query'

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
        this.covidData = []
    }

    // Simple Example Of Covid Data
    async find() {
        if (!this.covidData.length) {
            try {
                let attributes = (await axios.get(NEW_TESTS_URL, { params: this.params })).data['features']
                attributes.forEach(x => this.covidData.push(x.attributes))
            } catch (e) {
                return "Unable to query covid data"
            }
        }
        return this.covidData
    }
}

module.exports = ScrapeService;