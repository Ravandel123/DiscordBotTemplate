1. Create a new APP (bot) here: https://discord.com/developers/applications
2. Create ".env" file in the main folder. Remember to NEVER upload it to the repository with the public access (bot token gives access to your bot for anyone knowing it).
3. Get a token from your bot page and put it in ".env" file, the exact line you need to add is below (just replace "PUT_YOUR_TOKEN_HERE" with your token):  
	BOT_TOKEN = 'PUT_YOUR_TOKEN_HERE'
4. Install node.js
5. Run:  
	npm install dotenv  
	npm install discord.js  