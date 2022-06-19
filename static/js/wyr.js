
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
};

let questions = {};
let dataSon = {};

$.getJSON("https://raw.githubusercontent.com/sudonorm/would_you_rather/main/categories.json", function (data) {
    //console.log(typeof data)
    dataSon = data;
});

document.getElementById("category").onchange = changeText;
function changeText() {

    let selected = document.getElementById("category").value;
    // let dataSon = {"general": "https://raw.githubusercontent.com/sudonorm/would_you_rather/main/general.json", "dummy":"https://raw.githubusercontent.com/sudonorm/would_you_rather/main/dmyquestions.json"};
    console.log(selected);

    if (selected !== "Select a category...") {
        $.getJSON(dataSon[selected], function (data) {
            //console.log(typeof data)
            questions = data;
        });
    };
};

document.getElementById("get_question").onclick = getQuestion;

function getQuestion() {
    
    let category_selection = document.getElementById("category").value;

    console.log(questions); //json output 
    var keyValues = Object.keys(questions);
    console.log(keyValues);
    let randomKey = get_random(keyValues);

    console.log(questions[randomKey]);
    document.getElementById("question").innerHTML = questions[randomKey];
    localStorage.setItem(category_selection + "_" + String(randomKey), questions[randomKey]);

    document.getElementById("tableBody").innerHTML = "";
    let fullHtml = ""
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        
        let htmll = '<tr><th scope="row">{cat}</th><td>{ques}</td></tr>';
        htmll = htmll.replace("{cat}", localStorage.key(i).split("_")[0]);
        htmll = htmll.replace("{ques}", localStorage.getItem(localStorage.key(i)));
        
        fullHtml = fullHtml + htmll;
        
        console.log(htmll);
        console.log(localStorage.key(i).split("_")[0]);
        console.log( localStorage.getItem( localStorage.key(i)));
    };

    htmll = '<thead><tr><th scope="col">Category</th><th scope="col">Question</th></tr></thead><tbody>' + fullHtml + '</tbody>';
    document.getElementById("tableBody").insertAdjacentHTML("beforeend", htmll);
      
};

document.body.onload = resetStorage;
document.getElementById("reset").onclick = resetStorage;

function resetStorage() {
    document.getElementById("tableBody").innerHTML = "";
    localStorage.clear();

};