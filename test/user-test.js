import { expect } from 'chai';

import User from '../src/User.js';
import travelerData from './travelers.js';

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
})
