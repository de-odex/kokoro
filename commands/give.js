const config    = require('../config.json'),
      blacklist = require('../data/guildSettings.json');

module.exports = {
    help: 'Give yourself a role',
    usage: '<role>',
    run: (client, msg, args) => {
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) { return msg.channel.send(config.replySet.noPermsBot) };
        // Prevent unready servers from this command
        if (!blacklist[msg.guild.id] || !blacklist[msg.guild.id].blacklistedRoles) {
            return msg.channel.send('\u26A0 \u276f  The server hasn\'t blacklisted any roles yet. This setup is for security reasons. Please blacklist at least 1 role to allow this command.')
        };
        var input = args.join(" ");
        var role = msg.guild.roles.find('name', input);
        if (!role) { return msg.channel.send('\u26A0 \u276f  That role doesn\'t exist.') };
        if (blacklist[msg.guild.id] && blacklist[msg.guild.id].blacklistedRoles) {
            if (blacklist[msg.guild.id].blacklistedRoles.includes(role.id)) { return msg.channel.send('\u26A0 \u276f  You can\'t get that role!') };
        }
        msg.member.addRole(role);
        msg.channel.send(`:clipboard: \u276f  Gave **${role.name}** to ${msg.member.toString()}.`);
    }
}