import { minify } from '@swc/core';
import fs from 'fs';

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const code = fs.readFileSync(inputFile, 'utf-8');
const minified = await minify(code, {
    compress: true,
    mangle: true,
    sourceMap: false,
    format: {
        comments: false
    }
});

fs.writeFileSync(outputFile, minified.code);