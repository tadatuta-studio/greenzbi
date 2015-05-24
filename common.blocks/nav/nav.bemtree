block('nav').content()(function() {
    return this.data.pages.map(function(page) {
        return {
            block: 'link',
            mix: { block: 'nav', elem: 'item' },
            url: page.url,
            content: page.title
        };
    });
});
