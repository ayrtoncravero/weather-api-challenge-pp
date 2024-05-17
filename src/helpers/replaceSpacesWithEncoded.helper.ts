
export const replaceSpacesWithEncoded = (string: string | undefined): string => {
    return string?.replace(/ /g, '%20') || '';
};
