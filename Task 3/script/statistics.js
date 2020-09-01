let statistics = {
    republicans: [],
    independents: [],
    democrats: [],
    avgVotesDemocrats: 0,
    avgVotesRepublicans: 0,
    avgVotesIndependents: 0,
    leastVotes: [],
    mostVotes: [],
}

   // let members = houseData?  houseData.results[0].members :  senateData.results[0].members ;

   let members 
   if(document.getElementById("house")){ 
       
       let members = houseData.results[0].members

    }   else if (document.getElementById("senate")) {

        let members = senateData.results[0].members
    }

console.log(members)


for (let i = 0; i < members.length; i++) {
    if (members[i].party == "R") {
        statistics.republicans.push(members[i])
    }
    if (members[i].party == "D") {
        statistics.democrats.push(members[i])
    }
    if (members[i].party == "ID") {
        statistics.independents.push(members[i])
    }
}


// function averagePartyVotes(array) {
//     let avg = 0;
//     let sum = 0;

//     for (let i = 0; i < array.length; i++) {
//         sum += array[i].votes_with_party_pct;
//     }
//     avg = sum / array.length;

//     return Math.floor(avg);
// }

// statistics.avgVotesDemocrats = averagePartyVotes(statistics.democrats)
// statistics.avgVotesRepublicans = averagePartyVotes(statistics.republicans)
// statistics.avgVotesIndependents = averagePartyVotes(statistics.independents)

// function leastOftenVotes(array, leastOrMost){

//     let votes = array.slice()

//     votes.sort(function(a, b) {return  a.votes_with_party_pct - b.votes_with_party_pct})
   
//     let tenPercent = Math.round(array.length / 10)

//     let memberAtTen = votes[tenPercent].votes_with_party_pct;
 
//    return votes.filter( arrayMember => arrayMember.votes_with_party_pct <= memberAtTen)   

// }
// statistics.leastVotes = leastOftenVotes(members);

// function leastOftenVotes(array, leastOrMost){
//     let votes = array.slice()
//     votes.sort(function(a, b) {return  a.votes_with_party_pct - b.votes_with_party_pct});
//     let tenPercent = Math.round(array.length / 10)

// if ( leastOrMost == "least"){
 
//     let memberAtTen = votes[tenPercent].votes_with_party_pct;
//     return votes.filter( arrayMember => arrayMember.votes_with_party_pct <= memberAtTen); 

// } else if (leastOrMost == "most") {

//     let memberAtTen = votes[votes.length - tenPercent].votes_with_party_pct;
//     return votes.filter( arrayMember => arrayMember.votes_with_party_pct >= memberAtTen);  
// }
// }



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
}


statistics.avgVotesDemocrats = getStatistics(statistics.democrats, "votes_with_party_pct", null)
statistics.avgVotesRepublicans = getStatistics(statistics.republicans, "votes_with_party_pct", null)
statistics.avgVotesIndependents = getStatistics(statistics.independents, "votes_with_party_pct", null)

statistics.leastVotes =  getStatistics(members, "votes_with_party_pct", "least")
statistics.mostVotes =  getStatistics(members, "votes_with_party_pct", "most")