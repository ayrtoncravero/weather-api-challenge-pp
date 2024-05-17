export const formattedTimezoneHelper = (timezoneOffset: number): string => {
    try {
        const hours: number = Math.abs(Math.floor(timezoneOffset / 3600));
        const minutes: number = Math.abs(Math.floor((timezoneOffset % 3600) / 60));

        const sign: string = timezoneOffset >= 0 ? '+' : '-';

        return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } catch(error: any) {
        console.log('error: ', error.message);
        throw error;
    }
};
