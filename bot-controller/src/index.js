const { router, text, payload } = require('bottender/router');
const axios = require('axios');
const { getHealthAuth } = require('../health_boundaries');
const obs = require('../../backend/webserver/outbreaks');

async function template(context) {
    await context.sendButtonTemplate('What do you want to do next?', [
      {
        type: 'postback',
        title: 'Option 1',
        payload: 'OPTION_1'
      },
      {
        type: 'postback',
        title: 'Option 2',
        payload: 'OPTION_2',
      },
    ]);
}


async function SayHi(context) {
  await context.sendText('Hi!');
}

async function SayHello(context) {
  await context.sendText('Hello!');
}

async function getStatsHa(context) {
    await context.sendButtonTemplate('For which Area?', [
        {
          type: 'postback',
          title: 'Metro Vancouver',
          payload: 'GET_HA_VCH_FRA',
        },
        {
          type: 'postback',
          title: 'BC Interior',
          payload: 'GET_HA_INTERIOR',
        },
        {
          type: 'postback',
          title: 'Vancouver Island',
          payload: 'GET_HA_VAN_I',
        },
      ]);
}

async function getStatsVan(context) {
    await context.sendButtonTemplate('For Vancouver Coastal Health or Fraser Health?', [
        {
          type: 'postback',
          title: 'Vancouver Coastal',
          payload: 'GET_HA_VCH',
        },
        {
          type: 'postback',
          title: 'Fraser Health',
          payload: 'GET_HA_FRASER',
        },
      ]);
}

async function getAllOutbreaks(context) {
    await context.sendButtonTemplate('For which Area?', [
        {
          type: 'postback',
          title: 'Metro Vancouver',
          payload: 'VCH_FRA',
        },
        {
          type: 'postback',
          title: 'BC Interior',
          payload: 'INTERIOR',
        },
        {
          type: 'postback',
          title: 'Vancouver Island',
          payload: 'VAN_I',
        },
      ]);
}

async function getVanOutbreaks(context) {
    await context.sendButtonTemplate('For Vancouver Coastal Health or Fraser Health?', [
        {
          type: 'postback',
          title: 'Vancouver Coastal',
          payload: 'VCH',
        },
        {
          type: 'postback',
          title: 'Fraser Health',
          payload: 'FRASER',
        },
      ]);
}

async function getOutbreaks(context, location) {
  try {
    const apiUrl = 'http://localhost:1234/outbreaks';
    let outbreaks = (await axios.get(apiUrl)).data;
    //console.log(outbreaks[0]);
    location = String(location).toLowerCase();
    // create links between outbreak service names, and health_boundaries names
    let has = ['vancouver coastal', 'vancouver island', 'interior', 'fraser'];
    let obs_has = {'vancouver coastal':'VCH Health', 'vancouver island':'Island Health',
        'interior':'Interior Health', 'fraser':'Fraser Health'};
    // if location is ha
    if (has.includes(location)) {
        // list all outbreaks in that ha
        console.log('ha found from message...');
        var text_arr = [];
        text_arr.push('Most recent outbreaks in ' + obs_has[location] + ': \n');
        var outbreak_ha;
        outbreaks.forEach(el => {
            if (el.name == obs_has[location]) {
                console.log('ha found from obs data...');
                outbreak_ha = el;
                console.log(outbreak_ha);
            }
        });
        outbreak_ha.outbreaks.forEach(el => {
          text_arr.push('City: ' + el.community);
          text_arr.push('Name: ' + el.location);
          text_arr.push('Address: ' + el.address);
          text_arr.push('Date: ' + el.date + '\n');
        });
        // share link at end
        text_arr.push('Find more outbreak info in ' + obs_has[location] + ' here:');
        text_arr.push(outbreak_ha.url);
        await context.sendText(`${text_arr.join('\n')}`);
    }
    // else location is a city/community
    else {
        console.log('city found from message: ' + location);
        let haOfLocation = String(getHealthAuth(location)).toLowerCase();
        //console.log('ha of city is: ' + haOfLocation);
        var text_arr = [];
        var outbreak_ha;
        // filter data by ha
        outbreaks.forEach(el => {
            //console.log('el.name: ' + el.name + ', obs_has[haOfLocation]: ' + obs_has[haOfLocation]);
            if (el.name == obs_has[haOfLocation]) {
                console.log('ha found from obs data...');
                outbreak_ha = el;
                //console.log(outbreak_ha);
            }
        });
        text_arr.push('Most recent outbreaks in ' + location + ': \n');
        outbreak_ha.outbreaks.forEach(el => {
            if (String(el.community).toLowerCase() == location) {
                console.log('city found from obs data...');
                text_arr.push('City: ' + el.community);
                text_arr.push('Name: ' + el.location);
                text_arr.push('Address: ' + el.address);
                text_arr.push('Date: ' + el.date + '\n');
            }
        });
        // check if any outbreaks found in that city
        if (text_arr.length == 1) {
            text_arr[0] = 'No outbreaks found in ' + location + ' recently\n';
        }
        // share link at end
        text_arr.push('Find more outbreak info in ' + obs_has[haOfLocation] + ' here:');
        text_arr.push(outbreak_ha.url);
        await context.sendText(`${text_arr.join('\n')}`);
    }
  } catch (e) {
    console.log(e)
  }
}

async function displayData_wrapper(context) {
    /*
    payload('GET_TOTALS', displayData_wrapper),
    payload('GET_HA_VCH', displayData_wrapper),
    payload('GET_HA_INTERIOR', displayData_wrapper),
    payload('GET_HA_VAN_I', displayData_wrapper),
    payload('GET_HA_FRASER', displayData_wrapper),
    */
    let event = context.event.payload;
    if (event == 'GET_TOTALS') {
        let query = 'totals';
        let location = '';
        displayData(context, query, location);
    }
    else if (event == 'GET_HA_VCH') {
        let query = 'dailyrates';
        let location = 'Vancouver Coastal';
        displayData(context, query, location);
    }
    else if (event == 'GET_HA_INTERIOR') {
        let query = 'dailyrates';
        let location = 'Interior';
        displayData(context, query, location);
    }
    else if (event == 'GET_HA_VAN_I') {
        let query = 'dailyrates';
        let location = 'Vancouver Island';
        displayData(context, query, location);
    }
    else if (event == 'GET_HA_FRASER') {
        let query = 'dailyrates';
        let location = 'Fraser';
        displayData(context, query, location);
    }
}


async function displayData(context, query, location) {
  try {
    //const apiUrl = 'http://localhost:1234/scrape';
    const apiUrl = 'http://localhost:1234/scrape?type=' + query; // dailyrates, totals
    let scrape = (await axios.get(apiUrl)).data;
    console.log(scrape);

    var text_arr = [];
    if (query == 'dailyrates') {
        text_arr.push('Daily Covid-19 statistics in ' + location + ' Health:\n');
        var ha_data;
        scrape.forEach(element => {
            if (element.HA_Name == location) {
                ha_data = element;
            }
        });
        text_arr.push('Total Cases: ' + ha_data.Cases);
        text_arr.push('New Cases: ' + ha_data.NewCases);
        text_arr.push('Active Cases: ' + ha_data.ActiveCases);
        text_arr.push('Total Deaths: ' + ha_data.Deaths);
        text_arr.push('Hospitalizations: ' + ha_data.Hospitalized);
        text_arr.push('Newly Hospitalized: ' + ha_data.CurrentlyHosp);
        text_arr.push('In ICU: ' + ha_data.CurrentlyICU);
        text_arr.push('Total Recovered: ' + ha_data.Recovered);
        text_arr.push('\nlast updated:\n' + new Date(ha_data.Date_Updat).toString());
        await context.sendText(`${text_arr.join('\n')}`);
    }
    else if (query == 'totals') {
        text_arr.push('Daily Covid-19 statistics in BC:\n');
        scrape.forEach(element => {
          //text_arr.push(element.name);
          text_arr.push(element.name + ': ' + element.value);
        });
        //text_arr.push('last updated:\n' + new Date(scrape[0].Date_Updat).toString());
        await context.sendText(`${text_arr.join('\n')}`);
    }
    else { console.log('error with displayData'); }
  } catch (e) {
    console.log(e)
  }
}

async function restart(context) {
    await context.sendText('Hey there');
    context.event.payload = 'GET_STARTED';
    return startLogic(context);
}

async function outbreakwrapper(context) {
    let event = context.event.payload;
    if (event == 'FRASER') {
        getOutbreaks(context, 'fraser');
    }
    else if (event == 'INTERIOR') {
        getOutbreaks(context, 'interior');
    }
    else if (event == 'VCH') {
        getOutbreaks(context, 'vancouver coastal');
    }
    else if (event == 'VAN_I') {
        getOutbreaks(context, 'vancouver island');
    }
}

async function startLogic(context) {
    var event = '';
    if (context.event.text) {
        await context.sendText(`triggered by ${context.event.text}`);
        event = 'GET_STARTED';
    }
    else if (context.event.isPayload) {
        event = context.event.payload;
    }

    //await context.sendText(`received the payload: ${context.event.payload}`);
    if (event == 'GET_STARTED') {
        await context.sendText(`Payload: ${context.event.payload}`);
        await context.sendText('This service will share Covid-19 cases data & ' +
                               'outbreaks information.');
        await context.sendButtonTemplate('Would you like a personalized experience?', [
            {
              type: 'postback',
              title: 'Personalized',
              payload: 'PERSONALIZED',
            },
            {
              type: 'postback',
              title: 'No Thanks',
              payload: 'NO_PERSONALIZED',
            },
            {
              type: 'postback',
              title: 'More Info',
              payload: 'INFO_PERSONALIZED',
            },
          ]);
    }
    else if (event == 'INFO_PERSONALIZED') {
        await context.sendText(`Payload: ${context.event.payload}`);
        await context.sendButtonTemplate('In a personalized experience, '+
            'this bot will ask a store cities you frequent (live & work)'+
            '.\n\nIn this case, the bot can inform you of covid '+
            'outbreaks in your area by typing \'outbreaks\'.\n\n'+
            'If you do not select personalized, '+
            'You can still manually search for an outbreak', [
            {
              type: 'postback',
              title: 'Personalized',
              payload: 'PERSONALIZED',
            },
            {
              type: 'postback',
              title: 'Not Personalized',
              payload: 'NO_PERSONALIZED',
            },
          ]);
    }
    else if (event == 'NO_PERSONALIZED') {
        await context.sendText(`Payload: ${context.event.payload}`);
        await context.sendButtonTemplate('Please select from one of the '+
            'following commands, or type \'commands\' to see a list of all text commands', [
            {
              type: 'postback',
              title: 'Covid Cases in BC',
              payload: 'GET_TOTALS',
            },
            {
              type: 'postback',
              title: 'Search for Outbreaks',
              payload: 'OUTBREAKS',
            },
            {
              type: 'postback',
              title: 'Covid Cases in HA',
              payload: 'GET_HA',
            },
            /*
            {
              type: 'postback',
              title: 'list text commands',
              payload: 'HELP_CMD',
            },
           */
          ]);
    }
    else if (event == 'PERSONALIZED') {
        await context.sendText(`Payload: ${context.event.payload}`);
        await context.sendButtonTemplate('This bot can store cities, and communities' +
            ' to check for Covid-19 outbreaks. You should store cities you ' +
            ' frequent, such as places you live, work, or travel through.\n\n' +
            'Type \'set location\' followed by a city name to store that location.\n\n' +
            'When you are finished, type \'outbreaks\' to search in those cities.\n\n' +
            'You can also type \'all outbreaks\' to search by Health Authority' +
            ' or \'outbreaks <city or health authority>\' to manually search.', [
            {
              type: 'postback',
              title: 'Other Commands',
              payload: 'GET_CMDS',
            },
        ]);
    }
}

async function cmds(context) {
    await context.sendButtonTemplate('Please select from one of the '+
        'following commands, or type \'commands\' to see a list of all text commands', [
        {
          type: 'postback',
          title: 'Covid Stats in BC',
          payload: 'GET_TOTALS',
        },
        {
          type: 'postback',
          title: 'Search for Outbreaks',
          payload: 'OUTBREAKS',
        },
        {
          type: 'postback',
          title: 'Covid Stats in HA',
          payload: 'GET_HA',
        },
    ]);
}


async function cmdCatchAll(context) {
    let cmd_string = context.event.text;
    let cmd = cmd_string.split(" ");
    console.log('cmd: ' + cmd);
    // -----------------------------------
    // search for location set command
    // -----------------------------------
    if (cmd[0] == 'set') {
        cmd.shift();
        if (cmd[0] == 'location') {
            cmd.shift();
            // search if city exists
            city = cmd.join(" ");
            city = String(city).toLowerCase();
            let ha = getHealthAuth(city);
            let ha_upper = ha;
            ha = ha.toLowerCase();
            if (ha != "not found") {
                await context.sendText('that city is in the ' + ha_upper + ' Health Authority'+
                '\n\nI\'ll remember to check ' + city + ' when you call the \'outbreaks\''+
                ' command.\n\nType \'clear locations\' to remove all stored locations.');
                // if previous state stored
                if (context.state.stored_cities) {
                    console.log('state found')
                    var stored_cities = context.state.stored_cities;
                    console.log('stored cities: ' + stored_cities);
                    if (stored_cities.includes(city)) {
                        await context.sendText(`city already stored: ${stored_cities}`);
                    }
                    else {
                        stored_cities.push(city);
                        context.setState({
                            stored_cities,
                        });
                        await context.sendText(`stored cities: ${stored_cities}`);
                    }
                }
                else {
                    console.log('state not found')
                    var stored_cities = [];
                    stored_cities.push(city);
                    context.setState({
                        stored_cities,
                    });
                    await context.sendText(`stored cities: ${stored_cities}`);
                }
            }
            else {
                await context.sendText('I couldn\'t find that city...\n\n'+
                   'Try removing punctuation and/or prefixes such as \'north\','+
                   '\'south\' etc.');
            }
        }
    }
    // -----------------------------------
    // location remove command
    // -----------------------------------
    else if (cmd[0] == 'clear' && (cmd[1] == 'ha' || cmd[1] == 'locations' ||
             cmd[1] == 'location' || cmd[1] == 'city')) {
        var stored_cities = undefined;
        context.setState({
            stored_cities,
        });
        await context.sendText('Removed stored locations');
    }
    // -----------------------------------
    // outbreaks command
    // -----------------------------------
    else if (cmd[0].toLowerCase() == 'outbreaks') {
        // if no parameters
        if (cmd.length == 1) {
            console.log('no parameters in outbreaks function')
            // if stored has
            if (context.state.stored_cities) {
                console.log('state found');
                var stored_cities = context.state.stored_cities;
                console.log('stored_cities: ' + stored_cities);
                for (i in stored_cities) {
                    getOutbreaks(context, stored_cities[i]);
                }
            }
            // if no stored has
            else {
                console.log('no states found');
                await context.sendText('no health authorities stored...' +
                    '\n\nuse one of the following commands:' +
                    '\noutbreaks <city>' +
                    '\noutbreaks <health authority>' +
                    '\n   - such as fraser, interior, vancouver coastal, vancouver island' +
                    '\nset location <city>' +
                    '\n   - then \'outbreaks\'');
            }
        }
        // if parameters (like a location)
        else {
            console.log('parameters found in outbreaks function');
            cmd.shift();
            cmd_str = cmd.join(" ");
            console.log('city input is: ' + cmd_str);
            let output = getHealthAuth(cmd_str);
            // check if correct output
            if (output == "not found") {
                await context.sendText('I couldn\'t find that city or health authority...\n\n'+
                   'Try removing punctuation and/or prefixes such as \'north\','+
                   '\'south\' etc.');
                await context.sendText('or syntax incorrect');
            }
            else {
                console.log('starting outbreaks command...');
                getOutbreaks(context, cmd_str);
            }
        }
    }
}

module.exports = async function App() {
  return router([
    // return the `SayHi` action when receiving "hi" text messages
    //text(['hi', 'hola', 'hey'], SayHi),
    // return the `SayHello` action when receiving "hello" text messages
    //text('hello', SayHello),
    // return the `displayData` action when receiving "data" text messages
    payload('GET_TOTALS', displayData_wrapper),
    payload('GET_HA_VCH', displayData_wrapper),
    payload('GET_HA_INTERIOR', displayData_wrapper),
    payload('GET_HA_VAN_I', displayData_wrapper),
    payload('GET_HA_FRASER', displayData_wrapper),
    payload('GET_HA', getStatsHa),
    payload('GET_HA_VCH_FRA', getStatsVan),
    text('all outbreaks', getAllOutbreaks),
    payload('GET_CMDS', cmds),
    payload('OUTBREAKS', getAllOutbreaks),
    payload('VCH_FRA', getVanOutbreaks),
    payload('INTERIOR', outbreakwrapper),
    payload('VAN_I', outbreakwrapper),
    payload('VCH', outbreakwrapper),
    payload('FRASER', outbreakwrapper),
    payload('*', startLogic),
    text(['restart', 'begin', 'hi', 'hey', 'hello'], restart),
    text('*', cmdCatchAll),
  ]);
}

