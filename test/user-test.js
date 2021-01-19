import { expect } from 'chai';

import User from '../src/User.js';
import travelerData from './travelers.js';
import tripData from './trips.js'
import destinationData from './destinations.js'

let user1, user2, user3;


describe('User', () => {

  beforeEach(() => {
    user1 = new User(travelerData[0]);
    user2 = new User(travelerData[1]);
    user3 = new User(travelerData[2]);
  });

  it('should have an id, name, travelerType, and trips', () => {
    expect(user1).to.eql({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
      trips: []
    });
  })

  it('should be able to sort all user trips by id and update its trips', () => {
    const user1Trips = user1.findUserTrips(tripData);
    expect (user1Trips).to.eql([
      {
        "id": 1,
        "userID": 1,
        "destinationID": 1,
        "travelers": 1,
        "date": "2021/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 2,
        "userID": 1,
        "destinationID": 2,
        "travelers": 5,
        "date": "2021/10/04",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
      }
    ]);

    expect(user1.trips.length).to.equal(2);
  });

  it('should return an empty array if the user has no trips', () => {
    const user3Trips = user3.findUserTrips(tripData);
    expect(user3Trips).to.eql([]);
  });

  it('should be able to calculate the total spent on trips', () => {
    const user1TripCosts = user1.calculateTotalSpent(destinationData, [      {
            "id": 1,
            "userID": 1,
            "destinationID": 1,
            "travelers": 1,
            "date": "2021/09/16",
            "duration": 8,
            "status": "approved",
            "suggestedActivities": []
          },
          {
            "id": 2,
            "userID": 1,
            "destinationID": 2,
            "travelers": 5,
            "date": "2021/10/04",
            "duration": 18,
            "status": "pending",
            "suggestedActivities": []
          }]);
    expect(user1TripCosts).to.equal(6660);
  });

  it('should return 0 if no trips have been taken', () => {
    const user3TripCosts = user3.calculateTotalSpent(destinationData, []);
    expect(user3TripCosts).to.equal(0);
  });

  it('should get trip costs for the past year', () => {
    user1.findUserTrips(tripData);
    const user1YearCosts = user1.getTripCostsForCalendarYear(destinationData);
    expect(user1YearCosts).to.eql({
       tripsTaken: 1,
       tripCosts: 960,
       agentFees: 96,
       totalSpent: 1056
    })
  });

  it('should only get trip costs if trips are in the past year and approved', () => {
    user2.findUserTrips(tripData);
    const user2YearCosts = user2.getTripCostsForCalendarYear(destinationData);
    expect(user2YearCosts).to.eql({
      tripsTaken: 0,
      tripCosts: 0,
      agentFees: 0,
      totalSpent: 0
    })
  });

})
