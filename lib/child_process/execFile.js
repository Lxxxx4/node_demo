const { execFile } = require('child_process');
// const exex_promise = require('util').promisify(exec);

execFile('node', ['./script.js'], (err, stdout, stderr) => {
    if (err) {
        console.log(`occur a err: ${err}`);
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
})