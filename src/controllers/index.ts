import * as fs from 'fs';
import * as path from 'path';
const fileName = 'formatDetails.json';
class Controllers {
    constructor() {
    }
    public async savePostFormat(newFormat: any): Promise<any> {
        try {
            let postFormats = await this.getFileContent(fileName);
            postFormats = JSON.parse(postFormats);
            postFormats.format[newFormat.type] = {
                "openingTag": newFormat.openingTag,
                "closingTag": newFormat.closingTag
            }
            let response = await this.addNewFormat(fileName, postFormats);
            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    public async formatText(input: any) {
        let moduleOutput1 = input.moduleOutput1;
        let moduleOutput2 = input.moduleOutput2;
        let formatConstructer = [];
        try {
            let postFormats = await this.getFileContent(fileName);
            postFormats = JSON.parse(postFormats);
            for (let i = 0; i < moduleOutput2.length; i++) {
                let typeFormatter = moduleOutput2[i].type
                let obj = {
                    startIndex: moduleOutput2[i].start,
                    openingTag: [postFormats.format[typeFormatter].openingTag],
                    ClosingTag: [postFormats.format[typeFormatter].closingTag],
                    EndIndex: moduleOutput2[i].end,
                    string: moduleOutput1.substring(moduleOutput2[i].start, parseInt(moduleOutput2[i].end))
                }
                formatConstructer.push(obj);
            }
            let str = moduleOutput1
            for (let i = 0; i < formatConstructer.length; i++) {
                str = str.replace(formatConstructer[i].string, formatConstructer[i].openingTag + formatConstructer[i].string + formatConstructer[i].ClosingTag)
                    .replace('<placeholder>', formatConstructer[i].string)
            }
            return Promise.resolve(str);
        } catch (e) {
            return Promise.reject(e);
        }

    }
    private getFileContent(fileName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, 'formatDetails.json'), (err: any, result: any) => {
                if (err) { reject(err) }
                else resolve(result);
            })
        })
    }
    private addNewFormat(filename: string, newFormat: {}) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, 'formatDetails.json'), JSON.stringify(newFormat), (err: any) => {
                if (err) { reject(err) }
                else resolve({
                    data: "Added new Book Successfully"
                });
            })
        })
    }

}

export default Controllers;