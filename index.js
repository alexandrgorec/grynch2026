require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const fs = require('fs');
const users = new Set();

const grynchVerify = (message) => {
    if (message.match(/гринч|ГРЫНЧ|grynch/gi))
        return true;
    else return false;
}

const snegovikVerify = (message) => {
    if (message.match(/snegovik|снегов/gi))
        return true;
    else return false;
}

bot.start((ctx) => {
    const userId = ctx.from.id;
    users.delete(userId); // refresh user states
    users.add(userId);
    users.userId = {};
    const user = users.userId;
    user.state = "inputGrynch";
    let startMessage = 'К нам на праздники приходит,\n'
    startMessage += 'В шубу он одетый.\n'
    startMessage += 'У него пустой мешок —\n'
    startMessage += 'Ничего в нём нету!\n'
    startMessage += 'Злой, зелёный и ужасный,\n'
    startMessage += 'Неприятный, жутко страшный.\n'
    startMessage += 'Ненавидит он детишек:\n'
    startMessage += 'И девчонок, и мальчишек\n'
    startMessage += 'На уме его одно —\n'
    startMessage += 'Как похитить Рождество!\n'
    startMessage += 'И, конечно, он не принц.\n'
    startMessage += 'Одинокий, жуткий ...\n';
    const photoStream = fs.createReadStream('./imgs/start.jpeg');
    ctx.replyWithPhoto({ source: photoStream }, { caption: startMessage });
});

bot.on("message", ctx => {
    let message = ctx.message.text;
    const userId = ctx.from.id;
    const user = users.userId;



    switch (user.state) {
        case "inputGrynch": {

            if (grynchVerify(message)) {
                user.state = "waiting";
                let replyText = "Кажется кто-то хотел себе новый зарядник? теперь он МОЙ, ахахАХАХА!!!"
                ctx.replyWithVideo({
                    source: './videos/steal.MP4'
                }, {
                    caption: replyText
                });
                setTimeout(() => {
                    const photoStream = fs.createReadStream('./imgs/olen.png');
                    let replyMessage2 = 'Привет\nя генномодифицированый пес санты!'
                    ctx.replyWithPhoto({ source: photoStream }, { caption: replyMessage2 });
                }, 20000);
                setTimeout(() => {
                    ctx.reply("Хотя кого я обманываю, я просто олень!")
                }, 25000);
                setTimeout(() => {
                    const keyboardMarkup = {
                        reply_markup: {
                            keyboard: [["Поймаем засранца 🐾"]],
                            resize_keyboard: true, // Optional: makes the keyboard smaller
                            one_time_keyboard: true // Optional: keeps the keyboard after a button is pressed
                        }
                    };
                    ctx.reply("Гринч оставил следы! я могу его выследить! для этого мне понадобится твоя помощь!\nтебе нужно будет решить две простые задачки, поспеши!", keyboardMarkup)
                }, 30000);
            }
            else {
                ctx.reply("Ответ не верный! попробуй еще раз!")
            }
            break;
        }
        case "inputSnegovik": {
            if (snegovikVerify(message)) {
                user.state = "waiting";
                let message = "Отлично, я вышел на след, Гринч спрятал подарок в этом доме!";
                const photoStream = fs.createReadStream('./imgs/dom.png');
                ctx.replyWithPhoto({ source: photoStream }, { caption: message });
                setTimeout(() => {
                    ctx.reply("Вторая задачка и последняя. Гринч немного поколдавал, заметая следы - он оставил тебе только ОДНУ попытку отгадать задачку, СОБЕРИСЬ!")
                }, 7000);
                setTimeout(() => {
                    ctx.replyWithVideo({
                    source: './videos/laught.mov'
                }, {
                    caption: '🤡🤡🤡 УДАЧИ 🤡🤡🤡!'
                });
                    user.state = 'inputRandom';
                }, 18500);
                setTimeout(() => {
                    const photoStream = fs.createReadStream('./imgs/zadacha2.jpg');
                    ctx.replyWithPhoto({ source: photoStream }, { caption: "Введите правильный ответ, у вас ОДНА попытка!" });
                }, 24000);
                
            } else {
                ctx.reply("Ответ не верный! попробуй еще раз!")
            }
            break;
        }
        case "inputRandom": {
            ctx.reply("Слава богу Гринч тупой и сам не знает ответ на эту загадку!\nЯ могу найти твой подарок, но мне нужно чтобы ты снял магию Гринча, пой песню ДИСКОТЕКА АВАРИЯ - НОВЫЙ ГОД К НАМ МЧИТСЯ!!! СКОРЕЕ, ОТВЛЕКАЙ ЕГО!")
            setTimeout(() => {
                const photoStream = fs.createReadStream('./imgs/mesto.jpg');
                ctx.replyWithPhoto({ source: photoStream }, { caption: "Отлично сработано, я нашел подарок! ВОТ ОН!!!" });
            }, 25000);
            break;
        }

    }

    switch (message) {
        case "Поймаем засранца 🐾": {
            let zagadka = "";
            zagadka += 'Во дворе стоит мужик,\n'
            zagadka += 'К зимним холодам привык,\n'
            zagadka += 'Белый - белый и холодный,\n'
            zagadka += 'Не женатый он, свободный\n'
            zagadka += 'И с ведром на голове,\n'
            zagadka += 'Что за тип, скажите мне ?\n'
            ctx.reply(zagadka);
            user.state = "inputSnegovik";
            break;
        }
    }
})

bot.launch()

