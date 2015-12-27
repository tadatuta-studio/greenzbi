block('content')(
    content()(function() {
        return {
            elem: 'inner',
            mix: { block: 'page', elem: 'section' },
            content: applyNext()
        };
    }),

    elem('title').tag()('h1')
);
