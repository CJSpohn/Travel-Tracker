class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
  }

  findUserTrips (allTrips) {
    return allTrips.filter(trip => trip.userID === this.id)
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
