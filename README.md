# Travel Tracker

The requirements for this project can be found in [this project spec](https://frontend.turing.io/projects/travel-tracker.html)

## Overview

This is the final assessment for Mod 2 at the Turing School of Software and Design.

TravelTracker is a mock travel agency that allows users to request trips to book for their travel agent to approve or deny. It's vacation made easy! To log in as a user you must enter the username `traveler` with any number between 1 and 50 (e.g. traveler12 or traveler31). The password is `travel2020`. Once on a dashboard. The user can use the form to submit a new trip request. Also displayed on their dashboard is their pending trips, past trips, and the total they've spent on vacationing in the last calendar year.

Log out at any time and log in as an agent with the username `agency` and the same password: `travel2020`. From here you can view the income for this agent (from 10% of the total spent on trips by their user) and the pending trips submitted by users with a button to approve them.

In order to run this project you must first clone down and set up [this](https://github.com/turingschool-examples/travel-tracker-api) repository as it is the API used in the project to respond to our fetch requests. Follow the set up instructions for that repo. Then clone down this one, cd into the directory, run npm install, and finally npm start. The site will hosted locally at `http://localhost:8081/` so navigate to there in your browser to view it in action.

## Learning Goals

__Test Driven Development__

* The project currently has unit testing for each class and every method that exists inside of those classes and checks for both happy and sad path testing.

__Utilizing New Technologies__

*Webpack*

* This was our second exposure to webpack. The webpack was created for us. We simply needed to incorporate the new tools.

*SASS*

* I implemented color functions, extensions, mixins, and variables to help DRY up my CSS.

*Async JavaScript*

* The biggest challenge of the project was properly submitting fetch requests to the API (linked above) to get all the data and add pending trips. Additionally, I was specifically asked to use `.then()` as opposed to `async/await`.
* All user data is fetched on page load using a GET request and `promise.all()`. Classes are instantiated as needed once the data is receieved.
* A user's dashboard is populated from the data receieved. A `catch` updates the DOM to display to the user that something went wrong if the data is unable to be fetched.
* All requests have error handling through `catch` that updates an error message to the DOM. However, the code was constructed so that the user should never see these messages unless error occurs on page load, (or if the server is killed mid POST) as they are not able to 'submit' a flight that does not match the specifications of the API for a POST. 

__Accessibility__

* Attention was paid to semantic HTML. A branch of the dashboard was pushed up prior to creation of the log-in page to assure that the LightHouse accessibility score was 100% for the main section of the website. 

__Responsive Design__

* The site is optomized across 4 major screen sizes. I used grid for the layout and mostly flexbox for the positioning of elements within the grid.

__File Structure and Organization__

* Business code occurs in index.js
* SASS files are broken up into separate files for different dashboards. Media queries are in their own file. As well as color variables.
* DOM manipulation occurs in its own file.
* Fetch request functions occur in their own file. 
* Classes and the data model are kept separate from index.js

## Using the Site

First, a user arrives at the landing page and is prompted to sign in.

<img width="1435" alt="Screen Shot 2021-01-19 at 2 51 09 PM" src="https://user-images.githubusercontent.com/69563078/105099697-517acb80-5a69-11eb-8090-16237ed8d57c.png">

<img width="1224" alt="Screen Shot 2021-01-19 at 2 51 20 PM" src="https://user-images.githubusercontent.com/69563078/105099706-58094300-5a69-11eb-80bc-34a774e0cbc6.png">

If the user logs in with the proper credentials they are taken to the dashboard for the user that matches the id of the id entered as a username. The pending trips display let's them know if a trip is pending, approved, or expired (never approved and passed the date of the trip). The form allows them to make a new trip request. They are shown all past trips they've gone on through the site. And they see the amount they've spent for the calendar year broken down by fees.

<img width="1424" alt="Screen Shot 2021-01-19 at 3 18 14 PM" src="https://user-images.githubusercontent.com/69563078/105100716-f21dbb00-5a6a-11eb-88f2-eb0f4dfe45f2.png">

<img width="1403" alt="Screen Shot 2021-01-19 at 2 52 25 PM" src="https://user-images.githubusercontent.com/69563078/105100864-3315cf80-5a6b-11eb-9015-5ea2848feddb.png">

After selecting details for a trip the user sees the estimated cost for the trip and is prompted to confirm the trip or reset the form. If confirmed, the trip will get posted as 'pending' to the appropriate place in the data and a new trip will show up as pending in the user's pending trip display. Additionally, a successful post request is confirmed to the DOM above the form so the user knows the trip was successfully posted.

<img width="408" alt="Screen Shot 2021-01-19 at 2 52 39 PM" src="https://user-images.githubusercontent.com/69563078/105101025-75d7a780-5a6b-11eb-93b7-4840aa8a215d.png">

<img width="340" alt="Screen Shot 2021-01-19 at 2 52 52 PM" src="https://user-images.githubusercontent.com/69563078/105101029-783a0180-5a6b-11eb-8494-a82d0dd2b31c.png">

<img width="488" alt="Screen Shot 2021-01-19 at 2 52 46 PM" src="https://user-images.githubusercontent.com/69563078/105101091-90aa1c00-5a6b-11eb-86f5-d95196af99f0.png">

The site is replete with error messages for form error handling and unsuccessful requests.

<img width="369" alt="Screen Shot 2021-01-19 at 2 53 50 PM" src="https://user-images.githubusercontent.com/69563078/105101193-ba634300-5a6b-11eb-83ba-7588a961fcb8.png">

<img width="375" alt="Screen Shot 2021-01-19 at 2 53 37 PM" src="https://user-images.githubusercontent.com/69563078/105101207-bd5e3380-5a6b-11eb-8d38-ee352994dc8d.png">

<img width="824" alt="Screen Shot 2021-01-19 at 2 54 12 PM" src="https://user-images.githubusercontent.com/69563078/105101208-bd5e3380-5a6b-11eb-9fb5-315d4dd78a2c.png">

<img width="334" alt="Screen Shot 2021-01-19 at 3 18 50 PM" src="https://user-images.githubusercontent.com/69563078/105101212-be8f6080-5a6b-11eb-8ae0-84d40b9416ef.png">

<img width="340" alt="Screen Shot 2021-01-19 at 3 25 40 PM" src="https://user-images.githubusercontent.com/69563078/105101214-be8f6080-5a6b-11eb-9fc1-be8638e9db2c.png">

The agent dashboard shows the agent how much they've made, how many trips they've booked, and any pending trips that need to be approved.

<img width="1101" alt="Screen Shot 2021-01-19 at 2 53 15 PM" src="https://user-images.githubusercontent.com/69563078/105101355-dd8df280-5a6b-11eb-94e4-d76e33a9a84d.png">

Finally, the site is fully responsive and maintains its integrity from desktop to mobile.

<img width="500" alt="Screen Shot 2021-01-19 at 3 40 32 PM" src="https://user-images.githubusercontent.com/69563078/105103030-14b0d380-5a6d-11eb-87e9-c0fd3403e4f9.png">

<img width="507" alt="Screen Shot 2021-01-19 at 3 40 43 PM" src="https://user-images.githubusercontent.com/69563078/105103040-19758780-5a6d-11eb-91b1-47fe6a6f61b1.png">

<img width="486" alt="Screen Shot 2021-01-19 at 3 41 14 PM" src="https://user-images.githubusercontent.com/69563078/105103042-1a0e1e00-5a6d-11eb-9146-2cd4f12d5c60.png">

<img width="489" alt="Screen Shot 2021-01-19 at 3 41 23 PM" src="https://user-images.githubusercontent.com/69563078/105103044-1aa6b480-5a6d-11eb-8ca0-2f346f509e30.png">

## Wins

This site was built from the ground up (aside from the webpack configuration) in five days. The biggest win is the amount of work I was able to get done in such a short time frame. Especially considering it was on the back of a final assessment, and a hefty group project that was due the day before this project was assigned. I think the breadth of accomplishments its something I'm proud of as well: unit testing, accessibility, network requests, utilizing SASS, separating DOM logic from network requests from logic from data model, this readme, error handling, and the sheer amount of features. Considering the time frame I'm incredibly please with what I've put forth. 

## Future Iterations

In future iterations I would love to continue with the functionality. Currently if a user adds a pending trip it shows up in the agent's dashboard, however the approve button has no functionality. In theory, the approve button would send a POST request to update the trip status to 'approved', it would update the income earned for the agent, the amount spent for the user, and whatever other waterfall effects that would need to occur. It's really the only major piece of functionality missing to properly 'attach' the agent dashboard to the user dashboard. 

## Technologies

The project was written in HTML, CSS with SASS, JavaScript and bundled through webpack.

Unit testing was accomplished through node.js using Mocha and Chai.

## References

Images were taken from [Unsplash](unsplash.com)

## Authors

[Chris Spohn](https://github.com/CJSpohn)

