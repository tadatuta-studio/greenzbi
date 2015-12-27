var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    marked = require('marked'),
    mkdirp = require('mkdirp'),
    glob = require('glob'),

    outputFolder = 'output',
    contentFolder = 'content',
    bundleName = 'index',
    pathToBundle = path.join('desktop.bundles', bundleName),

    model = require(path.resolve('.', contentFolder, 'model')),
    BEMTREE = require(path.resolve('.', pathToBundle, bundleName + '.bemtree')).BEMTREE,
    BEMHTML = require(path.resolve('.', pathToBundle, bundleName + '.bemhtml')).BEMHTML;

mkdirp.sync(outputFolder);

['min.js', 'min.css'].forEach(function(ext) {
    fs.createReadStream(path.join(pathToBundle, bundleName + '.' + ext))
        .pipe(fs.createWriteStream(path.join(outputFolder, bundleName + '.' + ext)));
});

model.forEach(function(page) {
    var html,
        pageFolder = path.join(outputFolder, page.url),
        pageFilename= path.join(pageFolder, 'index.html');

    mkdirp.sync(pageFolder);

    if (page.source.indexOf('.md') > -1) {
        var md = fs.readFileSync(path.join(contentFolder, page.source), 'utf8');
        html = marked(md);
    } else {
        var files = glob.sync(path.join(contentFolder, page.source)),
            previews = files.filter(function(file) {
                return file.indexOf('-150x150') > -1;
            });

        mkdirp.sync(path.join(outputFolder, 'photos'));
        files.forEach(function(file) {
            fs.createReadStream(file).pipe(fs.createWriteStream(path.join(outputFolder, 'photos', path.basename(file))));
        });

        html = BEMHTML.apply({
            block: 'gallery',
            content: previews.map(function(preview) {
                return {
                    block: 'link',
                    mods: { preview: true },
                    url: path.basename(preview.replace('-150x150', '')),
                    content: {
                        block: 'image',
                        url: path.basename(preview)
                    }
                };
            })
        });
    }

    fs.writeFileSync(pageFilename, BEMHTML.apply(BEMTREE.apply({
        block: 'root',
        data: {
            url: page.url,
            relPathToRoot: page.url ? '../' : '',
            pages: model,
            content: html
        }
    })));
});

console.log('Site was generated at', path.resolve(outputFolder));
