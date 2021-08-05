import ApiManager from "./api.js";
import UrlManager from "./url.js";
import Write from './write.js';

export default class App{

    static count      = 50;
    static toastMixin = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    // Get Quotes From API
    static getQuotes = async () => {
        let result = await ApiManager.fetchData(UrlManager.createRandomUrl(App.count));
        return result.quotes;
    }

    static getTags = async () => {
        let result = await ApiManager.fetchData(UrlManager.createFindUrl('tags', null));
        return result.tags;
    }

    static getAuthors = async () => {
        let result = await ApiManager.fetchData(UrlManager.createFindUrl('authors', null));
        return result.authors;
    }

    static searchAction = async (value) => {
        let result = await ApiManager.fetchData(UrlManager.createFindUrl('tag', value, App.count));
        return result.quotes;
    }

    static getByTag = async (event) => {
        event.preventDefault();
        let result = await App.searchAction(event.target.id);
        Write.renderQuoteList(result);
    }

    static populateDataList = async (event) => {
        event.preventDefault();
        let result = await App.getTags();
        Write.renderDataList(result);
        let value = document.querySelector('#searchField').value;
        if(event.keyCode === 13){
            Write.renderQuoteList(await App.searchAction(value.trim()));
        }
    }

    static eventListeners = () => {
        document.querySelector('#searchField').addEventListener('keyup', App.populateDataList);
    }


    // RENDER ALERT
    static renderAlert = () => {
        App.toastMixin.fire({
            animation: true,
            title: 'Quote Copied...'
        });
    }
};
