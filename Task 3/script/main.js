//--------table senate------


let members = data.results[0].members;

document.querySelectorAll("input[name=party]").forEach(e => e.addEventListener("change", function () {
  addTableData(document.getElementById("congress-data"), members);
}));

document.querySelector("#select").addEventListener("change", function () {
  addTableData(document.getElementById("congress-data"),members)
})

addStateToList(members)
addTableData(document.getElementById("congress-data"), members);



//Decide ejecutar los datos del senado o del house, depende del caso

// if (document.getElementById("senate-data")) {

//   document.querySelectorAll("input[name=party]").forEach(e => e.addEventListener("change", function () {
//     addTableData(document.getElementById("senate-data"), senateMembers);
//   }));

//   document.querySelector("#senate-select").addEventListener("change", function () {
//     addTableData(document.getElementById("senate-data"), senateMembers)
//   })

//   addStateToList(senateMembers)
//   addTableData(document.getElementById("senate-data"), senateMembers);


// } else if (document.getElementById("house-data")) {

//   document.querySelectorAll("input[name=party]").forEach(e => e.addEventListener("change", function () {
//     addTableData(document.getElementById("house-data"), houseMembers);
//   }));

//   document.querySelector("#state-select").addEventListener("change", function () {
//     addTableData(document.getElementById("house-data"), houseMembers);
//   })

//   addStateToList(houseMembers)
//   addTableData(document.getElementById("house-data"), houseMembers);

// }

//----------------FUNCION ESTADOS-----------------
function addStateToList(members) {

  let states = [];
  for (i = 0; i < members.length; i++) {
    if (!states.includes(members[i].state)) {
      states.push(members[i].state)
    }
  }
  states.sort();

  for (let j = 0; j < states.length; j++) {
    let select = document.getElementById("select")

    let option = document.createElement("option");
    option.setAttribute("value", `${states[j]}`);
    option.innerText = `${states[j]}`;

    select.appendChild(option)

  }
}

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


  let stateIndex = document.querySelector("#select") 

  let selectedOption = stateIndex.value
  


  for (let i = 0; i < members.length; i++) {

    if (checkedParties.includes(members[i].party) && (selectedOption == 'All' || members[i].state == selectedOption)) {

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




