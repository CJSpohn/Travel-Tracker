class Trip {
  constructor(currentUser, tripInfo) {
    this.id = tripInfo.id;
    this.userID = currentUser.id;
    this.destinationID = tripInfo.destinationID;
    this.travelers = tripInfo.travelers;
    this.date = tripInfo.date;
    this.duration = tripInfo.duration;
    this.status = 'pending';
    this.suggestedActivities = [];
  }

  calculateCost(destinations) {
    let totalSpent;
    const destination = destinations.find(destination => destination.id === this.destinationID);
    totalSpent += destination.estimatedFlightCostPerPerson * this.travelers;
    totalSpent += destination.estimatedLodgingCostPerDay * this.duration;
    return totalSpent
  }

  
}


export default Trip;
