# GASIFY
Gasify is an api-based web application that is intended to be used to determine the best Fuel Stations near the user.

# Installation Process
### The fOllowing information is designed for Ubuntu 18.04 Users.
1. Connect to server via SSH.
2. Install Node.JS and NPM. `sudo apt-get install nodejs`
3. Test Node.JS and NPM via running `node --version` and `npm --version`
4. Pull the git reposisitory `git pull https://github.com/goliver-neptr/GASIFY.git`
5. Move into the created directory `cd GASIFY/`
6. Run the NPM installer. `npm i`
7. Create configuration file `mv configexample.json config.json`
8. Alter configuration data `sudo nano config.json` (put your API information in)
9. Run server. `node src/app.js`

# Contribution
If you would like to contribute to this project. Fork it and submit a pull-request!
