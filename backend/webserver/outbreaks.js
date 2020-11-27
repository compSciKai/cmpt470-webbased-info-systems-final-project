const rp = require('request-promise');
const $ = require('cheerio')
const islandUrl = 'https://www.islandhealth.ca/learn-about-health/covid-19/outbreaks-and-exposures';

let islandHeaders = ["Location", "Date"];
let islandOutbreaks = [];

let fraserHeaders = ["Community", "Location", "Address", "Date", "Times", "Additional Notes"];
let fraserOutbreaks = [];

rp(islandUrl)
  .then(function(html){
    //success!
    const cells = $('table:nth-child(11) > tbody > tr > td', html);
    for(i = 3; i < cells.length; i+=3){
      islandOutbreaks.push({
        location: $(cells[i]).text(),
        date: $(cells[i+2]).text() 
      });
    }
    console.log(islandOutbreaks);
  })
  .catch(function(err){
    //handle error
    if (err) throw err;
  });



