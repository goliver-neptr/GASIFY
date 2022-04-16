console.log('client js loaded')

const endpointURL = '/endpoint?location='
const form = document.getElementById('input-form')
const inputValue = document.querySelector('input')

form.addEventListener('submit', (e) => {
    e.preventDefault()
            document.getElementById('accordionExample').innerHTML = '';
    
    const location = inputValue.value
    
    var accordionDiv = document.getElementsByClassName('accordion');
    accordionDiv.innerHTML = ''
    
    fetch(endpointURL + location).then((response) => {
    response.json().then((data) => {

        var clientDataDiv = document.getElementById('request-info');

        clientDataDiv.innerHTML = `<div class="request-info"'>
            <p class="latitude">` + data.results.client_Data[0].latitude + `</p>
            <p class="longitude">` + data.results.client_Data[0].longitude + `</p>
            <p class="location">` + data.results.client_Data[0].location + `</p>`
                    
        if(data.error) {
            var div = document.createElement('div');
            div.innerHTML = data.error;
            div.style.color = 'red';
            document.getElementById('accordionExample').appendChild(div);
        } else {
            var index = 0
            data.results.stations.forEach((station) => {
                index = index + 1
                
                var div = document.createElement('div');
                div.innerHTML = `<div class="accordion accordion-flush" id="accordionFlushExample">
<div class="accordion-item my-2">
    <h2 class="accordion-header" id="flush-heading` + index + `">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse` + index + `" aria-expanded="false" aria-controls="flush-collapse` + index + `"><span class="station_name">`+ station.station_name +`</span><span class="duration">` + station.time + ` min away</span></button>
    </h2>
    <div id="flush-collapse` + index + `" class="accordion-collapse collapse" aria-labelledby="flush-heading` + index + `" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p class="result-header">Station Address</p> 
            <p class="result-address">` + station.station_address + `</p> 
            <br>
            <p class="result-header">Station Rating</p>
            <p class="result-rating">` + station.station_rating + ` / 5 stars</p>
            <br>
            <p class="result-header">Station Distance</p>
            <p class="result-distance">` + station.distance + ` miles</p>
            <br>
            <p class="result-header">Trip Duration</p>
            <p class="result-duration">` + station.time + ` minutes</p>
            <br>
            <p class="result-header">Price Level</p>
            <p class="result-plevel">` + station.price_level + `</p>
        </div>
    </div>
</div>
</div>
`
                    document.getElementById('accordionExample').appendChild(div);
            })
         }
    })
})
})