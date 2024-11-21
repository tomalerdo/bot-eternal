require('dotenv').config()

const config = {
    discord: {
        token: process.env.DISCORD_BOT_TOKEN,
        color: 'dc51ff'
    }
}

module.exports = config