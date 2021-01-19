import { expect } from 'chai';

import Agent from '../src/Agent.js';
import travelerData from './travelers.js';
import tripData from './trips.js'
import destinationData from './destinations.js'

let agent;

describe('Agent', () => {
  beforeEach(() => {
    agent = new Agent({ id: 1, name: 'Agent', travelerType: 'Agent', trips: tripData });
  });

  it('should have no trips by default', () => {
    expect(agent.trips).to.eql([ ]);
  });

  it('should be able to get all the current trips', () => {
    agent.getTrips(tripData);
    expect(agent.trips).to.eql(tripData)
  });

  it('should be able to find every pending trip that hasn\'t happened', () => {
    agent.getTrips(tripData);
    const pendingTrips = agent.getPendingTrips(Date.now());
    expect(pendingTrips).to.eql([
      {
        date: "2021/10/04",
        destinationID: 2,
        duration: 18,
        id: 2,
        status: "pending",
        suggestedActivities: [],
        travelers: 5,
        userID: 1
      }
      ])
  });

  it('should be able to utilize User methods to find info from this year\'s trips', () => {
    agent.getTrips(tripData);
    const pendingTrips = agent.getPendingTrips(Date.now());
    const agentYearInfo = agent.getTripCostsForCalendarYear(destinationData);
    expect(agentYearInfo).to.eql({
      tripsTaken: 1,
      tripCosts: 960,
      agentFees: 96,
      totalSpent: 1056
    })
  });
  
});
