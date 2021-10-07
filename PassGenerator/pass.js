let $ = (selector) => document.querySelector(selector);

let getSymbol = (min, max) => {
    return function() {
        let code = (Math.random() * (max - min) + min).toFixed(0);
        return String.fromCharCode(code)
    }
};

let getBigChar = getSymbol(65, 90);
let getSmallChar = getSymbol(97, 122);
let getNum = getSymbol(48, 57);

function generatePass() {
    let settings = [getSmallChar];
    $("#bigChar").checked && settings.push(getBigChar)
    $("#nums").checked && settings.push(getNum)

    let pass = "";
    for(let i = 0; i < +$("#length").value; i++){
        let symb = (Math.random() * (settings.length - 1)).toFixed(0);
        pass += settings[symb]();
    }
    
    return pass;
}
