const unselectedSeat = document.querySelectorAll('.seat');
const selectedSeat = document.querySelectorAll('.selected');


unselectedSeat.forEach(seat => {
    seat.addEventListener('click', () => {
        seat.className += ' selected'
    })
})

selectedSeat.forEach(seat => {
    seat.addEventListener('click', () => {
        seat.className = 'seat'
    })
})
