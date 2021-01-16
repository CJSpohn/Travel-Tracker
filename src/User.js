class User {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.trips = [];
    this.totalSpent = 0;
  }

  findUserTrips (allTrips) {
    this.trips = allTrips.filter(trip => {
      trip.userID === this.id
    })
  }

  calculateTotalSpent(destinations) {
    this.totalSpent = this.trips.reduce((totalSpent, trip) => {
      const destination = destinations.find(destination => destination.id === trip.destinationID)
      totalSpent += destination.estimatedFlightCostPerPerson * trip.travelers;
      totalSpent += destination.estimatedLodgingCostPerDay * trip.duration;
      return totalSpent;
    }, 0)
  }
}


export default User;
