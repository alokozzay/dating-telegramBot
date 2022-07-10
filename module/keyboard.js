const keyboard = {
    start: [
        [
            '❤️Купить подписку', '👤Мой кабинет'
        ],
        [
            '🔥Сайт для секс-знакомств🔥'
        ],
    ],
    productList: [
        [
            {
                text: 'Подписка на 12 часов | 99 руб.',
                callback_data: '99',  
            }
        ],
        [
            {
                text: 'Подписка на 1 день | 149 руб.',
                callback_data: '149',  
            }
        ],
        [
            {
                text: 'Подписка на 3 дня | 249 руб.',
                callback_data: '249',  
            }
        ],
        [
            {
                text: 'Подписка на 7 дней | 349 руб.',
                callback_data: '349',  
            }
        ],
        [
            {
                text: 'Подписка на 30 дней | 599 руб.',
                callback_data: '599',  
            }
        ],
        [
            {
                text: '‼️ АКЦИЯ ‼️ Подписка на всегда | 1499 руб.',
                callback_data: '1499',  
            }
        ],
        [
            {
                text: 'Главное меню',
                callback_data: 'start',  
            }
        ],
    ],
    profile: [
        [
            {
                text: 'Мои покупки',
                callback_data: 'purchases',  
            }
        ],
        [
            {
                text: 'Главное меню',
                callback_data: 'start',  
            }
        ],
    ],
    check: [
        [
            {
                text: 'КАНАЛ',
                callback_data: 'channel',
                url: 'https://t.me/bkfocus',
            }
        ],
        [
            {
                text: 'Я подписался',
                callback_data: 'start'
            }
        ],
    ],
}

module.exports = keyboard;