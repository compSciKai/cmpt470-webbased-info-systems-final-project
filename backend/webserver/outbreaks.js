const rp = require('request-promise');
const $ = require('cheerio')
const islandUrl = 'https://www.islandhealth.ca/learn-about-health/covid-19/outbreaks-and-exposures';
const fraserUrl = 'https://www.fraserhealth.ca/covid19exposure#.X8NHWGhKiHs';
const interiorUrl = 'https://news.interiorhealth.ca/news/public-exposures/'

let islandHeaders = [];
let islandOutbreaks = [];

let fraserHeaders = [];
let fraserOutbreaks = [];

let interiorHeaders = [];
let interiorOutbreaks = [];

rp(islandUrl)
  .then(function(html){
    //success!
    let columns = $('table:nth-child(11) > tbody > tr:nth-child(1)', html).children();
    columns.each((index, element) => {
      islandHeaders.push($(element).text().toLowerCase().trim().replace(/\s+/g, '_'));
    })
    let noOfColumns = columns.length;
    let cells = $('table:nth-child(11) > tbody > tr > td', html);
    fillOutBreaks(noOfColumns, cells, islandOutbreaks, islandHeaders);
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
    fillOutBreaks(noOfColumns, cells, fraserOutbreaks, fraserHeaders);
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
  fillOutBreaks(noOfColumns, cells, interiorOutbreaks, interiorHeaders);
  console.log(interiorOutbreaks);
})
.catch(function(err){
  //handle error
  if (err) throw err;
});

// A function to extract outbreak data from a health authority's outbreak table as objects
function fillOutBreaks(noOfColumns, cells, healthAuthorityOutbreaks, healthAuthorityHeaders){
  let j = 0;
  for(i = noOfColumns; i < cells.length; i+=noOfColumns){
    j = i;
    outbreak = {};
    for (const header of healthAuthorityHeaders){
      outbreak[header] = $(cells[j]).text().trim();
      j++;
    }
    healthAuthorityOutbreaks.push(outbreak);
  }
}