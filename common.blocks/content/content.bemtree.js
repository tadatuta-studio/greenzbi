block('content').content()(function() {
    return [
        {
            elem: 'title',
            content: this.page.title
        },
        this.data.content
    ];
});
