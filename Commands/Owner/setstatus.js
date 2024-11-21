const Discord = require('discord.js')
const cor = require('../../config').discord.color
const { description } = require('../Utilidade/ping')
const { options } = require('../..')
const DONO = "257304537944162304"


module.exports = {
    name: 'setstatus',
    description: 'Configure meu status',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "status",
            description: "Qual estilo você deseja aplicar (online, dnd, idle, invisible)?",
            required: true,
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "descrição",
            description: "Qual será a descrição do status?",
            required: true,
        }
    ],

    run: async (client, interaction) => {
        const embed = new Discord.EmbedBuilder()
        .setColor(cor)
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })

        if (interaction.user.id !== DONO) return interaction.reply({ content: `Apenas o meu dono pode utilizar este comando!`, ephemeral: true })

        try {

            let status = interaction.options.getString("status");
            let desc = interaction.options.getString("descrição");

            client.user.setStatus(`${status}`);

            client.user.setPresence({
                activities: [{
                    name: desc
                }],
            });

            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Status atualizado!")
            .addFields(
                {
                    name: `🔮 Mudei meu status para:`,
                    value: `\`${status}\`.`,
                    inline: false
                },
                {
                    name: `📝 Mudei minha descrição para:`,
                    value: `\`${desc}\`.`,
                    inline: false
                }
            )

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            return console.log(`Ops ${interaction.user}, algo deu errado ao executar este comando.`)
        }
    }
}