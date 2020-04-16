var discord = require("discord.js")
var knockknock = require('knock-knock-jokes')
var client = new discord.Client();
require("dotenv").config();
const fetch = require('node-fetch');
const mongoose = require('mongoose')
var unirest = require('unirest');


//mongoose database connect
//mongoose.connect("mongodb://localhost:27017/joke", {useNewUrlParser: true, useUnifiedTOpology: true})


var jokos = new mongoose.Schema({
	joke: String,
	name: String,
})
var Joke = mongoose.model("Joke", jokos)

client.on("ready", function(){
	console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", function(msg){
	if(msg.content === "ping"){
		msg.reply("Pong")
	}
})
client.on("message", function(msg){
	if(msg.content === "k!mom"){
		let owner = new discord.MessageAttachment("https://media.giphy.com/media/ir9CLRixW7H4k/giphy.gif")	
		console.log(owner)
		msg.channel.send(owner)
	}		
})
client.on("message", function(msg){
	if(msg.content === `k!who`){
		msg.reply("DECLAN MADE THIS BOT STUPID!")
	}		
})
client.on("message", function(msg){
	if(msg.content === "k!s-joke") {
		if(msg.author.id === "441695016885288963"){
			msg.reply("Jai Stop")
		}else {
			Joke.find({}, function(err, data){
				if(err){
					console.log(err)
				}else {
					let alt = Math.floor(Math.random() * data.length)
					let help = new discord.MessageEmbed()
					help.setTitle("Joke")
					help.setColor("#FFFF00")
					help.addField("Joke", data[alt].joke,true)
					help.setFooter(data[alt].name)
					msg.reply(help)
				}
			})			
		}
	}
})
client.on("message", function(msg){
	if(msg.content === "k!gabe") {
		msg.channel.send(`<@646473079865999398> wake up`)
	}
})
client.on("message", function(msg){
	if(msg.content === "k!knock"){
		msg.channel.send(knockknock())
	}
})
client.on("message", function(msg){
	if(msg.content === "k!chuck"){
		fetch("https://api.chucknorris.io/jokes/random")
			.then(res => res.json())
			.then(json => {
				console.log(json)
				msg.channel.send(json.value)
			})
	}
})
client.on("message", function(msg){
	if(msg.content === "k!joke"){
		fetch("https://official-joke-api.appspot.com/random_joke")
			.then(res => res.json())
			.then(json => {
				console.log(json)
				msg.channel.send(json.setup)
				msg.channel.send(`|| ${json.punchline} ||`)
			})
	}
})
client.on("message", function(msg){
	if(msg.content === "k!help"){
		let help = new discord.MessageEmbed()
		help.setTitle("Commands")
		help.setAuthor("Decavacado(Discord name: doctergame)")
		help.setColor("#FFFF00")
		help.addFields({name: "k!knock", value: "Knock Knock joke"},{name: "k!gabe", value: "To wake up gabe", },{name: "k!joke", value: "Random joke"}, {name: "k!chuck", value: "Chuck Norris Jokes"},{name: "k!kanye", value: "Random Kanye Quotes"}, {name: "k!server", value: "Gives you the server info"}, {name: "k!wake", value: "Takes in an Argument and sent wakes up that person"}, {name: "k!add", value: "Add a joke to the server jokes"}, {name: "k!s-joke", value: "Jokes for the server"}, {name: "k!urban", value: "Search Urban Dictionary take one argument"})
		help.addField("k!random", "Take arg1 and arg2 and finds a random number between them", true)
		help.addField("k!rps <arg>", "Rock Paper Scissors", true)
		help.setFooter("There are secret commands ")
		help.setThumbnail("https://toppng.com/uploads/preview/emoji-transparent-laughing-emoji-11550234631y6jwxckdn1.png")
		msg.reply(help)
	}
})
client.on("message", function(msg){
	if(msg.content === "k!kanye"){
		fetch("https://api.kanye.rest/")
			.then(res => res.json())
			.then(json => {
				msg.channel.send("Kanye west once said " + json.quote)
			})
	}
})
client.on("message", function(msg){
	if(msg.content === "k!server"){
		let help = new discord.MessageEmbed()
		help.setTitle("Server Info")
		help.setAuthor("JOKO")
		help.setColor("#FFFF00")
		help.addFields({name:"Server", value: msg.guild.name}, {name: "Server Owner", value: msg.guild.owner}, {name: "MemberCount", value: msg.guild.memberCount})
		help.setFooter("Server Info")
		help.setThumbnail(`https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png?size=128`)
		console.log(msg.guild)
		msg.channel.send(help)
	}
})
client.on('message', function(msg){
	let coms = "k!wake"
	if(msg.content.startsWith(coms)){
		let args = [...msg.content]
		let com = args.slice(' ')
		let real = []
		let cons = ""
		for (let i = 0; i <= coms.length; i++) {
			com.shift();
		}
		for (let i = 0; i < com.length; i++) {
			real.push(com[i]);
			cons = cons + com[i]
		}
		if(cons == "random" || cons == "Random"){
			let real = []
			msg.guild.members.cache.forEach(function(value, key) {
				console.log(key)
				real.push(key)
			})
			let ran = Math.floor(Math.random() * real.length)
			msg.reply(`Wake up buddy ${msg.author} needs you  <@${real[ran]}>`)
			console.log(real)
		}else {
			let guild =  new discord.Guild(client)
			let user = msg.mentions.users.first()
			console.log(args)
			console.log(com)
			console.log(user)
			//console.log(msg.guild)
			if (user === undefined) {
				msg.channel.send("Try Again with the @")
			}else {
				msg.channel.send(`Wake up buddy ${msg.author} needs you  ${user}`)			
			}			
		}
		//console.log(guild.members.cache)
	}
})
client.on("message", function(msg){
	let coms = "k!add"
	if(msg.content.startsWith(coms)){
		if(msg.author.id === "441695016885288963"){
			msg.reply("Jai stop")
		}else {
			let args = [...msg.content]
			let com = args.slice(' ')
			let real = []
			let cons = ""
			for (let i = 0; i <= coms.length; i++){
				com.shift()
			}
			for (let i = 0; i < com.length; i++){
				real.push(com[i])
				cons = cons + com[i]
			}
			console.log(args)
			console.log(com)
			console.log(real)
			jokes.push(cons)
			if(cons === "") {
				msg.reply("You are adding nothing come on dude")
			}else {
				let jokese = new Joke({joke: cons, name: msg.author.username})
				jokese.save(function(err, jokes) {
					if(err){
						console.log(err)
					}else {
						console.log(jokes)
						console.log("It work")
					}
				})
				let world = Joke.find({}, (err, doc) => {
					if(err){
						console.log(err)
					}else {
						console.log(doc[0])
					}
				});
				msg.reply("Its been added to the jokes database")		
		}
		console.log(jokes)
		console.log(Joke)			
		}
	}
})
client.on("message", function(msg){
	let coms = "k!random"
	if(msg.content.startsWith(coms)){
		let args = [...msg.content]
		let com = args.slice(' ')
		console.log(com)
		let cons = " "
		let real = []
		for (let i = 0; i < coms.length; i++) {
			com.shift()
		}
		for (let i = 0; i < com.length; i++) {
			real.push(com[i])
			cons = cons + com[i]
		}
		let fun = cons.split(/(\S\w*)/)
		fun.shift()
		let arg1 = parseInt(fun[0])
		let arg2 = parseInt(fun[2])

		if(arg1 > arg2) {
			msg.reply("The first argument has to be lower than the second retard")
		}else if(isNaN(arg1)) {
			msg.reply("Really retard")		
		}else if(isNaN(arg2)) {
			msg.reply("Really Retard")
		}else {
			let ran = Math.floor(Math.random() * (arg2 - arg1) ) + arg1
			console.log(arg1)
			console.log(arg2)
			console.log(fun)
			msg.reply(`Your Random Number is ${ran}`)				
		}
		console.log(arg1 == NaN)
	}
})
client.on("message", function(msg){
	let coms = "k!urban"
	if(msg.content.startsWith(coms)){
		if(msg.author.id === "441695016885288963"){
			msg.reply("jai...")
		}else {
			let args = [...msg.content]
			let com = args.slice(' ')
			let cons = " "
			let real = []
			for(let i = 0; i <= coms.length; i++){
				com.shift()
			}
			for(let i = 0; i < com.length; i++){
				real.push(com[i])
				cons = cons + com[i]
			}
			console.log(cons)
			let req = unirest("GET", "https://mashape-community-urban-dictionary.p.rapidapi.com/define")
			req.query({
				"term": cons
			})
			req.headers({
				"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
				"x-rapidapi-key": "KEY_HERE"
			});		
			req.end(function(res){
				if(res.error){
					console.log(res.errors)
				}else {
					if(res.body.list.length > 0) {
						let ran = Math.floor(Math.random() * res.body.list.length)
						console.log(res.body.list[ran])
						let help = new discord.MessageEmbed()
						help.setTitle(cons)
						help.setColor("#FFFF00")
						help.addFields({name: "Definition", value: res.body.list[ran].definition}, {name: "Example", value: res.body.list[ran].example})
						help.setFooter(` @${res.body.list[ran].author}`)
						msg.reply(help)						
					}else {
						let help = new discord.MessageEmbed()
						help.setTitle(cons)
						help.setColor("#FFFF00")
						help.addField("Sorry", "Sorry nothing Found", true)
						msg.reply(help)
					}
				}
			})			
		}
	}
})
client.on("message", function(msg){
	let coms = "k!remove"
	if(msg.content.startsWith(coms)){
		let args = [...msg.content]
		let com = args.slice('')
		let cons = ""
		let real = []
		for (let i = 0; i <= coms.length; i++) {
			com.shift()
		}
		for (let i = 0; i < com.length; i++){
			cons = cons + com[i]
		}
		if(msg.author.username === "doctergame"){
			Joke.deleteOne({joke: cons}, function(err,succes){
				if(err){
					msg.reply("Damn You gone fucked up")
				}else {
					msg.reply("fetus deletus")
				}
			})			
		}else {
			msg.reply("You dont look like declan to me")
		}
		console.log(com)
		console.log(cons)
	}
})
var usera;
var usernamee;
client.on("message", function(msg){
	let coms = "k!kick"
	if(msg.content.startsWith(coms)){
		let user = msg.mentions.users.first()
		msg.channel.send(`Vote to kick ${user}`)
		console.log(user)
		usera = msg.mentions.members.first();
		usernamee = msg.mentions.users.first();
		console.log(usera)
	}
})
client.on("message", function(msg){
	if(msg.author.id === "656341736842330137" && msg.content.startsWith("Vote to kick")){
		msg.react('👍')
			.then(function(){
				console.log(msg.reactions)
			})
			.catch(function(err){
				console.log(err)
			})
		msg.react("👎")
			.then(function(){
				console.log(msg.reactions)
				if(usera.user.id == usera.guild.ownerID || usera.user.id === "656341736842330137"){
					msg.channel.send("Sorry you cant kick that users")
				}else {
					setTimeout(function(){
						console.log(msg.reactions)
						let real = []
						msg.reactions.cache.forEach(function(value, key){
							real.push(value.count)
						})
						if(real[0] + real[1] >= 6){
							if(real[0] > real[1]){
								usera.kick("You were kicked by a majority vote").then(function(){
									msg.channel.send(`user was kicked`)
								}).catch(function(err){
									msg.reply("Something went wrong")
									console.log(err)
								})
								console.log(usera)
							}else if(real[0] < real[1]){
								msg.channel.send("Not Kicked")
							}else if(real[0] === real[1]){
								msg.channel.send("The votes equaled out")
							}
						}else {
							msg.channel.send("Not enough of votes")
						}
					}, 30000)					
				}
			})
			.catch(function(err){
				console.log(err)
			})
	}
})
client.on("message", function(msg){
	let coms = "k!rps"
	if(msg.content.startsWith(coms)){
		let args = [...msg.content]
		let com = args.slice('')
		let cons = ""
		for(let i = 0; i <= coms.length; i++){
			com.shift()
		}
		for (let i = 0; i < com.length; i++) {
			cons = cons + com[i]
		}
		let argu = cons.toLowerCase();
		if(argu === ""){
			msg.reply("Dingus add an argument ```ROCK  || PAPER || SCISSORS ```")
		}else {
			if(argu === "scissors" || argu === "rock" || argu === "paper"){
				let real = ["scissors", "rock", "paper"]
				let ran = real[Math.floor(Math.random() * real.length)]

				//scissors
				if(argu === ran){
					msg.reply(ran)
					msg.reply(`We tied we both picked ${ran}`)
				}else if(argu === "scissors" && ran === "paper"){
					msg.reply(ran)
					msg.reply(`You won.You choose ${argu}`)
				}else if(argu === "scissors" && ran === "rock"){
					msg.reply(ran)
					msg.reply(`I won.I choose ${ran}`)
				}else if(argu === "rock" && ran === "rock"){
					msg.reply(ran)
					msg.reply(`We tied we both picked ${ran}`)
				}else if(argu === "rock" && ran === "scissors"){
					msg.reply(ran)
					msg.reply(`You won.You choose ${argu}`)
				}else if(argu === "rock" && ran === "paper"){
					msg.reply(ran)
					msg.reply(`I won.I choose ${ran}`)
				}else if(argu === "paper" && ran === "paper"){
					msg.reply(ran)
					msg.reply(`We tied we both picked ${ran}`)
				}else if(argu === "paper" && ran === "rock"){
					msg.reply(ran)
					msg.reply(`You won.You choose ${argu}`)					
				}else if(argu === "paper" && ran === "scissors"){
					msg.reply(ran)
					msg.reply(`I won.I choose ${ran}`)					
				}
			}
		}
		console.log(cons)
	}
})
client.login(process.env.DIS_KEY)
console.log("WORKED")
console.log(client)
