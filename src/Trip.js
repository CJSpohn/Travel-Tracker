class Trip {
  constructor(tripInfo) {
    this.id = tripInfo.id;
    this.userID = tripInfo.userID;
    this.destinationID = tripInfo.destinationID;
    this.travelers = tripInfo.travelers;
    this.date = tripInfo.date;
    this.duration = tripInfo.duration;
    this.status = 'pending';
    this.suggestedActivities = [];
  }

  calculateCost(destinations) {
    let totalSpent = 0;
    const destination = destinations.find(destination => destination.id === this.destinationID);
    totalSpent += destination.estimatedFlightCostPerPerson * this.travelers;
    totalSpent += destination.estimatedLodgingCostPerDay * this.duration;
    return this.commafy(totalSpent)
  }

  commafy(cost) {
    const digits = cost.toString().split('')
    if (digits.length > 3 && digits.length < 6) {
      digits.splice(digits.length - 3, 0, ',')
      return digits.join('')
    }
  }

}


export default Trip;
