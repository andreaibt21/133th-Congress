Vue.component('stats-table',{

props:['members', 'leastOrMost', 'prop1', 'prop2','type', 'ptc'],
methods: {
        getTenPercent() {

            let votes = this.members.slice()

            votes.sort((a, b) => {return  a[this.prop1] - b[this.prop1]});

            let tenPercent = Math.round(this.members.length / 10)
        
            if ( this.leastOrMost == "most"){
         
                let memberAtTen = votes[votes.length - tenPercent][this.prop1];
                return votes.filter( arrayMember => arrayMember[this.prop1] >= memberAtTen);  
            
            } else if (this.leastOrMost == "least") {

                let memberAtTen = votes[tenPercent][this.prop1];
                return votes.filter( arrayMember => arrayMember[this.prop1] <= memberAtTen); 
            
            }
        }
},
template: `
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>{{type}}</th>
                            <th>{{ptc}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in getTenPercent()"> 
                            <td><a v-bind:href="member.url"> 
                            {{member.first_name}} {{member.middle_name || ""}} {{member.last_name}}</a></td>
                            <td>{{member[prop2]}}</td>  
                            <td>{{member[prop1]}}</td>
                        
                        </tr>
                    </tbody>
                </table>
                </div>

            `


})





let app = new Vue({
    el: '#app',
    data: {
        init: {
            headers: {
                "X-API-Key": "zMYVorSnUM0yIpjUc22fbTJgWWNLCCblkJ8YZvpA",
            }
        },
        members: [],
        stats: {
            democrats: [],
            republicans: [],
            independents: [],
        }
    },
    methods: {
        getApi: function() {
            if(document.getElementById("senate")){
                return "https://api.propublica.org/congress/v1/113/senate/members.json"
            } else if(document.getElementById("house")){
                return "https://api.propublica.org/congress/v1/113/house/members.json"
            }
        },
        partyArrays: function (party) {
           return this.members.filter(member => member.party == party)
        },
        getavg: function (array,key) {
            let avg = 0;
            let sum = 0;

            for (let i = 0; i < array.length; i++) {
                sum += array[i][key];
            }
           return avg = (( sum / array.length) || 0).toFixed(2);
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
                    //console.log(json.results[0].members)
                    this.members = json.results[0].members
                    this.stats.republicans = this.partyArrays("R");
                    this.stats.democrats = this.partyArrays("D");
                    this.stats.independents = this.partyArrays("ID");

            })
            .catch(function (error) {
                    alert(error)
            })
        }
    },

    //funciona cuando se crea Vue
    created: function(){
       this.getData();
    }


})
