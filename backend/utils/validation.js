export function testFor(isNotValid, errormessage){
    if (isNotValid) {
        throw new Error(errormessage);
    }
}