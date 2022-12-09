Hello, welcome to Solomon-bot!

I'll be sharing this to a somewhat public audience & I don't want my bot's vulnerabilities to be exposed, here's what you need to set up your own version:
- have node.js installed
- make an app on the discord developer portal
- make a .env file with the following info in it:
    - TOKEN (should be under Bot section of the website)
    - CLIENT_ID (Application ID on General Information page of your app)
    - GUILD_ID (your development server ID, I think its possible to have it on multiple servers but that's not how I have it set up right now)

- make a mongodb server on atlas (free)
    - add a MONGO_CONNECTION_STRING to .env file

- don't forget to npm -i to install the dependencies

Heres some useful commands:
- npm run dev - this continuously runs the bot & updates it when you save
- npm run deploy - deploys commands, necessary to run when creating commands, and when modifying options/subcommands
- npm run roll - you can write some roll tests in die/roller.js and play with it, might get rid of this command later as it was only for testing

I do not know if I'll be accepting many pushes to main, nor do I know how often I will push, since this is more of a hobby thing for me. However, feel free to fork the repo and work on it. If you have a really cool feature or idea & want to talk to me, my Discord is Deefling#0420
