
// arrays of cities and communities
let interior = ["fernie", "cranbrook", "kimberley", "windermere", "creston",
    "golden", "kootenay lake", "nelson", "castlegar", "arrow lakes", "trail",
    "grand forks", "kettle valley", "southern okanagan", "okanagan", "penticton",
    "keremeos", "princeton",
    "armstrong", "spallumcheen", "vernon", "central okanagan", "summerland",
    "enderby", "thompson cariboo shuswap", "revelstoke", "salmon arm", "kamloops",
    "100 mile house", "north thompson", "cariboo", "chilcotin", "lillooet",
    "south cariboo", "merritt", "coldstream", "north okanagan", "lumby",
    "central okanagan rural", "kelowna", "west kelowna", "lake country",
    "glenmore", "downtown kelowna", "rutland", "okanagan misson", "lower thompson",
    "west cariboo"]

let fraser = ["hope", "chilliwack", "abbotsford", "misson", "agassiz", "harrison",
    "new westminster", "new west", "burnaby", "maple ridge", "pitt meadows",
    "tri-cities", "tricities", "tri cities", "langley", "delta", "surrey",
    "south surrey", "white rock", "south chilliwack", "north chilliwack",
    "central abbotsford", "east abbotsford", "west abbotsford", "south mission",
    "north mission", "haney", "north coquitlam", "port coquitlam", "port moody",
    "anmore", "belcarra", "walnut grove", "fort langely", "willoughby", "brookswood",
    "murrayville", "aldergrove", "north langley", "south langely", "north delta",
    "ladner", "tsawwassen", "whalley", "north surrey", "cloverdale", "panorama",
    "east newton", "fleetwood", "guildford", "west newton"]

let vancouver_coastal = ["richmond", "vancouver", "north vancouver", "west vancouver",
    "bowen island", "sunshine coast", "powell river", "howe sound", "bella coola valley",
    "central coast", "downtown vancouver", "west end", "fairview", "downtown eastside",
    "blundell", "steveston", "east cambie", "west cambie", "bridgeport", "gilmore",
    "shellmont", "hamilton", "false creek", "hastings", "renfrew", "collingwood",
    "shaughnessy", "arbutus ridge", "kerrisdale", "point grey", "ubc", "kitslano",
    "kensington", "mount pleasant", "killarney", "oakridge", "marpole", "lions bay",
    "gibsons", "schelt", "squamish", "whistler"]

let vancouver_island = ["greater victoria", "western communities", "saanich peninsula",
    "southern gulf islands", "cowichan valley", "greater nanaimo", "oceanside",
    "alberni", "clayoquot", "comox valley", "greater cambell river", "vancouver island",
    "downtown victoria", "james bay", "fairfield", "oak bay", "gordon head",
    "shelbourne", "quadra", "swan lake", "interurban", "tillicum", "view royal",
    "esquimalt", "colwood", "metchosin", "langford", "sooke", "juan de fuca coast",
    "royal oak", "cordova bay", "prospect", "saanich", "sidney", "salt spring island",
    "pender", "galiano", "saturna", "mayne", "cowichan", "cowichan valley",
    "ladysmith", "chemainus", "penlakut island", "thetis island", "downtown nanaimo",
    "nanaimo", "departure bay", "cedar", "wellington", "gabriola island", "parksville",
    "qualicum beach", "oceanside", "port alberni", "alberni valley", "bamfield",
    "west coast", "comox", "courtenay", "port hardy", "port alice", "port mcneill",
    "sointula"]

let northern = ["haida gwaii", "snow country", "prince rupoert", "upper skeena",
    "smithers", "kitimat", "stikine", "terrace", "nisgaa", "telegraph creek",
    "quesnel", "burns lake", "nechako", "prince george", "peace river", "fort nelson",
    "houston", "vanderhoof", "fort st johns", "fraser lake", "mcbride",
    "valemount", "machenzie", "dawson creek", "chetwynd", "tumbler ridge",
    "peace river", "hudsons hope", "peace river", "northern boreal"]

function getHealthAuth(city) {
    // check for health authority name
    ha_name = ["interior", "fraser", "vancouver island", "vancouver coastal"]
    if (ha_name.includes(city)) { return city; }
    city = city.toLowerCase();
    for (i in fraser) {
        if (fraser[i] == city) { return "Fraser"; }
    }
    for (i in vancouver_coastal) {
        if (vancouver_coastal[i] == city) { return "Vancouver Coastal"; }
    }
    for (i in interior) {
        if (interior[i] == city) { return "Interior"; }
    }
    for (i in vancouver_island) {
        if (vancouver_island[i] == city) { return "Vancouver Island"; }
    }
    // if city not found
    return "not found";
}

// test functions
//console.log(getHealthAuth("maple ridge"));

module.exports = { getHealthAuth };
