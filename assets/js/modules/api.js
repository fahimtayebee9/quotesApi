export default class ApiManager{
    static async fetchData(url){
        const response = await fetch(url);
        if(response.status == 200){
            var data = await response.json();
            return data;
        }
    }
}
