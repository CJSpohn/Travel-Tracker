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

  
}


export default Trip;
