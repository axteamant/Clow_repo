import os
import random
import asyncio
from discord.ext import commands
TOKEN = "ODM5MDg4MzkwMTAzNzYwOTI2.YJEj9Q.pb9XH8oLEBXL0_PHWjD5JqQXMy0"
bot = commands.Bot(command_prefix='!')

@bot.command(name="syncbump")
async def notice(ctx):
    bot.remove_command('syncbump')
    while True:
        await ctx.send("!d bump")
        await asyncio.sleep(2 * 60 * 60)
print("started")
bot.run(TOKEN)
