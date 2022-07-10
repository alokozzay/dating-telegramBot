const TelegramAPI = require('node-telegram-bot-api')

require('dotenv').config();

const mongoose = require('mongoose') // база данных MongoDB
const User = require('./models/users') // експорт модель базы данных

const keyboard =  require ('./module/keyboard')
const messageText =  require ('./module/text.js');

require('dotenv').config();

// подключение к базе данных, в случае ошибки выводим в консоль.
mongoose
    .connect(process.env.TOKENBD, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then((res) => console.log('Connection to DataBase...'))
    .catch( err => console.log(err));

const bot = new TelegramAPI(process.env.TOKEN, { polling: true})
const adm = new TelegramAPI(process.env.TOKEN2, { polling: true})

const linkCheck = `@bkfocus`

bot.onText(/\/start/, async msg => {
    // console.log(msg)
    const Name = msg.from.first_name;
    const UserName = msg.from.username;
    const ChatId = msg.chat.id;
    const UserId = msg.from.id;

    const info = await bot.getChatMember(linkCheck, ChatId)

    if (info.status != 'left') {
        
        const users = new User({ChatId, UserName, Name});
        users
            .save()
            .then(res => console.log('very good!'))
            .catch(err => console.log(err))

        bot.sendMessage(ChatId, messageText.start, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: keyboard.start
            }
        })

    } else {
        bot.sendMessage(ChatId, messageText.check, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: keyboard.check
            }
        })
    }
})

bot.on('message', async msg => {

    const ChatId = msg.chat.id;
    const UserName = msg.from.username;
    const UserId = msg.from.id;
    const Name = msg.from.first_name;
    const info = await bot.getChatMember(linkCheck, ChatId)

    if (info.status != 'left') {

        switch(msg.text) { 

            case '❤️Купить подписку':
                bot.sendMessage(ChatId, messageText.productList, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: keyboard.productList
                    }
                })
                break
            
            case '👤Мой кабинет': 
                bot.sendMessage(ChatId, `👤 Мой кабинет\n\nМой ID: <strong>${UserId}</strong>`, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: keyboard.profile
                    }
                })
                break
            
            case '🔥Сайт для секс-знакомств🔥':
                bot.sendMessage(ChatId, messageText.website, {
                    parse_mode: "HTML",
                })
                break
        }

    } else if(msg.text != '/start') {
        bot.sendMessage(ChatId, messageText.check, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: keyboard.check
            }
        })
    }
    
})


bot.on('callback_query', async query => {

    const ChatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const textPrice = messageText.titleProduct;

    const info = await bot.getChatMember(linkCheck, ChatId)

    if (info.status != 'left') {

            switch(query.data){
                case '99':
                    price(textPrice.price99, messageText.product, ChatId, messageId, 'qiwi.com/n/CRITE671')
                    break
                case '149':
                    price(textPrice.price149, messageText.product, ChatId, messageId, 'qiwi.com/n/CRITE671')
                    break
                case '249':
                    price(textPrice.price249, messageText.product, ChatId, messageId, 'qiwi.com/n/CRITE671')
                    break
                case '349':
                    price(textPrice.price349, messageText.product, ChatId, messageId, 'qiwi.com/n/CRITE671')
                    break
                case '599':
                    price(textPrice.price599, messageText.product, ChatId, messageId, 'qiwi.com/n/CRITE671')
                    break
                case '1499':
                    price(textPrice.price1499, messageText.product, ChatId, messageId, 'qiwi.com/n/CRITE671')
                    break
        
                case 'start':
                    bot.editMessageText(messageText.start, {
                        chat_id: ChatId,
                        message_id: messageId,
                        parse_mode: "HTML",
                    })
                    break
                
                case'purchases':
                    bot.answerCallbackQuery(query.id, "У вас нет покупок!")
                    break
            }

        } else {
            bot.sendMessage(ChatId, messageText.check, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: keyboard.check
                }
            })
    }
    
})

function price (title,text, chatid, msid, link, price) {
    bot.editMessageText(`${title}\n\n${text}`, {
        chat_id: chatid,
        message_id: msid,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: `Оплатить QIWI \ КАРТА`,
                        callback_data: 'qiwi',
                        url: link
                    },
                ],
                [
                    {
                        text: 'Главное меню',
                        callback_data: 'start',
                    },
                ],
            ]
        }
    })
}

// принимаем команду, обрабатываем текст и ссылку на фотографию
// затем собираем список юзеров с базы данных и отправляем сообщение

adm.onText(/\/postphoto/, async msg => {

    // переменная для хранение текста, который мы будем отправлять.
    const sendText = msg.text.split(" ").slice(2).join(" "); 

    //перменная для хранение ссылки фотографии.
    const sendUrl = msg.text.split(" ").slice(1,2).join(" ");

    const log = await User.find( { }, { ChatId: 1, _id: 0 } );
    
    // проходим циклом по всем юзерам
    for (let i = 0; i < log.length; i++) {
        
        bot.sendPhoto(log[i].ChatId, sendUrl, {
            caption: sendText,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: NameButton,
                            callback_data: '1',  
                            url: LinkButton
                        }
                    ],
                ],
            }
        })
                
    }

})


// принимаем команду, обрабатываем текст и ссылку на видео
// затем собираем список юзеров с базы данных и отправляем сообщение

adm.onText(/\/postvideo/, async msg => {

    // переменная для хранение текста, который мы будем отправлять.
    const sendText = msg.text.split(" ").slice(2).join(" "); 

    //перменная для хранение ссылки видео.
    const sendUrl = msg.text.split(" ").slice(1,2).join(" ");

    const log = await User.find( { }, { ChatId: 1, _id: 0 } );
    
    // проходим циклом по всем юзерам
    for (let i = 0; i < log.length; i++) {
        
        bot.sendVideo(log[i].ChatId, sendUrl, {
            caption: sendText,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: NameButton,
                            callback_data: '1',  
                            url: LinkButton
                        }
                    ],
                ],
            }
        })
                
    }

})


// принимаем команду, затем обрабатываем только текст
// затем собираем список юзеров с базы данных и отправляем сообщение

adm.onText(/\/posttext/, async msg => {
    
    // переменная для хранение текста, который мы будем отправлять.
    const sendText = msg.text.split(" ").slice(1).join(" ");

    const log = await User.find( { }, { ChatId: 1, _id: 0 } );
    
    // проходим циклом по всем юзерам
    for (let i = 0; i < log.length; i++) {
        
        bot.sendMessage(log[i].ChatId, sendText, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: NameButton,
                            callback_data: '1',  
                            url: LinkButton
                        }
                    ],
                ],
            }
        })
                
    }

})

adm.onText(/\/namebutton/, async msg => {
    NameButton = msg.text.split(" ").slice(1,2).join(" ");
    
    const ChatId = msg.chat.id;

    adm.sendMessage(ChatId, `name button: ${NameButton}`, {
        parse_mode: 'HTML',
    })
    
})

adm.onText(/\/linkbutton/, async msg => {
    LinkButton = msg.text.split(" ").slice(1,2).join(" ");

    const ChatId = msg.chat.id;

    adm.sendMessage(ChatId, `link button: ${LinkButton}`, {
        parse_mode: 'HTML',
    })
})

adm.onText(/\/nbtnposttext/, async msg => {
    
    // переменная для хранение текста, который мы будем отправлять.
    const sendText = msg.text.split(" ").slice(1).join(" ");

    const log = await User.find( { }, { ChatId: 1, _id: 0 } );
    
    // проходим циклом по всем юзерам
    for (let i = 0; i < log.length; i++) {
        
        bot.sendMessage(log[i].ChatId, sendText, {
            parse_mode: 'HTML',
            
        })         
    }
})

adm.onText(/\/nbtnpostphoto/, async msg => {

    // переменная для хранение текста, который мы будем отправлять.
    const sendText = msg.text.split(" ").slice(2).join(" "); 

    //перменная для хранение ссылки фотографии.
    const sendUrl = msg.text.split(" ").slice(1,2).join(" ");

    const log = await User.find( { }, { ChatId: 1, _id: 0 } );
    
    // проходим циклом по всем юзерам
    for (let i = 0; i < log.length; i++) {      
        bot.sendPhoto(log[i].ChatId, sendUrl, {
            caption: sendText,
            parse_mode: 'HTML',
        })        
    }
})