export const formattedUnixToStringHelper = (timeUnix: number): string => {
    const date: Date = new Date(timeUnix * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
