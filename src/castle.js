exports.sendMessage = (message) => {
    message.channel.send("OI");
}

exports.help = (msg) => {
    msg.channel.send('help');
}