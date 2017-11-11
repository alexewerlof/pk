const crud = require('../../lib/crud');
const format = require('../../lib/format');

// TODO add an option to specify how deep the diff should go
// TODO add an option to diff part of an objects
// TODO add an option to reverse the diff (show similarities)
// TODO make sure we can handle stdin
const command = 'diff <file1> <file2>';
const description = 'Finds the differences between two JSON files or parts of them.';

function builder(yargs) {

}

async function handler() {

}

module.exports = { command, description, builder, handler };
