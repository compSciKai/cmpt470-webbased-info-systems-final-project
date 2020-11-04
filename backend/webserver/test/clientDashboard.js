// If generated correctly, 2 constant variables named ADDR and PORT (referring to the server's public IP and port) will be inserted above this line.

// Sends a request to the server to get an update for a location locationName.
function getUpdate(locationName) {
    x = new XMLHttpRequest();
    x.addEventListener('load', function(e) {
        var j = JSON.parse(x.response); // Get a JS object. Access fields with dot or []
        var s = JSON.stringify(x.response); // Get a string representation.
        console.log(s);
        display(j.text);
    });

    // Problem: how do we make sure this URL actually leads to the server?
    // One way is for the server to modify the webpage to have the server's public facing IP and port before sending it off to the client
    x.open("POST", `http://${ADDR}:${PORT}/api/dashboard`); // Prepare a POST request to this URL

    x.setRequestHeader("Content-Type", "application/JSON"); // Since we want to send JSON data, set the content-type correctly so Express can parse it correctly.
    x.send(JSON.stringify({"location": "Vancouver"})); // Send a string made from a JS object.
}

// Renders a message on the page
function display(message) {
    document.getElementById('data').innerHTML = `<p>${message}</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonGetUpdate').addEventListener('click', () => {
        getUpdate("Vancouver");
    });
});