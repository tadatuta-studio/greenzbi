block('nav').content()(function() {
    var data = this.data;

    return data.pages.map(function(page) {
        return page.url === data.url ? {
            block: this.block,
            elem: 'item',
            elemMods: { active: true },
            content: page.title
        } : {
            block: 'link',
            mix: { block: this.block, elem: 'item' },
            url: page.url ? data.relPathToRoot + page.url + '/' : data.relPathToRoot,
            content: page.title
        };
    }, this);
});
