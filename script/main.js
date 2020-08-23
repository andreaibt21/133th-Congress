//--------table senate------


let senateMembers = senateData.results[0].members;
let houseMembers = houseData.results[0].members;

if (document.getElementById("senate-data")) {

  document.querySelectorAll("input[name=party]").forEach(e => e.addEventListener("change", function () {
    addTableData(document.getElementById("senate-data"), senateMembers);
  }));

  addTableData(document.getElementById("senate-data"), senateMembers);


} else {

  document.querySelectorAll("input[name=party]").forEach(e => e.addEventListener("change", function () {
    addTableData(document.getElementById("house-data"), houseMembers);
  }));

  document.querySelector("#state-select").addEventListener("change", function() {
    addTableData(document.getElementById("house-data"), houseMembers);
  })

  addTableData(document.getElementById("house-data"), houseMembers);

}


function repeat(members) {

  let states = [];
  for( i=0 ; i<members.length; i++ ){
    if(!states.includes(members[i].state)){
      states.push(members[i].state)
    }
  }
  states.sort();
  console.log(states);

  for (let j = 0; j < states.length; j++) {
  let select = document.getElementById("state-select")

  let option = document.createElement("option");
  option.setAttribute("value",`${states[j]}`);
  option.innerText = `${states[j]}`;

  select.appendChild(option)
  
}
}
 
repeat(houseMembers)





//---------------FUNCION TABLA--------------------
function addTableData(table, members) {

  table.innerHTML = '';

  let thead = document.createElement("thead");
  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  let th3 = document.createElement("th");
  let th4 = document.createElement("th");
  let th5 = document.createElement("th");

  th1.innerText = "Name";
  th2.innerText = "Party";
  th3.innerText = "State";
  th4.innerText = "Seniority";
  th5.innerText = "% votes w/ party";

  trH = document.createElement("tr");

  trH.appendChild(th1);
  trH.appendChild(th2);
  trH.appendChild(th3);
  trH.appendChild(th4);
  trH.appendChild(th5);

  thead.appendChild(trH);
  table.appendChild(thead);

  let tbody = document.createElement("tbody");
  let checkedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map(e => e.value);

  
  let selectedStates = document.querySelector("#state-select").selectedIndex;
  let selectedOption = document.getElementsByTagName("option")[selectedStates].value
    console.log(selectedOption);


    for (let i = 0; i < members.length; i++) {

      if (checkedParties.includes(members[i].party) && (members[i].state == selectedOption || selectedOption == 'All')) {
        
        let url = `${members[i].url}`;
        let a = document.createElement("a");
  
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
  
        let name = members[i].first_name + ' ' + (members[i].middle_name || '') + members[i].last_name;
        a.innerHTML = name;
  
        let tr = document.createElement("tr");
  
        let td1 = document.createElement("td");
        td1.appendChild(a);
        let td2 = document.createElement("td");
        td2.innerText = members[i].party;
        let td3 = document.createElement("td");
        td3.innerText = members[i].state;
        let td4 = document.createElement("td");
        td4.innerText = members[i].seniority;
        let td5 = document.createElement("td");
        td5.innerText = members[i].votes_with_party_pct + " %";
  
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        
        tbody.appendChild(tr);
  
      }
    }

  table.appendChild(tbody);
} //fin de funcion



// document.querySelectorAll("input[name=party]").forEach(function(e){ 
//   e.addEventListener("change", addTableData())
// })

//-----end-table1----------

// let readMore = document.getElementById("read-more")

// readMore.addEventListener("click", function(){
//   if( readMore.innerText= "Read More"){
//      readMore.innerText= "Read Less"
//  } else {
//    readMore.innerText= "Read More"
// }
// })
