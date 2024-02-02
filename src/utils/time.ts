export const getFormattedTime = (time: number): string => {
    const hours   = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = Math.floor(time - (hours * 3600) - (minutes * 60));

    const hoursStr = hours < 10 ? "0"+hours : hours.toString();
    const minutesStr = minutes < 10 ? "0"+minutes : minutes.toString();
    const secondsStr = seconds < 10 ? "0"+seconds : seconds.toString();

    return hoursStr+':'+minutesStr+':'+secondsStr;
}