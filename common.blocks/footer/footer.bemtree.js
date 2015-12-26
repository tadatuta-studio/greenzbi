block('footer').content()(function() {
    return [
        {
            elem: 'left',
            content: '© ' + new Date().getFullYear() + ' Greenzbi'
        },
        {
            elem: 'center',
            content: {
                block: 'share'
            }
        },
        {
            elem: 'right',
            content: {
                block: 'copyright',
                content: [
                    'Сайт разработан в ',
                    {
                        block: 'link',
                        url: 'http://tadatuta.ru/',
                        content: 'tadatuta.ru'
                    }
                ]
            }
        }
    ];
});
