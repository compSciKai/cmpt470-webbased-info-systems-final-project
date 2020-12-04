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

        this.cacheLifetimeInMs = 12*60*60*1000; // About 12 hours
        this.db = db;
        this.labData = []
        this.dailyRates = []
        this.totals = []
    }

    clearCache() {
        console.log("Clearing cache on DB")
        this.db.clearTable('cache', function(r) {})
    }

    fetchData(req, res, next) {
        // DB Cache Format: {queryType: <string>, timestamp: <number-unixtime>, data: <json-string>}

        // Query DB's "cache" table for `params.query.type`
        // If something is returned
        //     If timestamp is NOT older than cacheLifetimeInMs
        //         Use the retrieved data
        // Else (nothing returned, or cache is too old)
        //     Scrape normally
        //     Write the `params.query.type` + scrape result + current time to "cache" table

        if (req.query !== null) {
            this.db.getTable('cache', {queryType: {$eq: `${req.query.type}`}}, initialQResult => {
                // initialQResult is an array of items that match the query. Should just be 0 or 1 in our case.
                this.cacheCheck(initialQResult, req, dataToReturn => {
                    res.set('Content-Type', 'application/json')
                    res.send(dataToReturn)
                })
            })
        }
    }

    // Checks the cache and updates/inserts for a certain params.query.type if required depending on the matchingResults argument.
    // In either case, cached or new data is sent to the callback.
    async cacheCheck(matchingResults, params, callback) {
        var qType = params.query.type;
        
        // matchingResults is an array
        if (matchingResults.length > 0) {
            var timeDiff = Date.now() - matchingResults[0].timestamp
            console.log(`${qType} data cache in DB is about ${Math.trunc(timeDiff / 1000 / 60)} minutes old (cache timestamp=${matchingResults[0].timestamp}).`)

            if (timeDiff < this.cacheLifetimeInMs) {
                // The data is recent. Use it

                console.log(`Cached ${qType} data will be returned`)
                callback(matchingResults[0].data)
                return
            }
        }

        // The data is not recent or doesn't even exist
        var newData = await this.scrape(params)
        var ts = Date.now()
        if (matchingResults.length > 0) {
            // Data already exists for params.query.type, so send an update
            this.db.updateTable('cache', {queryType: {$eq: `${qType}`}}, {queryType: `${qType}`, timestamp: ts, data: newData}, r => console.log(`Updated new ${qType} data at time=${ts}`))
        }
        else {
            // Data doesn't exist for params.query.type, so send an insert
            this.db.saveToTable('cache', [{queryType: `${qType}`, timestamp: ts, data: newData}], r => console.log(`Inserted new ${qType} data at time=${ts}`))
        }
        console.log(`New ${qType} data will be returned`)
        callback(newData)
    }

    // Simple Example Of Covid Data
    async scrape(params) {
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
        } else if (params && params.query.type ==='dailyrates'){
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
        } else if (params && params.query.type === 'totals') {
            try {
                let attributes = (await axios.get(DAILY_RATES_URL, {params: this.dailyRatesParams})).data['features']
                let totals = {
                    totalCases: 0,
                    newCases: 0,
                    totalDeaths: 0,
                    currICU: 0,
                    currHosp: 0,
                    activeCases: 0,
                    recovered: 0
                }

                attributes.forEach(x => {
                    totals.totalCases += x.attributes.Cases
                    totals.newCases += x.attributes.NewCases
                    totals.totalDeaths += x.attributes.Deaths
                    totals.currHosp += x.attributes.CurrentlyHosp
                    totals.currICU += x.attributes.CurrentlyICU
                    totals.recovered += x.attributes.Recovered
                    totals.activeCases += x.attributes.ActiveCases
                })

                this.totals = [
                  {name: 'Total Cases', value: totals.totalCases},
                  {name: 'New Cases', value: totals.newCases},
                  {name: 'Total Deaths', value: totals.totalDeaths},
                  {name: 'Hospitalized', value: totals.currHosp},
                  {name: 'In ICU', value: totals.currICU},
                  {name: 'Active Cases', value: totals.activeCases},
                  {name: 'Total Recovered', value: totals.recovered},
                ]

            } catch (e) {
                console.log(e)
                return "Unable to query rates data"
            }

            return this.totals
        } else {
            return "Unable to query unspecified data"
        }
    }
}

module.exports = {
    ScrapeService: ScrapeService
}
