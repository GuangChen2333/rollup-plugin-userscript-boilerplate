import {Plugin} from "rollup";
import {readFileSync, writeFileSync} from "fs";
import {resolve} from "path";

interface Options {
    metadata: string;
    source: string;
    output: string;
}

function getBoilerplateContent(metadataObject: Map<string, string | string[]>, options: Options) {
    let metadataArray: Array<string[]> = []

    // Push the metadata into the array
    for (let key in metadataObject) {
        let value = metadataObject[key];

        if (Array.isArray(value)) {
            // the key contains multi values
            value.forEach(data => {
                metadataArray.push([key, data]);
            });
        } else {
            metadataArray.push([key, value]);
        }
    }

    // Push the main js to require
    metadataArray.push(["require", resolve(options.source)])

    // Get the max length of the key
    let maxLength = metadataArray.reduce((max, line) =>
        Math.max(max, line[0].split(" ")[0].length), 0);

    // Calc the padding size
    let metadataFormattedArray = metadataArray.map(([key, value]) => {
        const valuePadding = ' '.repeat(maxLength - key.length);
        return `// @${key} ${valuePadding}${value}`;
    });

    return "// ==UserScript==\n" + metadataFormattedArray.join("\n") + "\n// ==/UserScript==";
}

export default function boilerplate(options: Options): Plugin {
    return {
        name: "rollup-plugin-userscript-boilerplate",
        version: "1.0.0",
        async buildEnd(error) {
            let metadataJson = readFileSync(options.metadata, "utf-8");
            let outputPath = resolve(options.output)
            writeFileSync(outputPath, getBoilerplateContent(JSON.parse(metadataJson), options))
            console.log(
                `\x1b[32mPlease open ` +
                `\x1b[4mfile:///${outputPath.replace(/\\/g, "/")}\x1b[0m ` +
                `\x1b[32min your browser.\x1b[0m`
            )
        }
    }
}