var fs = require('fs');

// Placeholder class that will serve the dashboard data.
class DashboardService {
    constructor(addr, port, scrapeService) {
        this.addr = addr;
        this.port = port;
        this.scrapeService = scrapeService
    }

    // This function dynamically generates the JS file returned to the client when the webpage is loading.
    // The server's address and port (passed in the constructor) are added, so the client can make connections to the server outside of loading the webpage.
    async createClientScript(req, res, next) {
        var self = this; // Inside the callback, "this" will mean something else, so preserve it. See https://stackoverflow.com/a/20279485
        fs.readFile('test/clientDashboard.js', 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            res.set('Content-Type', 'text/javascript');
            // Warning! If the address/port that the client's script connects to doesn't match the address:port that the user navigated to in their browser,
            // the browser may deny the request as it is a CORS.
            // e.g., User goes to page at localhost:1234. A script on that page tries to reach 192.168.0.11:1234/something. Browser blocks the CORS for security reasons as localhost != 192.168.0.11
            res.send(`const ADDR = "${self.addr}";\nconst PORT = "${self.port}";\n${data}`);
        });
    }

    async handleRequest(req, res, next) {
        res.set('Content-Type', 'application/JSON');
        var data = await this.scrapeService.find();
        
        return res.send(data);
    }
}

module.exports = DashboardService;