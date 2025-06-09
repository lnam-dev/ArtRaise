export const truncateText = (text:string|undefined, maxLength:number) => {
   if(text === undefined) return undefined;
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 3) + "...";
    }
    return text;
};