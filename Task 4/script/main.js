//https://api.propublica.org/congress/v1/113/house/members.json



async function getData() {

    let api = "https://api.propublica.org/congress/v1/113/senate/members.json"
    let init = {
        method: "GET",
        headers: {
            "X-API-Key": "zMYVorSnUM0yIpjUc22fbTJgWWNLCCblkJ8YZvpA",
        }
    }

    // let promise = await fetch(api,init)

    // let isOk = promise.ok
    // let json

    // if (isOk){
    //     json = await promise.json()
    // } else {
    //     alert(promise.status);
    //     return 0;
    // }

    const result = await fetch(api, init)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.status)
            }
        })
        .then(function (data) {
            members = data.results
        })
        .catch(function (error) {
            alert(error)
        })

    console.log("esto es la data ", members)

}

getData()

