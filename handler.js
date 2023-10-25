const fs = require('fs/promises');
const handlebars = require('handlebars');

exports.htmlCompilator = async (file, context) => {
    const htmlFile = await fs.readFile(file);

    const compilador = handlebars.compile(htmlFile.toString());

    const htmlString = compilador(context);

    return htmlString;
}