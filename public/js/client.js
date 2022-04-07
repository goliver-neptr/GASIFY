console.log('client js loaded')

const endpointURL = ''
const form = document.getElementById('input-form')
const inputValue = document.querySelector('input')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = inputValue.value
    
    var outerDiv = document.getElementById('outerDiv');
    outerDiv.innerHTML = ''
    
    fetch('/endpoint?location=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            var div = document.createElement('div');
            div.innerHTML = data.error;
            div.style.color = 'red';
            document.getElementById('outerDiv').appendChild(div);
        } else {

            data.results.stations.forEach((station) => {
                var div = document.createElement('div');
                div.innerHTML = station.station_name + ' - ' +  station.station_address;
                div.style.color = 'red';
                document.getElementById('outerDiv').appendChild(div);
            })
         }
    })
})
})