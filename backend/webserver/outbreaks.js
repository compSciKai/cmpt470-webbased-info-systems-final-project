const rp = require('request-promise');
const $ = require('cheerio')
const islandUrl = 'https://www.islandhealth.ca/learn-about-health/covid-19/outbreaks-and-exposures';
const fraserUrl = 'https://www.fraserhealth.ca/covid19exposure#.X8NHWGhKiHs';
const interiorUrl = 'https://news.interiorhealth.ca/news/public-exposures/';
const vchUrl = 'http://www.vch.ca/covid-19/public-exposures';
const northernUrl = 'https://www.northernhealth.ca/health-topics/public-exposures-and-outbreaks?keys=outbreaks#covid-19-communityfacility-outbreaks%23non-covid-19-communityfacility-outbreaks%23covid-19-school-exposures%23covid-19-communityfacility-outbreaks#covid-19-communityfacility-outbreaks#non-covid-19-communityfacility-outbreaks#covid-19-school-exposures#covid-19-public-exposures#covid-19-communityfacility-outbreaks';

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

rp(islandUrl)
  .then(function(html){
    //success!
    let columns = $('table:nth-child(12) > tbody > tr:nth-child(1)', html).children();
    columns.each((index, element) => {
      islandHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_'));
    })
    let noOfColumns = columns.length;
    let cells = $('table:nth-child(12) > tbody > tr > td', html);
    fillOutBreaks(noOfColumns, noOfColumns, cells, islandOutbreaks, islandHeaders);
    console.log('------------------Island------------------')
    console.log(islandOutbreaks);
  })
  .catch(function(err){
    //handle error
    if (err) throw err;
  });

rp(fraserUrl)
  .then(function(html) {
    let columns = $('table:nth-child(13) > tbody > tr:nth-child(1)', html).children();
    columns.each((index, element) => {
      fraserHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_'));
    });
    let noOfColumns = columns.length;
    let cells = $('table:nth-child(13) > tbody > tr > td', html);
    fillOutBreaks(noOfColumns, noOfColumns, cells, fraserOutbreaks, fraserHeaders);
    console.log('------------------Fraser------------------')
    console.log(fraserOutbreaks);
  })
  .catch(function(err){
    //handle error
    if (err) throw err;
  });

rp(interiorUrl)
.then(function(html){
  console.log('------------------Interior------------------')
  //success!
  let columns = $('#tablepress-9 > tbody > tr:nth-child(1)', html).children();
  columns.each((index, element) => {
    interiorHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_'));
  })
  let noOfColumns = columns.length;
  let cells = $('#tablepress-9 > tbody > tr > td', html);
  fillOutBreaks(noOfColumns, noOfColumns, cells, interiorOutbreaks, interiorHeaders);
  console.log(interiorOutbreaks);
})
.catch(function(err){
  //handle error
  if (err) throw err;
});

rp(vchUrl)
  .then((html) => {
    let temp = [];
    let previous = ''; // the name of the location is duplicated because the name is in two span elements
    console.log('------------------VCH------------------')
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
    console.log(vchOutbreaks);
  })
  .catch((err) => {
    //handle error
    if (err) throw err;
  });

  rp(northernUrl)
  .then(function(html) {
    let columns = $(`#block-northern-health-mainpagecontent--2 > article > div > div > div:nth-child(1) > div > div > div:nth-child(2) >
     div > div.clearfix.text-formatted.field.field--name-field-body.field--type-text-long.field--label-hidden.field__item
      > table > thead > tr > th`, html);
    columns.each((index, element) => {
      northernHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_').replace('/','_').replace(':','').replace('(s)',''));
    });
    let noOfColumns = columns.length;
    let cells = $(`#block-northern-health-mainpagecontent--2 > article > div > div > div:nth-child(1) > div > div > div:nth-child(2) >
    div > div.clearfix.text-formatted.field.field--name-field-body.field--type-text-long.field--label-hidden.field__item
     > table > tbody > tr > td`, html);
    fillOutBreaks(0, noOfColumns, cells, northernOutbreaks, northernHeaders);
    console.log('------------------Northern------------------');
    console.log(northernOutbreaks);
  })
  .catch(function(err){
    //handle error
    if (err) throw err;
  });
// A function to extract outbreak data from a health authority's outbreak table as objects
function fillOutBreaks(start, noOfColumns, cells, healthAuthorityOutbreaks, healthAuthorityHeaders){
  let j = 0;
  for(i = start; i < cells.length; i+=noOfColumns){
    j = i;
    outbreak = {};
    for (const header of healthAuthorityHeaders){
      outbreak[header] = $(cells[j]).text().trim();
      j++;
    }
    healthAuthorityOutbreaks.push(outbreak);
  }
}