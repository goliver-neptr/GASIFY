console.log('client js loaded')

const endpointURL = ''
const form = document.getElementById('input-form')
const inputValue = document.querySelector('input').value

function runRequest (e) {
    e.preventDefault();
    var div = document.createElement('div');
    div.innerHTML = "<h1>test</h1><p>test1123123</p>";
    div.style.color = 'red';
    document.getElementById('outerDiv').appendChild(div);
}

form.addEventListener('submit', runRequest)