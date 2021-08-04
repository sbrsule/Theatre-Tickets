const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const clearAll = document.getElementById('clearButton');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    console.log(seatsIndex);
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    if(selectedSeatsCount > 0) {
        clearAll.classList.add('visible');
    }
    else {
        clearAll.classList.remove('visible');
    }
}

function clear() {
    localStorage.clear();
}

// Get data from localstorage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

clearAll.addEventListener('click', () => {
    seats.forEach((seat) => {
        if(seat.classList.contains('selected')) {
            seat.classList.remove('selected');
        }
    })
    localStorage.clear();
    updateSelectedCount();
})
//Movie selector event
movieSelect.addEventListener('change', function(e) {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

container.addEventListener('click', function(e) {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

updateSelectedCount();
