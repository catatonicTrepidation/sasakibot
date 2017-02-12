var Discord = require("discord.js");
var bot = new Discord.Client();
var schedule = require('node-schedule');
//let now = new Date();
//let now = new Date(Date.now());
//var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()+5);
//console.log(now);
////console.log(Date(Date.now()));
//console.log(date);
//let startTime = new Date(Date.now() + 1000);
//var j = schedule.scheduleJob(date, function(){
//                             console.log("MEOW");
//                             //console.log(date);
//                             });




// Set the prefix
let prefix = "\\";

var sr = {"\\ping":"pangya!", "\\sayhitoyoursister":"Hi, sister! I love you! <3", "\\killchair":"I'll kill you, Chair! <3", "\\<3": "<33", "\\hugsister": "*~Hugs Hottie~* \n I love you, sis! ♥", "\\makelove": "Hnnng, onee samaaa~~"};
//var ranks = ["rank1","rank2","rank3","rank4","rank5","rank6","rank7","rank8","rank9","rank10"];
var ranks = {"1":"Shoujo","2":"Bishoujo","3":"Kawaii Shoujo","5":"Neko Shoujo","7":"Mahou Shoujo","10":"Ojou-sama","15":"Kakkoii Joshi","21":"Onee-chan"};
var theranks = ["Shoujo","Bishoujo","Kawaii Shoujo","Neko Shoujo","Mahou Shoujo","Ojou-sama","Kakkoii Joshi","Onee-chan"];


const fs = require("fs");
//
let points = JSON.parse(fs.readFileSync('points.json', 'utf8'));
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let neko = ["neko.png","neko7.png","neko-girl.jpg","neko_sisters.gif","nekomiku.gif","nekomiku2.png","NekoRemilia.jpg","oi.jpg","nekochan.jpeg"];

bot.on("message", msg => {
       
       //POINTS POINTS POINTS
       
       // if the points don't exist, init to 0;
       if(!points[msg.author.id]) points[msg.author.id] = {points: 0, level: 0, fquote: "Nyan~", rank: "Shoujo" };
       points[msg.author.id].points++;
       
       
       // And then, we save the edited file.
       fs.writeFile('points.json', JSON.stringify(points), console.error);
       
       let userPoints = points[msg.author.id] ? points[msg.author.id].points : 0;
       let curLevel = Math.floor(0.2 * Math.sqrt(userPoints*1.5));
       let fquote = points[msg.author.id].fquote;
       let userLevel = points[msg.author.id] ? points[msg.author.id].level : 0;
       if(userLevel < curLevel) {
       // Level up!
       userLevel = curLevel;
       points[msg.author.id].level++;
       msg.reply("you are now level **" + curLevel + (ranks[curLevel+1] ? "** and rank **" + ranks[curLevel+1] : "") + "** <3");
       if(ranks[curLevel+1]){points[msg.author.id].rank = ranks[curLevel+1];}
       }
       
       if(msg.author.bot) return;
       // Exit and stop if it's not there
       if(!msg.content.startsWith(prefix)) return;
       
       //    for (i = 0; i < responses.length; i++) {
       //       if(msg.content.startsWith(prefix + responses[i]))
       //    }
       
       if (sr[msg.content]) {
       msg.channel.sendMessage(sr[msg.content]);
       };
       
       if (msg.content.startsWith (prefix + "setquote")){
            points[msg.author.id].fquote = msg.content.slice(msg.content.indexOf(" "));
            fquote = points[msg.author.id].fquote;
            msg.channel.sendMessage("Quote.. set!");
       }
       else if (msg.content.startsWith(prefix + "fquote")){
       msg.channel.sendMessage(fquote);
       }
       else if(msg.content.startsWith(prefix + "level")) {
            if(msg.content.split(" ").length > 1){
            let name = msg.content.split(" ")[1];
            if(points[name.slice(2,-1)]){
                msg.channel.sendMessage(name + " is level **" + points[name.slice(2,-1)].level + "** and has **" + points[name.slice(2,-1)].points + "** points");
            }
            else if(points[name.slice(3,-1)]){
                msg.channel.sendMessage(name + " is level **" + points[name.slice(3,-1)].level + "** and has **" + points[name.slice(3,-1)].points + "** points");
            }
            return;
       }
       //msg.content.split(" ")[1]
       msg.reply(`you are currently level **${curLevel}**, with **${userPoints}** points.`);
       //msg.channel.sendMessage(msg.author.id + " : vs. : " + msg.content.split(" ")[1].slice(2,-1));
       //msg.channel.sendMessage(msg.content.split(" ")[1].slice(1));
       //       msg.updateResponse("Meow?");
       //msg.reply(msg.content.split(" ")[1]);
       //msg.reply(().id);
       }
       else if (msg.content.startsWith(prefix + "rank")){
       if(msg.content.split(" ").length > 1){
            let name = msg.content.split(" ")[1];
            if(points[name.slice(2,-1)]){
                msg.channel.sendMessage(name + " is rank **" + points[name.slice(2,-1)].rank + "**");
            }
            else if(points[name.slice(3,-1)]){
                msg.channel.sendMessage(name + " is rank **" + points[name.slice(3,-1)].rank + "**");
            }
            return;
        }
        msg.channel.sendMessage(msg.author + " is rank **" + points[msg.author.id].rank + "**");
       }
       else if(msg.content === prefix + 'date') {
           let d = new Date();
           let dow = ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"];
       msg.channel.sendMessage(d.getDate() + "日" + (d.getMonth()+1) + "月" + d.getFullYear() + "年 **·** " + dow[d.getDay()] + " **·** " + d.getHours()%12 + ":" + d.getMinutes() + ":" + d.getSeconds() + " PST");
       }
       else if (msg.content === prefix + 'avatar') {
       // send the user's avatar URL
       msg.reply(msg.author.avatarURL);
       }
       else if (msg.content === prefix + 'hungry') {
       // send the user's avatar URL
       msg.channel.sendMessage("I made you a delicious bento! :3 \n" +
                               "http://magewappa-bento.com/wp-content/uploads/2015/02/octopus-sausage-bento-2.jpg");
       }
       else if (msg.content === prefix + 'childprocess'){
       msg.channel.sendFile("images/child_process.jpg");
       }
       else if (msg.content === prefix + 'chairxhottie'){
       msg.channel.sendFile("images/chairxhottie.jpg");
       }
       else if (msg.content === prefix + 'logo'){
       msg.channel.sendFile("images/cslogo.png");
       }
       else if(msg.content === prefix + 'neko'){
       msg.channel.sendFile("images/neko/" + neko[Math.floor(Math.random()*neko.length)]);
       }
       else if (msg.content.startsWith(prefix + "say ")){
       msg.channel.sendMessage(msg.content.slice(msg.content.indexOf(" ")));
       }
       else if (msg.content.startsWith(prefix + "lmgtfy ")){
       msg.channel.sendMessage("http://lmgtfy.com/?q=" + msg.content.split(" ").slice(1).join("+"));
       }
       else if (msg.content.startsWith(prefix + "futuresay")){
            args = msg.content.split(" ");
            let now = new Date(Date.now());
            var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+parseInt(args[1]), now.getMinutes()+parseInt(args[2]), now.getSeconds()+parseInt(args[3]));
            var j = schedule.scheduleJob(date, function(){
                    //msg.channel.sendMessage(msg.content.slice(msg.content.indexOf('"')+1));
                    msg.channel.sendMessage(msg.content.slice(msg.content.split(" ", 4).join(" ").length+1));
                });

       }
       
       });
bot.on("guildMemberAdd", (member) => {
       console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
       member.guild.defaultChannel.sendMessage(`Welcome, "${member.user.username}"! :3`);
       });

bot.on('ready', () => {
       console.log('I am ready!');
       });

bot.login(config["token"]);
