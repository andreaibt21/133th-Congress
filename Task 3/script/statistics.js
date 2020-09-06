let statistics = {
    republicans: [],
    independents: [],
    democrats: [],

    avgVotesDemocrats: 0,
    avgVotesRepublicans: 0,
    avgVotesIndependents: 0,
    leastLoyalVotes: [],
    mostLoyalVotes: [],
    totalLoyalVotes: 0, 

    missedVotesDemocrats: [],
    missedVotesRepublicans: [],
    missedVotesIndependents: [],
    leastMissedVotes: [],
    mostMissedVotes: [],
    totalMissedVotes: 0,
}

   let members = data.results[0].members;

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
    avg = sum / array.length || 0;
//------------least/most---------Missed/Votes
    let votes = array.slice()
    votes.sort(function(a, b) {return  a[key] - b[key]});
    let tenPercent = Math.round(array.length / 10)

    if ( leastOrMost == "least"){
 
        let memberAtTen = votes[votes.length - tenPercent][key];
        return votes.filter( arrayMember => arrayMember[key] >= memberAtTen);  
    
    } else if (leastOrMost == "most") {
    let memberAtTen = votes[tenPercent][key];
        return votes.filter( arrayMember => arrayMember[key] <= memberAtTen); 
    
        }
    return Math.floor(avg);
};

// attendande at glance
statistics.missedVotesDemocrats = getStatistics(statistics.democrats, "missed_votes_pct", null);
statistics.missedVotesRepublicans = getStatistics(statistics.republicans, "missed_votes_pct", null);
statistics.missedVotesIndependents = getStatistics(statistics.independents, "missed_votes_pct", null);
statistics.totalMissedVotes = getStatistics(members, "missed_votes_pct", null);
// Least/Most Engaged
statistics.leastMissedVotes =  getStatistics(members, "missed_votes_pct", "least");
statistics.mostMissedVotes =  getStatistics(members, "missed_votes_pct", "most");
// Party loyalty
statistics.avgVotesDemocrats = getStatistics(statistics.democrats, "votes_with_party_pct", null);
statistics.avgVotesRepublicans = getStatistics(statistics.republicans, "votes_with_party_pct", null);
statistics.avgVotesIndependents = getStatistics(statistics.independents, "votes_with_party_pct", null);
statistics.totalLoyalVotes = getStatistics(members, "votes_with_party_pct", null);
// Least/Most Loyal
statistics.mostLoyalVotes =  getStatistics(members, "votes_with_party_pct", "least");
statistics.leastLoyalVotes =  getStatistics(members, "votes_with_party_pct", "most");




//------at a glance-----
let table = document.getElementById("table-glance");
let tbodyGlance = document.querySelector("#table-glance > tbody");
let loyalty = document.getElementById("loyalty")

tbodyGlance.innerHTML= 
                `<tr>
                <td>Republicans</td>
                <td>${statistics.republicans.length}</td>
                <td>${loyalty? statistics.avgVotesRepublicans : statistics.missedVotesRepublicans} % </td>
                </tr>`;
tbodyGlance.innerHTML += 
                `<tr>
                <td>Democrats</td>
                <td>${statistics.democrats.length}</td>
                <td>${loyalty? statistics.avgVotesDemocrats : statistics.missedVotesDemocrats} % </td>
                </tr>`;
tbodyGlance.innerHTML += 
                `<tr>
                <td>Independents</td>
                <td>${statistics.independents.length}</td>
                <td>${loyalty? statistics.avgVotesIndependents :statistics.missedVotesIndependents} % </td>
                </tr>`;
tbodyGlance.innerHTML += 
                `<tr id="total">
                <td>Total</td>
                <td>${members.length}</td>
                <td>${loyalty? statistics.totalLoyalVotes :statistics.totalMissedVotes} % </td>
                </tr>`;

function mostLeastTable( table, membersArray, pctKey, numbersKey ){
    tbody = document.createElement("tbody");
    for(i =0 ; i < membersArray.length; i++ ){
       
        
      
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

       //nambre, numero missed_votes y porcentaje de missed_votes 
        let name = membersArray[i].first_name + ' ' + (membersArray[i].middle_name || '') + membersArray[i].last_name;
    
        td1.innerHTML = name;
        td2.innerHTML= membersArray[i][numbersKey];
        td3.innerHTML= membersArray[i][pctKey] +" %";

       
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)  
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
}

if(loyalty){
mostLeastTable(document.querySelector("#table-least"),statistics.leastLoyalVotes ,"votes_with_party_pct", "total_votes")
} else{ mostLeastTable(document.querySelector("#table-least"),statistics.leastMissedVotes,  "missed_votes_pct","missed_votes")

}


loyalty? mostLeastTable( document.querySelector("#table-most"),  statistics.mostLoyalVotes, "votes_with_party_pct","total_votes" ):
mostLeastTable(document.querySelector("#table-most"),statistics.mostMissedVotes , "missed_votes_pct", "missed_votes");