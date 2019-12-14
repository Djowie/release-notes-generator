import * as fs from 'fs';
import { styleCommitMessage } from './helper/markdown-helper';
// import {TSupportedType, SupportedType} from '../types/';
export class Main {

  constructor() {  }
  
  getfile() {
    enum SupportedType {
      FIX = 'fix',
      FEAT = 'feat',
      CHORE = 'chore',
      STYLE = 'style',
      REFACTOR = 'refactor'
    }
    type TSupportedType = SupportedType.FEAT | SupportedType.FIX | SupportedType.CHORE | SupportedType.STYLE | SupportedType.REFACTOR;
    // define commit types
    const supportedTypes: TSupportedType[] = [SupportedType.FEAT, SupportedType.FIX, SupportedType.CHORE, SupportedType.STYLE, SupportedType.REFACTOR];

    let sections: {
      [key: string]: string[]
    } = {
      [SupportedType.FEAT]: [],
      [SupportedType.FIX]: [],
      [SupportedType.CHORE]: [],
      [SupportedType.STYLE]: [],
      [SupportedType.REFACTOR]: []
    };
    
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./src/temp/logs-messages.txt')
    });

    let lines: any[] = [];
    lineReader.on('line', function (line: string) {
      lines.push(line)

    });

   

    //make sure the last line is read, before doing anything
    lineReader.on('close', () => {
      // remove commit hash
     lines
        .map(line => line.slice(9))
        //Make sure we filter out the lines that match our supportedTypes
        .filter(line => {
          return supportedTypes.some(supportedType => line.startsWith(supportedType));
        })
        // for all lines that are supported types:
        .forEach(line => {
          var message = line;
          // Automatically check for each line in which section we can put this.
          supportedTypes.forEach(supportedType => {
            if (line.startsWith(supportedType)) {
              //remove the type from the input line
              message = styleCommitMessage(message, supportedType);


              //push the correct strings into the right section
              sections[supportedType].push(message);
            }
          });
          // fs.writeFile('tmp.txt', JSON.stringify(sections), null, error => {
          // });

        });
    })
    return sections;
    

  }

}

export class FileDecorator{
constructor(json: any){
  console.log(json)
}



}


const main = new Main();
const test = new FileDecorator(main.getfile());
