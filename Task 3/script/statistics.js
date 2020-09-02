let statistics = {
    republicans: [],
    independents: [],
    democrats: [],
    avgVotesDemocrats: 0,
    avgVotesRepublicans: 0,
    avgVotesIndependents: 0,
    leastMissedVotes: [],
    mostMissedVotes: [],
    missedVotesDemocrats: [],
    missedVotesRepublicans: [],
    missedVotesIndependents: [],
    leastLoyalVotes: [],
    mostLoyalVotes: [],
}

  
   let members = []
   if(document.getElementById("house")){ 
       
       members = houseData.results[0].members

    }   else if (document.getElementById("senate")) {

       members = senateData.results[0].members
    }




for (let i = 0; i < members.length ; i++) {
    if (members[i].party == "R") {
        statistics.republicans.push(members[i])
    }
    if (members[i].party == "D") {
        statistics.democrats.push(members[i])
    }
    if (members[i].party == "ID") {
        statistics.independents.push(members[i])
    }
};

function getStatistics(array, key, leastOrMost) {
   
    let avg = 0;
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += array[i][key];
    }
    avg = sum / array.length;
//------------least/most---------Missed/Votes
    let votes = array.slice()
    votes.sort(function(a, b) {return  a[key] - b[key]});
    let tenPercent = Math.round(array.length / 10)

    if ( leastOrMost == "least"){
 
        let memberAtTen = votes[tenPercent][key];
        return votes.filter( arrayMember => arrayMember[key] <= memberAtTen); 
    
    } else if (leastOrMost == "most") {
    
        let memberAtTen = votes[votes.length - tenPercent][key];
        return votes.filter( arrayMember => arrayMember[key] >= memberAtTen);  
    }
    return Math.floor(avg);
};

// attendande at glance
statistics.missedVotesDemocrats = getStatistics(statistics.democrats, "missed_votes_pct", null);
statistics.missedVotesRepublicans = getStatistics(statistics.republicans, "missed_votes_pct", null);
statistics.missedVotesIndependents = getStatistics(statistics.independents, "missed_votes_pct", null);
// Least/Most Engaged
statistics.leastMissedVotes =  getStatistics(members, "missed_votes_pct", "least");
statistics.mostMissedVotes =  getStatistics(members, "missed_votes_pct", "most");
// Party loyalty
statistics.avgVotesDemocrats = getStatistics(statistics.democrats, "votes_with_party_pct", null);
statistics.avgVotesRepublicans = getStatistics(statistics.republicans, "votes_with_party_pct", null);
statistics.avgVotesIndependents = getStatistics(statistics.independents, "votes_with_party_pct", null);
// Least/Most Loyal
statistics.leastLoyalVotes =  getStatistics(members, "votes_with_party_pct", "least");
statistics.mostLoyalVotes =  getStatistics(members, "votes_with_party_pct", "most");



let tr = document.createElement("tr")
let td = document.createElement("td")

//------at a glance-----
let glanceSenate = document.getElementById("senate-glance")

