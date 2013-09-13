var page = require('webpage').create(),
    system = require('system');

if (system.args.length < 3) {
    console.log('Usage: phantom_htmltopdf.js <URL to render> <destination file>');
    phantom.exit();
}
var sourceUrl = system.args[1],
    destinationFile =  system.args[2];

page.paperSize = {
    width: '210mm',
    height: '297mm',
    border: '0mm',
    margin:{
        bottom: '-50mm',
        top: '0mm'
    }
};

page.open(sourceUrl, function () {
    page.render(destinationFile);
    phantom.exit();
});