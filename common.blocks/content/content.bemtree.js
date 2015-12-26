block('content').content()(function() {
    var page = this.page;

    return [
        {
            elem: 'title',
            content: page.title
        },
        page.content
    ];
});
