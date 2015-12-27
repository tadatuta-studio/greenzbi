modules.define('gallery', ['i-bem__dom', 'link'], function(provide, BEMDOM, Link) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this.modal || (this.modal = this.findBlockInside('modal'));

                Link.on(this.domElem, 'click', function(e) {
                    e.preventDefault();

                    console.log(e);
                    this.modal
                        .setContent('<img src="' + e.target.domElem.attr('href') + '">')
                        .setMod('visible');
                }, this);
            }
        }
    }
}));

});
