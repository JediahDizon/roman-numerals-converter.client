# Roman Numerals Converter - Frontend
For Code reviewers at Strata Health. This applciation lets the user see their input text converted to either Roman Numerals or a decimal number accordingly. This is the front-end for the Roman Numerals converter that makes requests to the `roman-numerals-converter.services` backend for any user input.

Backend: https://github.com/JediahDizon/roman-numerals-converter.service

## System Requirements
- Node JS
	- Required to run the web server

## Install
Not interested in web servers? Just run the included `./dist/index.html` file and you should be good to go.

Still here? You can run the following commands in a command line terminal starting from the root of the project:
- `npm install`
	- This will install the dependencies required to run the front-end project

- `npm run serve`
	- This will serve the website and it can be accessed through `http://localhost/`

## Notes
- Validation and calculated values comes from the backend
- Any changes to the input box is sent to the server to be calculated. Only happens every half a second of input inactivity.
- We use React JS to display a basic Single Page Application alongside Webpack so we can export and share the front-end without needing Node JS
- Use Chrome browser for maximum compatibility

## Screenshots and Videos
#### Usage
[Download Video Footage](https://github.com/JediahDizon/roman-numerals-converter.client/blob/master/assets/Test%20Case.MOV?raw=true "Video Footage")

#### JUnit Test
![Screenshot](https://github.com/JediahDizon/roman-numerals-converter.client/blob/master/assets/Test%20Result.png "JUnit Test")
