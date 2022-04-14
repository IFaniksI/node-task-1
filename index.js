const { stdin, stdout } = process;
const util = require("util");
const taskTransform = require("./taskTransform");

const fs = require('fs');
const stream = require("stream");
const {program} = require("commander");
const pipeline = util.promisify(stream.pipeline);


const actionHandler = async () => {
    let args = program.opts();



    try {
        // noinspection JSCheckFunctionSignatures
        await pipeline(
            args['input'] ? fs.createReadStream(args['input']) : stdin,
            new taskTransform(args['action']),
            args['output'] ? fs.createWriteStream(args['output'], {flags: "a"}) : stdout
        );


    } catch (e) {
        process.stderr.write(`Определенно произошла проблема ${e.message}\n`);
        process.exit(1);
    }
}



process.stdin.setEncoding("utf-8");

program
    .requiredOption('-a, --action <string>', 'what function to call')
    .option('-i, --input <filename>')
    .option('-o, --output <filename>')
    .action(actionHandler);
program.parse();

process.on("exit", (code) => stdout.write(`\nКод выхода - ${code}`));

process.on('SIGINT', () => {
    stdout.write('Выход из программы\n')
    process.exit(0)
})
