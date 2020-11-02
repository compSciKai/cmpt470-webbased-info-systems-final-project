
// Placeholder class that will serve the dashboard data.
class DashboardService {
    constructor() {
        console.log(`constructor() called`);
    }

    handleRequest(req, res, next) {
        // x = new XMLHttpRequest();
        // x.addEventListener('load', function(e) { console.log(JSON.stringify(x.response)); });
        // x.open("POST", "http://localhost:1234/api/dashboard");
        // x.setRequestHeader("Content-Type", "application/JSON");
        // x.send(JSON.stringify({"location": "Vancouver"}));

        var location = req.body.location;
        res.set('Content-Type', 'application/JSON');
        console.log(`called with data ${location}`);
        var data = {
            text:`This is an update from the dashboard service at ${location}. ${Date.now()}.`
        };
        
        return res.send(data);
    }
}

module.exports = DashboardService;