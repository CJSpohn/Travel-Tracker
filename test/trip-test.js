import { expect } from 'chai';

import Trip from '../src/Trip.js';
import travelerData from './travelers.js';
import tripData from './trips.js'
import destinationData from './destinations.js'

let trip1, trip2, trip3, trip4;

describe('Trip', () => {

  beforeEach(() => {
    trip1 = new Trip(tripData[0]);
    trip2 = new Trip(tripData[1]);
    trip3 = new Trip(tripData[2]);
    trip4 = new Trip(tripData[3]);
  });

  it('should contain all of the trip info but have a pending status by default', () => {
    expect(trip1.status).to.equal('pending');
    expect(trip1.id).to.equal(tripData[0].id);
    expect(trip1.userID).to.equal(tripData[0].userID);
    expect(trip1.destinationID).to.equal(tripData[0].destinationID);
    expect(trip1.travelers).to.equal(tripData[0].travelers);
    expect(trip1.date).to.equal(tripData[0].date);
    expect(trip1.duration).to.equal(tripData[0].duration);
  });

  it('should return the cost of itself and as a string and include a comma', () => {
    const trip1Cost = trip1.calculateCost(destinationData);
    expect(trip1Cost).to.equal('1,056')
  });

  it('should not include a comma if it is less than 1000', () => {
    const trip4Cost = trip4.calculateCost(destinationData);
    expect(trip4Cost).to.equal('517')
  });

  it('should commafy any number between 4 and 6 digits in the right place', () => {
    const cost1 = trip1.commafy(6120);
    expect(cost1).to.equal('6,120')
    const cost2 = trip1.commafy(16427);
    expect(cost2).to.equal('16,427')
  });

  it('should not commafy a number 3 digits or less', () => {
    const cost1 = trip1.commafy(6);
    expect(cost1).to.equal('6')
    const cost2 = trip1.commafy(16);
    expect(cost2).to.equal('16')
    const cost3 = trip1.commafy(160);
    expect(cost3).to.equal('160')
  })

});
