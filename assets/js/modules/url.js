export default class UrlManager{
    static apiKey           = "3500244f1e0e7fb7f2647a8c7a70ad56";
    static headUrl          = "https://goquotes-api.herokuapp.com/api/v1/all";
    static random           = "https://goquotes-api.herokuapp.com/api/v1/random";

    static createFindUrl = function(type, value,count){
        let newUrl = (value == null) ? `${UrlManager.headUrl}/${type}` : `${UrlManager.random}/${count}?type=${type}&val=${value}` ;
        return newUrl;
    }

    static createRandomUrl = function(count){
        return `${UrlManager.random}?count=${count}`;
    }
}