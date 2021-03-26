const { exec, execFile } = require('child_process');
const exex_promise = require('util').promisify(exec);
/**
 * exec方法会衍生shell，然后在shell中执行相应命令，并缓冲任何产生的输出。
 * 效率相比较spawn较差
 * 
 * exec基于execFile实现，将execFile方法中options中的shell设为ture
 */

// 使用node执行script文件

exec('node ./script.js', (err, stdout, stderr) => {
    if (err) {
        console.log(`occur a err: ${err}`);
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});


// promisify版本

async function exec_promise_main() {
    const { stdout, stderr } = await exex_promise('node ./script.js');
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
}

exec_promise_main();

// 基于execFile实现的exec方法

function custom_exec(cammand, options, callbak) {
    const opts = normalizeExecArgs(cammand, options, callbak);
    return execFile(opts.file, opts.options, opts.callback);
}

function normalizeExecArgs(command, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    // 浅拷贝
    options = { ...options };
    options.shell = typeof options.shell === 'string' ? options.shell : true;
    return {
        file: command,
        options: options,
        callback: callback
    };
}

custom_exec('node ./script.js', (err, stdout, stderr) => {
    if (err) {
        console.log(`occur a err: ${err}`);
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});