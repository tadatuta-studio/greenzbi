block('footer').content()(function() {
    return {
        elem: 'inner',
        mix: [
            { block: 'page', elem: 'section' },
            { block: 'clearfix' }
        ],
        content: applyNext()
    };
});
