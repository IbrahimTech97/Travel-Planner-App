// Function to render the list of trips
function renderTrips() {
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    const tripList = document.getElementById('trip-list');
    tripList.innerHTML = '';
  
    trips.forEach(trip => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${trip.destination}</strong> - ${trip.startDate} to ${trip.endDate}
        <p>${trip.description}</p>
        <button onclick="removeTrip('${trip.id}')">x</button>
      `;
      tripList.appendChild(listItem);
    });
  }
  
  // Function to add a new trip
  function addTrip(event) {
    event.preventDefault();
  
    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const description = document.getElementById('description').value;
  
    if (destination.trim() === '' || startDate.trim() === '' || endDate.trim() === '' || description.trim() === '' || new Date(startDate) > new Date(endDate)) {
      alert('Please enter valid destination, dates, and description.');
      return;
    }
  
    const trip = {
      id: new Date().getTime().toString(),
      destination,
      startDate,
      endDate,
      description
    };
  
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.push(trip);
    localStorage.setItem('trips', JSON.stringify(trips));
  
    document.getElementById('trip-form').reset();
    renderTrips();
  }
  
  // Function to remove a trip
  function removeTrip(id) {
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips = trips.filter(trip => trip.id !== id);
    localStorage.setItem('trips', JSON.stringify(trips));
    renderTrips();
  }
  
  
  // Initialize the app
  document.getElementById('trip-form').addEventListener('submit', addTrip);
  document.addEventListener('DOMContentLoaded', renderTrips);
  
  