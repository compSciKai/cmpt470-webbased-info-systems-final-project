// Connects to the BC COVID-19 site and fetches data from it.
// http://www.bccdc.ca/health-info/diseases-conditions/covid-19/data
const axios = require('axios');

const NEW_TESTS_URL = 'https://services1.arcgis.com/xeMpV7tU1t4KD3Ei/arcgis/rest/services/BC_COVID19_Lab_Information/FeatureServer/0/query'
const DAILY_RATES_URL = 'https://services1.arcgis.com/xeMpV7tU1t4KD3Ei/ArcGIS/rest/services/COVID19_Cases_by_BC_Health_Authority/FeatureServer/0/query'

class ScrapeService {

    // Structure of this class is TBD
    // Connects to the BC COVID-19 data URL and fetches the data.
    // Processing the data into something more usable may be done in this class, someplace else on the server, or the client (undecided)
    constructor(db) {
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

        this.cacheLifetimeInMs = 24*60*60*1000;
        this.db = db;
        this.labData = []
        this.dailyRates = []
    }

    async find2(params) {
        // DB Cache Format: {queryType: <string>, timestamp: <number-unixtime>, data: <json-string>}

        // Query DB's "cache" table for `params.query.type`
        // If something is returned
        //     If timestamp is under a day in the past
        //         Use the retrieved data
        // Else (nothing returned, or cache is too old)
        //     Scrape normally
        //     Write the `params.query.type` + scrape result + current time to "cache" table

        if (params !== null) {
            this.db.getTable('cache', {"queryType": `${params.query.type}`}, function(result) {
                console.log(result)
                
                // The data is recent. Use it
                if (result !== [] && (Date.now() - result.timestamp) < this.cacheLifetimeInMs) {
                    return result.data
                }

                // The data is not recent.
                var newData = find(params)
                if (result !== []) {
                    // Data exists for params.query.type, so send an update
                }
                else {
                    // Data doesn't exist for params.query.type, so send an insert
                }
                return newData;
            })
        }
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

module.exports = {
    ScrapeService: ScrapeService
}
