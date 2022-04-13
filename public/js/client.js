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
                div.innerHTML = `
<div class="accordion-item">								     <h2 class="accordion-header" id="heading` + index + `">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse` + index + `" aria-expanded="false" aria-controls="collapse` + index + `">` + station.station_name + `
	    </button>
	</h2>
	<div id="collapse` + index + `" class="accordion-collapse collapse" aria-labelledby="heading` + index + `" data-bs-parent="#accordionExample">
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
</div>`
                    document.getElementById('accordionExample').appendChild(div);
            })
         }
    })
})
})