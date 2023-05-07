/**
 * @return {string}
 */
export function getDateLog() {
    // Create a new Date object of a current log
    const date = new Date()

    // Convert the date to the local time by adding the local time offset
    const localOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localTime = new Date(date.getTime() - localOffset);

    // Extract the hours, minutes, seconds, and milliseconds
    const hours = localTime.getUTCHours();
    const minutes = localTime.getUTCMinutes();
    const seconds = localTime.getUTCSeconds();
    const milliseconds = localTime.getUTCMilliseconds();

    // Get formatted log
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
