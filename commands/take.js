const config    = require('../config.json'),
      blacklist = require('../data/guildSettings.json');

module.exports = {
    help: 'Take a role from yourself',
    usage: '<role>',
    run: (client, msg, args) => {
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) { return msg.channel.send(config.replySet.noPermsBot) };
        var input = args.join(" ");
        var role = msg.member.roles.find('name', input);
        if (!role) { return msg.channel.send('\u26A0 \u276f  You don\'t have that role.') };
        msg.member.removeRole(role);
        msg.channel.send(`:clipboard: \u276f  Took **${role.name}** from ${msg.member.toString()}.`);
    }
}