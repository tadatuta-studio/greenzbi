block('gallery')(
    js()(true),
    content()(function() {
        return [
            applyNext(),
            {
                block: 'modal',
                mods: { theme: 'islands', autoclosable: true }
            }
        ];
    })
);
