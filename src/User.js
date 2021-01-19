class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.trips = [];
  }

  findUserTrips (allTrips) {
    this.trips = allTrips.filter(trip => trip.userID === this.id)
    return this.trips
  }

  calculateTotalSpent(destinations, trips) {
    return trips.reduce((totalSpent, trip) => {
      const destination = destinations.find(destination => destination.id === trip.destinationID)
      totalSpent += destination.estimatedFlightCostPerPerson * trip.travelers;
      totalSpent += destination.estimatedLodgingCostPerDay * trip.duration;
      return totalSpent;
    }, 0)
  }

  getTripCostsForCalendarYear(destinations) {
    const currentYear = new Date().getFullYear();
    const calendarYearTripInfo = {
      tripsTaken: 0,
      tripCosts: 0,
      agentFees: 0,
      totalSpent: 0
    };
    this.trips.forEach(trip => {
      if (trip.date.includes(currentYear) && trip.status === 'approved') {
        let tripCost = this.calculateTotalSpent(destinations, [trip]);
        calendarYearTripInfo.tripsTaken++;
        calendarYearTripInfo.tripCosts += tripCost;
        calendarYearTripInfo.agentFees += Math.floor(tripCost * 0.1);
        calendarYearTripInfo.totalSpent += Math.floor(tripCost * 1.1);
      }
    });
    return calendarYearTripInfo;
  }
}


export default User;
