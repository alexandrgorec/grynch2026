require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    console.log("start");
});




// bot.on('message', async (ctx) => {
//     let message = ctx.message.text;
//     const CHATID = ctx.message.chat.id;
//     let user = await db.getUser(ctx.from.id);
//     let room = await db.getRoom(user);
//     const params = {
//         user,
//         ctx,
//         message,
//     }
//     deleteBotMessages(user, CHATID);
//     switch (message) {
//         case commands.textMainMenu: { controller.mainMenu(params); break; }
//         case commands.textRoom: { db.changeUserState(user, states.room); controller.room(params); break; }
//     }

//     switch (user.state) {
//         case states.inputBuyerName: { // check inputed BuyerName

//             break;
//         }
//         //         case states.inputBuySum: {
//         //             if ((Number.isFinite(+message)) && (+message > 0) && (+message < 10000000)) {
//         //                 user.buy.cost = +message;
//         //                 user.state = states.inputBuyDescription;
//         //                 menuKeyboard.reply_markup.keyboard = [[commands.textRoom]];
//         //                 reply('На что потратил? Дай краткое описание расходу:', menuKeyboard, ctx, user)

//         //             } else {
//         //                 menuKeyboard.reply_markup.keyboard = [[commands.textRoom]];
//         //                 reply('Вводи нормальное число, без всякой херни:', menuKeyboard, ctx, user)
//         //             }

//         //             break;
//         //         }
//         //         case states.inputBuyDescription: {
//         //             user.buy.description = message;
//         //             menu.reply_markup.inline_keyboard = [];
//         //             if (user.activeRoom) {
//         //                 user.activeRoom.users.forEach((name, ind) => menu.reply_markup.inline_keyboard.push([{ text: name, callback_data: JSON.stringify({ command: commands.chooseBuyer, data: ind }) }]));
//         //                 menu.reply_markup.inline_keyboard.push([buttons.buys]);
//         //                 reply('Кто из участников платил?', menu, ctx, user, ctx, user)
//         //             }
//         //             else {
//         //                 menu.reply_markup.inline_keyboard = mainMenu;
//         //                 reply('Выберите пункт меню:', menu, ctx, user, ctx, user)
//         //             }
//         //             break;
//         //         }
//     }
//     ctx.deleteMessage();
// });

bot.launch()
  .then(() => {
    console.log('Бот успешно запущен!');
  })
  .catch((err) => {
    console.error('Ошибка при запуске бота:', err);
  });