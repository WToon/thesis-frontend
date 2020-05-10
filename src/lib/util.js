// Append query params to the URL
export function buildUrl(url, params) {
    params.forEach(param => url.searchParams.append(param.name, param.value))
    return url
}

export function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}
