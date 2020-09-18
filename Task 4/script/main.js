//https://api.propublica.org/congress/v1/113/house/members.json

let app = new Vue({
    el: '#app',
    data: {
        apiUrl: "https://api.propublica.org/congress/v1/113/senate/members.json",
        init: {
            headers: {
                "X-API-Key": "zMYVorSnUM0yIpjUc22fbTJgWWNLCCblkJ8YZvpA",
            }
        },
        members: [],
        checkedParties: ["D", "R", "ID"],
        states: [],
        selectedState:'All',
        republicans:[],
        democrats:[],
        independents:[],

    },
    methods: {
        hacerlista: function () {
            for (i = 0; i < this.members.length; i++) {

                if (!this.states.includes(this.members[i].state)) {
                    this.states.push(this.members[i].state)
                };
                if(this.members[i].party == "R"){
                    this.republicans.push(this.members[i])
                };
                if(this.members[i].party == "D"){
                    this.democrats.push(this.members[i])
                }; 
                if(this.members[i].party == "ID"){
                    this.independents.push(this.members[i])
                };
            } this.states.sort();
        },
        getApi: function() {
            if(document.getElementById("senate")){
                return "https://api.propublica.org/congress/v1/113/senate/members.json"
            } else if(document.getElementById("house")){
                return "https://api.propublica.org/congress/v1/113/house/members.json"
            }
        }
        ,
        getData: function () {
            fetch(this.getApi(), this.init)
            .then(function (response) {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error(response.status)
                    }
                })
            .then(json => {
                    console.log(json.results[0].members)
                    this.members = json.results[0].members
                    this.hacerlista();
            })
            .catch(function (error) {
                    alert(error)
            })
        },
        partylists: function() {

        }



    },
    //funciona cuando se crea Vue
   
    created: function(){
       this.getData();
    },
    computed: {
        filtered: function () {
            return this.members.filter(member => this.checkedParties.includes(member.party) &&( this.selectedState.includes(member.state) ||this.selectedState == 'All'))
        },
    }


})
