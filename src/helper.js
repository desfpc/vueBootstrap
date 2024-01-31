export default {
    $parseUrl: function (url, params) {
        let parsedUrl = url;
        for (const [key, value] of Object.entries(params)) {
            parsedUrl = parsedUrl.replace('{' + key + '}', value);
        }
        return parsedUrl;
    }
}