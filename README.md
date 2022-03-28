# Bash Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Bash Hub is an app for event organizers and people who just like to plan their get-togethers. Users can create "events", along with "subevents", to create an itinerary for their guests, and guests can mark their intentions to attend. Event pages can be customized with YouTube videos and custom banner images. The app was written with React and MaterialUI as well as GraphQL and Mongoose. Socket.io enables live notification updates.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

Clone this repository, then in the root directory run an `npm install` to install both client-side and server-side dependencies. Set the appropriate environment variables in a .env file in the root directory, if planning to push to production. Run the development server with `npm run develop`, which uses the concurrently package to spin up the server and client server at the same time. Must have MongoDB installed.

## Usage

Create a user account with an email, username and password. Using the menu to the left, you can browse events, create new events, manage your events, and see what events you're attending. Comments can be left on event pages, and if the event manager is logged in they will be immediately notified that a new comment was left on their event. A demonstration version of the app is currently deployed on Heroku [here](https://bash-hub.herokuapp.com/).

![Screenshot](./screenshot.jpg)

## License

[The MIT License](https://mit-license.org/)

Copyright © 2022 branjames117

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

This repository and its contributors follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md).

## Questions

This repository was created and is maintained by [branjames117](https://github.com/branjames117).

With any questions email the repository owner at [branjames117@gmail.com](mailto:branjames117@gmail.com).
