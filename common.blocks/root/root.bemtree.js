block('root').replace()(function() {
    var data = this.ctx.data,
        relPathToRoot = data.relPathToRoot,
        url = data.url,
        i = 0,
        pages = data.pages,
        len = pages.length;

    // get current page
    for (; i < len; i++) {
        if (pages[i].url === url) {
            this.page = pages[i];
            break;
        }
    }

    this.data = data;

    return {
        block: 'page',
        title: this.page.title,
        favicon: '/favicon.ico',
        head: [
            { elem: 'meta', attrs: { name: 'description', content: 'Крымская рок-группа' } },
            { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
            { elem: 'css', url: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' },
            { elem: 'css', url: relPathToRoot + 'index.min.css' }
        ],
        scripts: [{ elem: 'js', url: relPathToRoot + 'index.min.js' }],
        mods: { theme: 'islands' }
    };
});
