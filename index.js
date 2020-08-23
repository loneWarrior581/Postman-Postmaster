console.log("this is my javascript project of the series");
let addedparamCount = 0;
//Utility functions:
// 1.utility function to get the DOM element from the string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//hide the parameters box initally
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

//if the user clisks the json box then hiding the params  box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    document.getElementById("jsonBox").style.display = "none"
    document.getElementById("parametersBox").style.display = "block"
})


//if the user enetrs the params radio then hide the json box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    document.getElementById("jsonBox").style.display = "block"
    document.getElementById("parametersBox").style.display = "none"
})

// add more params when the user clicks the + button 
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
    let params = document.getElementById("params");
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Paramater${addedparamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedparamCount + 2}" placeholder="Enter Parameter ${addedparamCount + 2} Key">
                    </div>
                    <div class=" col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedparamCount + 2}"
                            placeholder="Enter the Parameter ${addedparamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                </div>`;
    //convert the dom element string to the dom node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    addedparamCount++;

    //deleting the params when clicked on the - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (items of deleteParam) {
        items.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }

})

// if the user press the submit button
let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
    //show please wait....
    document.getElementById('responsePrism').innerHTML = "Please wait.... Fetching Your response!"

    //fetching all the values user has enetred
    let url = document.getElementById("url").value;
    let requestType = document.querySelector('input[name="requesttype"]:checked').value;
    let contentType = document.querySelector('input[name="contenttype"]:checked').value;

    //if the user has selected the pareams option insted of json collect all the parameters in an object

    if (contentType == "params") {
        data = {};
        for (i = 0; i < addedparamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value
                let value = document.getElementById('parameterValue' + (i + 1)).value
                data[key] = value;
            }
            data = JSON.stringify(data);
        }

    }
    else {
        data = document.getElementById('requestjsonText').value
    }
    console.log(data);

    if (requestType == "GET") {
        fetch(url).then((response) => {
            return response.text();
        }).then((data) => {
            // document.getElementById('responsejsonText').value = data
            document.getElementById('responsePrism').innerHTML = data;
            Prism.highlightAll();
        })
    }
    else {
        fetch(url, {
            method: "POST",
            body:data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.text();
        }).then((data) => {
            // document.getElementById('responsejsonText').value = data;
            document.getElementById('responsePrism').innerHTML = data;
            Prism.highlightAll();
        })
    }
})
