import Element from "./element.js";
import App from "./app.js";

export default class Write {

    static copyQuote = (event) => {
        event.preventDefault();
        var range, selection, worked;
        let elementId = event.target.id.split('_');
        var element = document.getElementById(elementId[1]);
        console.log(element);
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();        
            range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        
        try {
            document.execCommand('copy');
            App.renderAlert();
        }
        catch (err) {
            alert('unable to copy text');
        }
    }

    static renderTagList = async () => {
        const tagsList  = await App.getTags();
        let markUp      = "";

        if(tagsList != null){
            tagsList.forEach(element => {
                markUp += `<p class="tag" id="${element.name}">${element.name}</p>`;
            });

            Element.tagsList.innerHTML = markUp;
            document.querySelectorAll('.tag').forEach(item => {
                item.addEventListener('click', App.getByTag);
            });
        }
    }

    static renderQuoteList = (quotesList) => {
        let markUp      = "";
        let count = 0;
        Element.quoteList.innerHTML = "";
        const aosArr = ["flip-left", "flip-right", "flip-down", "zoom-in-up", "zoom-in-down"];
        quotesList.forEach(quote => {
            markUp += `<div class="col-md-6" data-aos="${aosArr[Math.floor(Math.random() * aosArr.length)]}" data-aos-easing="ease-out-cubic" data-aos-duration="1000">
                            <div class="quote-box">
                                <h1 class="quote" id="${count}">${quote.text}</h1>
                                <p class="author">
                                    <span class="line"></span>
                                    ${quote.author}, ${quote.tag}

                                </p>
                                <div class="hover-box">
                                    <button type="button" class="btn btn-secondary copy-btn" id="q_${count}" data-toggle="tooltip" data-placement="top" title="Copy Quote">
                                        <i class="far fa-copy" id="q_${count}"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`;
            count++;
        });

        Element.quoteList.innerHTML = markUp;

        document.querySelectorAll('.copy-btn').forEach(item => {
            item.addEventListener('click', Write.copyQuote);
        })
    }

    static renderDataList = (data) => {
        Element.suggetions.innerHTML = "";
        let input   = Element.searchField.value;
        if(data != null){
            for(let i = 0; i < 6; i++){
                if(data[i].name.includes(input)){
                    const option = document.createElement('option');
                    option.setAttribute('value', data[i].name);
                    option.textContent = data[i].name;
                    Element.suggetions.appendChild(option);
                }
            }
        }
    }

    static renderAll = async () => {
        // SIDEBAR TAGS
        Write.renderTagList();

        Write.renderQuoteList( await App.getQuotes());

        App.eventListeners();
    };

}