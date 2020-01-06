export default {
    getQueryValue(url) {
        let query = decodeURI(url.split('?')[1]);
        let vars = query.split("&");
        let param = {};
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            param[pair[0]] = pair[1];
        }
        return param;
    }
}