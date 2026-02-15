Hello, welcome to Solomon-bot!

I'll be sharing this to a somewhat public audience, but I don't plan on hosting the bot for other servers, here's what you need to set up your own instance:
- Have node.js installed
- Make an app on the discord developer portal
- Make a .env file in the root folder of this project with the following info in it:
    - TOKEN (should be under Bot section of the website)
    - CLIENT_ID (Application ID on General Information page of your app)
    - GUILD_ID (your development server ID, I think its possible to have it on multiple servers but that's not how I have it set up right now)

- Set up a Mongodb server on atlas (free) or a docker container
    - I set up my container by running: `docker run --name mongo -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=pass mongo:8.25`
    - Add a MONGO_CONNECTION_STRING to .env file, mine looks like this: `mongodb://user:pass@localhost:27017`
    - Make sure to edit "user" & "pass" to something else.

- In the terminal, run npm -i to install the dependencies for this project.

Heres some useful commands:
- npm run dev - this continuously runs the bot & updates it when you save.
- npm run deploy - deploys commands, necessary to run when creating commands, and when modifying options/subcommands.
- npm run delete - deletes all registered commands for this bot from discord.
- npm run roll - you can write some roll tests in die/roller.js and play with it, might get rid of this command later as it was only for testing.

You can also do the command /help in discord to see more about what the bot can do.

I do not know if I'll be accepting many pushes to main, nor do I know how often I will push, since this is more of a hobby thing for me. However, feel free to fork the repo and work on it. If you have a really cool feature or idea & want to talk to me, my Discord username is deefling.