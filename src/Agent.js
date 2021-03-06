import User from './User';

class Agent extends User {
  constructor(user) {
    super(user);
  }

  getTrips(trips) {
    this.trips = trips;
  }

  getPendingTrips(date) {
    return this.trips.filter(trip => {
      const tripDate = new Date(trip.date)
      if (trip.status === 'pending' && tripDate.getTime() > date) {
        return trip;
      }
    });
  }

}


export default Agent;
