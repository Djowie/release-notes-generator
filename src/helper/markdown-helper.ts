export function styleCommitMessage(line: string, type: string ){
    //remove the type from the message
    line = line.replace(type, '');
    //remove () from message
    line = line.replace('(', '**');
    line = line.replace(')', '**');

    //replace dashes from scope with spaced
    line = line.replace(':', ' -');
    //add unsorted markdown to the liens
    line = '* ' + line;


    return line;
}