## 🔥 FireHydrant SDET Challenge 🔥

### The Challenge

This repo contains a mock UX experience for you to test drive using Cypress.io. The following views exist within the application.

- /dashboard
- /incidents
- /incidents/new
- /incidents/:id
- /incidents/:id/edit

The end goal for this challenge is for you to use create Cypress tests to ensure that the UI is correctly functioning without issues.

A few examples include but not limited to:

- verify an active incident can be created
- verify an incident can be archived
- verify the dashboard page will only show a max of 5 incidents
- verify the UI links route correctly through the application

We ask that you spend no more than an hour or so working on this - it does not need to be polished or production-ready. We just want to hear about it and be able to ask questions about decisions made and thought processes. Our only parameter is that we'd like it to be in Cypress which is already installed in the application. Feel free to use any Cypress utilities you would normally use. In addition feel free to use any outside resources that you would like for example the documentation site is a great start https://docs.cypress.io/.

### Setup

In order to setup this repo you will first need to clone it locally and then change into the `sdet-challenge` and run `yarn install`.

```
git clone https://github.com/firehydrant/sdet-challenge
cd sdet-challenge
yarn install
```

### Adding Cypress Tests and running them

Place your spec files within /cypress/integration and then use the following commands to run cypress.

running cypress headless

```
yarn cypress
```

running cypress with UI

```
yarn cypress:open
```

### Starting the Server

This repo is setup to run both an instance of `create-react-app` as well as a local `json-server` using the `yarn dev` command.

```
yarn dev
```

### Schema Information

```
// /incidents
// returns an Array[] of incidents

{
  "id": 146,
  "name": "We Didn't Start the Fire",
  "description": "A song written and performed by American musician Billy Joel. The song was released as a single on September 27, 1989, and later released as part of Joel's album Storm Front on October 17, 1989.",
  "severity": "SEV1",
  "milestone": "acknowledged",
  "created_at": "2021-08-19T05:32:04.414Z",
  "updated_at": "2021-08-19T05:32:23.589Z"
}
```
