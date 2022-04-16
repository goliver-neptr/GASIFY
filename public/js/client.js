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

            var optimalDiv = document.createElement('div');
            optimalDiv.innerHTML = `<div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item my-2">
                <h2 class="accordion-header" id="flush-headingLTIME">
                    <span class="optimalHeader">Fastest Station</span>
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseLTIME" aria-expanded="false" aria-controls="flush-collapseLTIME"><span class="station_name">`+ data.results.optimalStations.lowTime.station_name + ` on ` + data.results.optimalStations.lowTime.station_street_name + `</span><span class="duration">` + data.results.optimalStations.lowTime.time + ` min away</span></button>
                </h2>
                <div id="flush-collapseLTIME" class="accordion-collapse collapse" aria-labelledby="flush-headingLTIME" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p class="result-header">Station Address</p> 
                        <p class="result-address">` + data.results.optimalStations.lowTime.station_address + `</p> 
                        <br>
                        <p class="result-header">Station Rating</p>
                        <p class="result-rating">` + data.results.optimalStations.lowTime.station_rating + ` / 5 stars</p>
                        <br>
                        <p class="result-header">Station Distance</p>
                        <p class="result-distance">` + data.results.optimalStations.lowTime.distance + ` miles</p>
                        <br>
                        <p class="result-header">Trip Duration</p>
                        <p class="result-duration">` + data.results.optimalStations.lowTime.time + ` minutes</p>
                        <br>
                        <p class="result-header">Price Level</p>
                        <p class="result-plevel">` + data.results.optimalStations.lowTime.price_level + `</p>
                    </div>
                </div>
            </div>
            </div>
            
            <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item my-2">
                <h2 class="accordion-header" id="flush-headingLDIST">
                    <span class="optimalHeader">Closest Station</span>
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseLDIST" aria-expanded="false" aria-controls="flush-collapseLDIST"><span class="station_name">`+ data.results.optimalStations.lowDistance.station_name + ` on ` + data.results.optimalStations.lowDistance.station_street_name + `</span><span class="duration">` + data.results.optimalStations.lowDistance.time + ` min away</span></button>
                </h2>
                <div id="flush-collapseLDIST" class="accordion-collapse collapse" aria-labelledby="flush-headingLDIST" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p class="result-header">Station Address</p> 
                        <p class="result-address">` + data.results.optimalStations.lowDistance.station_address + `</p> 
                        <br>
                        <p class="result-header">Station Rating</p>
                        <p class="result-rating">` + data.results.optimalStations.lowDistance.station_rating + ` / 5 stars</p>
                        <br>
                        <p class="result-header">Station Distance</p>
                        <p class="result-distance">` + data.results.optimalStations.lowDistance.distance + ` miles</p>
                        <br>
                        <p class="result-header">Trip Duration</p>
                        <p class="result-duration">` + data.results.optimalStations.lowDistance.time + ` minutes</p>
                        <br>
                        <p class="result-header">Price Level</p>
                        <p class="result-plevel">` + data.results.optimalStations.lowDistance.price_level + `</p>
                    </div>
                </div>
            </div>
            </div>

            <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item my-2">
                <h2 class="accordion-header" id="flush-headingHRATE">
                    <span class="optimalHeader">Highest Rated Station</span>
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseHRATE" aria-expanded="false" aria-controls="flush-collapseHRATE"><span class="station_name">`+ data.results.optimalStations.maxRating.station_name + ` on ` + data.results.optimalStations.maxRating.station_street_name + `</span><span class="duration">` + data.results.optimalStations.maxRating.time + ` min away</span></button>
                </h2>
                <div id="flush-collapseHRATE" class="accordion-collapse collapse" aria-labelledby="flush-headingHRATE" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p class="result-header">Station Address</p> 
                        <p class="result-address">` + data.results.optimalStations.maxRating.station_address + `</p> 
                        <br>
                        <p class="result-header">Station Rating</p>
                        <p class="result-rating">` + data.results.optimalStations.maxRating.station_rating + ` / 5 stars</p>
                        <br>
                        <p class="result-header">Station Distance</p>
                        <p class="result-distance">` + data.results.optimalStations.maxRating.distance + ` miles</p>
                        <br>
                        <p class="result-header">Trip Duration</p>
                        <p class="result-duration">` + data.results.optimalStations.maxRating.time + ` minutes</p>
                        <br>
                        <p class="result-header">Price Level</p>
                        <p class="result-plevel">` + data.results.optimalStations.maxRating.price_level + `</p>
                    </div>
                </div>
            </div>
            </div>
            <span class="optimalHeader">ALL OTHER STATIONS</span>
            `
            document.getElementById('accordionExample').appendChild(optimalDiv);

            data.results.stations.forEach((station) => {
                index = index + 1
                
                var div = document.createElement('div');
                div.innerHTML = `<div class="accordion accordion-flush" id="accordionFlushExample">
<div class="accordion-item my-2">
    <h2 class="accordion-header" id="flush-heading` + index + `">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse` + index + `" aria-expanded="false" aria-controls="flush-collapse` + index + `"><span class="station_name">`+ station.station_name + ` on ` + station.station_street_name + `</span><span class="duration">` + station.time + ` min away</span></button>
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