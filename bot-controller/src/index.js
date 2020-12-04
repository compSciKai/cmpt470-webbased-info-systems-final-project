const { router, text, payload } = require('bottender/router');
const axios = require('axios');
const { getHealthAuth } = require('../health_boundaries');

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

async function displayData(context) {
  try {
    const apiUrl = 'http://localhost:1234/scrape';
    let scrape = (await axios.get(apiUrl)).data;

    var text_arr = [];
    text_arr.push('New & Active Cases in BC:\n');
    scrape.forEach(element => {
      text_arr.push(element.HA_Name);
      text_arr.push('new: ' + element.NewCases + ' active: ' + element.ActiveCases
          + '\n');
    });
    text_arr.push('last updated:\n' + new Date(scrape[0].Date_Updat).toString());
    await context.sendText(`${text_arr.join('\n')}`);
  } catch (e) {
    console.log(e)
  }
}

async function restart(context) {
    await context.sendText('Hey there');
    context.event.payload = 'GET_STARTED';
    return startLogic(context);
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
        await context.sendButtonTemplate('Would you like a personalized experience?', [
            {
              type: 'postback',
              title: 'Personalized',
              payload: 'PERSONALIZED',
            },
            {
              type: 'postback',
              title: 'No thanks',
              payload: 'NO_PERSONALIZED',
            },
            {
              type: 'postback',
              title: 'More info',
              payload: 'INFO_PERSONALIZED',
            },
          ]);
    }
    else if (event == 'INFO_PERSONALIZED') {
        await context.sendText(`Payload: ${context.event.payload}`);
        await context.sendButtonTemplate('In a personalized experience, '+
            'this bot will ask a few questions and store the city you live '+
            'and work in.\n\nIn this case, the bot can inform you of covid '+
            'outbreaks in your area.\n\nIf you do not select personalized,'+
            'the bot can ask you which city to search for an outbreak', [
            {
              type: 'postback',
              title: 'Personalized',
              payload: 'PERSONALIZED',
            },
            {
              type: 'postback',
              title: 'Not personalized',
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
              title: 'Get Covid statistics in BC today',
              payload: 'GET_STATISTICS',
            },
            {
              type: 'postback',
              title: 'Search for outbreaks',
              payload: 'OUTBREAKS',
            },
            {
              type: 'postback',
              title: 'Get Latest BCCDC Tweet',
              payload: 'TWEET',
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
        await context.sendText('Which city do you live in? \n\n' +
            'Type "location" followed by your city');
    }
}

async function cmdCatchAll(context) {
    let cmd_string = context.event.text;
    let cmd = cmd_string.split(" ");
    console.log(cmd);
    // -----------------------------------
    // search for location set command
    // -----------------------------------
    if (cmd[0] == 'set') {
        cmd.shift();
        if (cmd[0] == 'location') {
            cmd.shift();
            // search if city exists
            city = cmd.join(" ");
            let ha = getHealthAuth(city);
            ha = ha.toLowerCase();
            if (ha != "not found") {
                await context.sendText('that city is in the ' + ha + ' Health Authority'+
                '\n\nI\'ll remember to check that area when you call the \'outbreaks\''+
                ' command');
                if (context.state.stored_has) {
                    console.log('state found')
                    var stored_has = context.state.stored_has;
                    console.log(stored_has);
                    if (stored_has.includes(ha)) {
                        await context.sendText(`ha already stored: ${stored_has}`);
                    }
                    else {
                        stored_has.push(ha);
                        context.setState({
                            stored_has,
                        });
                        await context.sendText(`stored has: ${stored_has}`);
                    }
                }
                else {
                    console.log('state not found')
                    var stored_has = [];
                    stored_has.push(ha);
                    context.setState({
                        stored_has,
                    });
                    await context.sendText(`stored has: ${stored_has}`);
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
    else if (cmd[0] == 'clear' && cmd[1] == 'ha') {
        var stored_has = undefined;
        context.setState({
            stored_has,
        });
        await context.sendText('Removed stored health authorities');
    }
    // -----------------------------------
    // outbreaks command
    // -----------------------------------
    else if (cmd[0].toLowerCase() == 'outbreaks') {
        // if no parameters
        if (cmd.length == 1) {
            console.log('no parameters in outbreaks function')
            // if stored has
            if (context.state.stored_has) {
                console.log('state found');
                var stored_has = context.state.stored_has;
                // TODO add get outbreaks function
                console.log('outbreaks command would be called here');
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
        // if parameters
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
                // TODO add outbreaks function
                console.log('would run outbreaks command here');
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
    text('data', displayData),
    payload('*', startLogic),
    text(['restart', 'begin', 'hi', 'hey', 'hello'], restart),
    text('*', cmdCatchAll),
  ]);
}

