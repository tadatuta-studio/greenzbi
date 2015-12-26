/**
 * html-from-bemtree
 * =================
 *
 * Собирает *html*-файл с помощью *bemtree* и *bemhtml*.
 *
 * **Опции**
 *
 * * *String* **bemhtmlTarget** — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
 * * *String* **bemtreeTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemtree.js`.
 * * *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.html`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb/techs/html-from-bemjson'));
 * ```
 */
var vow = require('vow'),
    vfs = require('enb').asyncFs,
    asyncRequire = require('enb-async-require'),
    dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('html-from-bemtree')
    .target('destTarget', '?.html')
    .useSourceFilename('bemtreeTarget', '?.bemtree.js')
    .useSourceFilename('bemhtmlTarget', '?.bemhtml.js')
    .builder(function(bemtreeFilename, bemhtmlFilename) {
        dropRequireCache(require, bemhtmlFilename);

        return vow.all([
                asyncRequire(bemtreeFilename),
                asyncRequire(bemhtmlFilename)
            ])
            .spread(function(bemtree, bemhtml) {
                return bemhtml.BEMHTML.apply(bemtree.BEMTREE.apply({
                    block: 'root',
                    data: {
                        url: '/',
                        pages: require('../../content')
                    }
                }));
            });
    })
    .createTech();
