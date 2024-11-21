const Discord = require('discord.js')
const { description } = require('../Utilidade/ping')
const { options } = require('../..')
const cor = require('../../config').discord.color

module.exports = {
    name: 'anunciar',
    description: 'Anuncie algo em uma embed.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "título",
            description: "Escreva algo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "descrição",
            description: "Escreva algo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "cor",
            description: "Coloque uma cor em hexadecimal.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    run: async (client, interaction) => {
        const embed = new Discord.EmbedBuilder()
        .setColor(cor)
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            let titulo = interaction.options.getString("título")
            let desc = interaction.options.getString("descrição")
            let cor = interaction.options.getString("cor")
            if (!cor) cor = "Random"
            let chat = interaction.options.getChannel("chat")
            if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`)
    
            let embed = new Discord.EmbedBuilder()
            .setTitle(titulo)
            .setDescription(desc)
            .setColor(cor);
    
            chat.send({ embeds: [embed] }).then( () => { 
                interaction.reply(`✅ Seu anúncio foi enviado em ${chat} com sucesso.`)
            }).catch( (e) => {
                interaction.reply(`❌ Algo deu errado.`)
            })
        }
}
}