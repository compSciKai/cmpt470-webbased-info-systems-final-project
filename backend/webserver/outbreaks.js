const rp = require('request-promise');
const $ = require('cheerio')
const islandUrl = 'https://www.islandhealth.ca/learn-about-health/covid-19/outbreaks-and-exposures';
const fraserUrl = 'https://www.fraserhealth.ca/covid19exposure#.X8NHWGhKiHs';
const interiorUrl = 'https://news.interiorhealth.ca/news/public-exposures/';
const vchUrl = 'http://www.vch.ca/covid-19/public-exposures';
const northernUrl = 'https://www.northernhealth.ca/health-topics/public-exposures-and-outbreaks?keys=outbreaks#covid-19-communityfacility-outbreaks%23non-covid-19-communityfacility-outbreaks%23covid-19-school-exposures%23covid-19-communityfacility-outbreaks#covid-19-communityfacility-outbreaks#non-covid-19-communityfacility-outbreaks#covid-19-school-exposures#covid-19-public-exposures#covid-19-communityfacility-outbreaks';

// A function to extract outbreak data from a health authority's outbreak table as objects
function fillOutBreaks(start, noOfColumns, cells, healthAuthorityOutbreaks, healthAuthorityHeaders) {
  let j = 0;
  for(i = start; i < cells.length; i+=noOfColumns) {
    j = i;
    outbreak = {};
    for (const header of healthAuthorityHeaders){
      outbreak[header] = $(cells[j]).text().trim();
      j++;
    }
    healthAuthorityOutbreaks.push(outbreak);
  }
}

let islandHeaders = [];
let islandOutbreaks = [];

let fraserHeaders = [];
let fraserOutbreaks = [];

let interiorHeaders = [];
let interiorOutbreaks = [];

let vchHeaders = ['location', 'address', 'potential_exposure_date', 'potential_exposure_time'];
let vchOutbreaks = [];

let northernHeaders = [];
let northernOutbreaks = [];

class OutbreakService {
  constructor() {
    this.getInfo().then(() => {console.log("OutbreakService is active")});
  }

  async find(params) {
    //I moved getInfo to the constructor because whenever I refresh the request, it's going to unnecessarily call the scrapers again
    return [
      { name: "Fraser Health", outbreaks: fraserOutbreaks },
      { name: "VCH Health", outbreaks: vchOutbreaks },
      { name: "Island Health", outbreaks: islandOutbreaks },
      { name: "Interior Health", outbreaks: interiorOutbreaks},
      { name: "Northern Health", outbreaks: northernOutbreaks}
    ]
  }
  
  async scrapeFraser() {
    const html = await rp(fraserUrl);
    let columns = $('table:nth-child(13) > tbody > tr:nth-child(1)', html).children();
    columns.each((index, element) => {
      fraserHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_'));
    });
    let cells = $('table:nth-child(13) > tbody > tr > td', html);
    fillOutBreaks(columns.length, columns.length, cells, fraserOutbreaks, fraserHeaders);
  }

  async scrapeIsland(){
    const html = await rp(islandUrl);
    let columns = $('table:nth-child(12) > tbody > tr:nth-child(1)', html).children();
    columns.each((index, element) => {
      islandHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_'));
    })
    let cells = $('table:nth-child(12) > tbody > tr > td', html);
    fillOutBreaks(columns.length, columns.length, cells, islandOutbreaks, islandHeaders);
  }

  async scrapeInterior(){
    const html = await rp(interiorUrl);
    let columns = $('#tablepress-9 > tbody > tr:nth-child(1)', html).children();
    columns.each((index, element) => {
      interiorHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_'));
    })
    let cells = $('#tablepress-9 > tbody > tr > td', html);
    fillOutBreaks(columns.length, columns.length, cells, interiorOutbreaks, interiorHeaders);
  }

  async scrapeVCH(){
    const html = await rp(vchUrl);
    let temp = [];
    let previous = ''; // the name of the location is duplicated because the name is in two span elements
    let thing = $('#9184 > div > div:nth-child(1) > div > div span', html);
    thing.each((index, element) => {
      let str = $(element).text()
      if(str != '' && str != previous && str != 'Potential exposure date(s): '){
        if (str.includes('Address: ')){
          str = str.replace('Address: ','');
        }else if(str.includes('Potential exposure time: ')){
          str = str.replace('Potential exposure time: ','');
        }
        temp.push(str);
        previous = str;
      }
    })
    for(let i=0; i<(temp.length/4); i++){
      let j = i;
      let outbreak = {}; 
      for(const header of vchHeaders){
        outbreak[header] = temp[j];
        j++;
      }
      vchOutbreaks.push(outbreak);
    }
  }

  async scrapeNorthern(){
    const html = await rp(northernUrl);
    let columns = $(`#block-northern-health-mainpagecontent--2 > article > div > div > div:nth-child(1) > div > div > div:nth-child(2) >
    div > div.clearfix.text-formatted.field.field--name-field-body.field--type-text-long.field--label-hidden.field__item
      > table > thead > tr > th`, html);
    columns.each((index, element) => {
      northernHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_').replace('/','_').replace(':','').replace('(s)',''));
    });
    let cells = $(`#block-northern-health-mainpagecontent--2 > article > div > div > div:nth-child(1) > div > div > div:nth-child(2) >
    div > div.clearfix.text-formatted.field.field--name-field-body.field--type-text-long.field--label-hidden.field__item
    > table > tbody > tr > td`, html);
    fillOutBreaks(0, columns.length, cells, northernOutbreaks, northernHeaders);
  }

  async getInfo() {
    try {
      await this.scrapeIsland();
      await this.scrapeFraser();
      await this.scrapeInterior();
      await this.scrapeVCH();
      await this.scrapeNorthern();
    } catch (e) {
      console.log(e);
    }
  }

    // rp(northernUrl)
    // .then(function(html) {
    //   let columns = $(`#block-northern-health-mainpagecontent--2 > article > div > div > div:nth-child(1) > div > div > div:nth-child(2) >
    //   div > div.clearfix.text-formatted.field.field--name-field-body.field--type-text-long.field--label-hidden.field__item
    //     > table > thead > tr > th`, html);
    //   columns.each((index, element) => {
    //     northernHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_').replace('/','_').replace(':','').replace('(s)',''));
    //   });
    //   let noOfColumns = columns.length;
    //   let cells = $(`#block-northern-health-mainpagecontent--2 > article > div > div > div:nth-child(1) > div > div > div:nth-child(2) >
    //   div > div.clearfix.text-formatted.field.field--name-field-body.field--type-text-long.field--label-hidden.field__item
    //   > table > tbody > tr > td`, html);
    //   fillOutBreaks(0, noOfColumns, cells, northernOutbreaks, northernHeaders);
    //   console.log('------------------Northern------------------');
    //   console.log(northernOutbreaks);
    // })
    // .catch(function(err){
    //   //handle error
    //   if (err) throw err;
    // });
}


module.exports = {
  OutbreakService: OutbreakService
}
