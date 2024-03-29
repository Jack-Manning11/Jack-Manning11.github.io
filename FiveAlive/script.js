let idNum = 0;
function switchTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

let activePlayers = [];
let heightNum = 0;
let currHeight;
const form = document.querySelector('form');
const done = document.getElementById('finish');
const make = document.getElementById('make');
const miss = document.getElementById('miss');
const pass = document.getElementById('pass');
const submit = document.getElementById('sbmt');
const columns = document.querySelector('.right');
const next = document.getElementById('next');
const activePlayer = document.querySelector('.activePlayer');
const otherPlayers = document.querySelector('.otherPlayers');
let removedPlayers = document.querySelector('.removedPlayers');
document.getElementById("defaultOpen").click();


let data = [];

class Player {
    constructor(fname, lname, school, startheight){
        this.fname = fname;
        this.lname = lname;
        this.school = school;
        this.startheight = startheight;
        this.attemptNum = 0;
        this.bestHeight = 0;
        this.active = "dormant";
        this.heights = [];
        this.currHeight = [];
        this.id = idNum;
        this.order = [];
        this.place = "";
        idNum += 1;
    }
}



function cellHandling(arr){
    let s = "";
    switch(arr.length){
        case 1:
            s = arr[0] + " | - | -";
        break;
        case 2:
            s = arr[0] + " | " + arr[1] + " | -";
        break;
        case 3:
            s = arr[0] + " | " + arr[1] + " | " + arr[2];
        break;
        default:
            alert("Error in cellHandling");
    }
    return s;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    temp = [];
    const formData = new FormData(form);
    for (const pair of formData.entries()) {
      temp.push(pair[1]);
    }
    form.reset();
    let player = new Player(temp[0],temp[1],temp[2],temp[3]);
    data.push(player);
    let s = temp[0] + " " + temp[1];
    appendRow(s);
});

function columnCreator(){
    for(let i = 0; i < data.length; i++){
        let temp = document.createElement('p');
        let s = data[i].fname + " " + data[i].lname;
        let node = document.createTextNode(s);
        temp.appendChild(node);
        columns.appendChild(temp);
    }
}

make.addEventListener('click', ()=>{
    //add the outcome to the current height array
    activePlayers[0].currHeight[activePlayers[0].attemptNum] = "O";
    //player is finished with this height, so push current standings to the total heights array
    activePlayers[0].heights.push(activePlayers[0].currHeight);
    //grab cell in question and replace with formatted text
    let cell = document.getElementById("my-table").rows[activePlayers[0].id+1].cells;
    cell[heightNum].textContent = cellHandling(activePlayers[0].currHeight);
    //reset currHeight array
    activePlayers[0].currHeight = [];
    activePlayers[0].attemptNum = 0;
    for(let i = 0; i < data.length; i++){
        if(data[i].id == activePlayers[0].id){
            data[i] = activePlayers[0];
        }
    }
    //remove player from active list
    activePlayers.splice(0,1);
    //advance to next athlete
    activeHandling();
});

miss.addEventListener('click', ()=>{
    if(activePlayers.length > 9){
        if(activePlayers[0].attemptNum == 2){
            activePlayers[0].currHeight[activePlayers[0].attemptNum] = "X";
            activePlayers[0].heights.push(activePlayers[0].currHeight);
            let cell= document.getElementById("my-table").rows[activePlayers[0].id+1].cells;
            cell[heightNum].textContent = cellHandling(activePlayers[0].currHeight);
            activePlayers[0].currHeight = [];
            activePlayers[0].active = "inactive";
            for(let i = 0; i < data.length; i++){
                if(data[i].id == activePlayers[0].id){
                    data[i] = activePlayers[0];
                }
            }
            activePlayers.splice(0,1);
            activeHandling();
        } else {
            activePlayers[0].currHeight[activePlayers[0].attemptNum] = "X";
            let cell= document.getElementById("my-table").rows[activePlayers[0].id+1].cells;
            cell[heightNum].textContent = cellHandling(activePlayers[0].currHeight);
            activePlayers[0].attemptNum += 1;
            let temp = activePlayers[0];
            for(let i = 0; i < 4; i++){
                activePlayers[i] = activePlayers[i+1];
            }
            activePlayers[4] = temp;
            activeHandling();
        }
    } else {
        if(activePlayers[0].attemptNum == 2){
            activePlayers[0].currHeight[activePlayers[0].attemptNum] = "X";
            activePlayers[0].heights.push(activePlayers[0].currHeight);
            let cell= document.getElementById("my-table").rows[activePlayers[0].id+1].cells;
            cell[heightNum].textContent = cellHandling(activePlayers[0].currHeight);
            activePlayers[0].currHeight = [];
            activePlayers[0].active = "inactive";
            for(let i = 0; i < data.length; i++){
                if(data[i].id == activePlayers[0].id){
                    data[i] = activePlayers[0];
                }
            }
            activePlayers.splice(0,1);
            activeHandling();
        } else {
            activePlayers[0].currHeight[activePlayers[0].attemptNum] = "X";
            let cell= document.getElementById("my-table").rows[activePlayers[0].id+1].cells;
            cell[heightNum].textContent = cellHandling(activePlayers[0].currHeight);
            activePlayers[0].attemptNum += 1;
            let temp = activePlayers[0];
            for(let i = 0; i < activePlayers.length; i++){
                activePlayers[i] = activePlayers[i+1];
            }
            activePlayers[activePlayers.length-1] = temp;
            activeHandling();
        }
    }
});

pass.addEventListener('click', ()=>{
     //add the outcome to the current height array
     activePlayers[0].currHeight[activePlayers[0].attemptNum] = "P";
     //player is finished with this height, so push current standings to the total heights array
     activePlayers[0].heights.push(activePlayers[0].currHeight);
     //grab cell in question and replace with formatted text
     let cell = document.getElementById("my-table").rows[activePlayers[0].id+1].cells;
     cell[heightNum].textContent = cellHandling(activePlayers[0].currHeight);
     //reset currHeight array
     for(let i = 0; i < data.length; i++){
         if(data[i].id == activePlayers[0].id){
             data[i] = activePlayers[0];
         }
     }
     //remove player from active list
     activePlayers.splice(0,1);
     //advance to next athlete
     activeHandling();
});

let btnCheck = false;
let btns;
next.addEventListener('click', ()=>{
    if(btnCheck == false){
        btnCheck = true;
        buildBtns();
    }
    for(let i = 0; i < data.length; i++){
        if(data[i].active == "removed"){
            let r = prompt("Please type " + data[i].fname + " " + data[i].lname + "'s jumps ");
        }
    }
    let nextHeight = prompt("Please enter the next height in the form of feet'inches");
    let currFeet = parseInt(nextHeight.split("'")[0]);
    let currInches = parseInt(nextHeight.split("'")[1]);
    currHeight = [currFeet, currInches];
    activePlayers = [];
    for (let i = 0; i < data.length; i++){
        if(data[i].active == "dormant" || data[i].active == "active"){
            let feet = parseInt(data[i].startheight.split("'")[0]);
            let inches = parseInt(data[i].startheight.split("'")[1]);
            if(feet < currFeet){
                activePlayers.push(data[i]);
                data[i].active = "active";
            } else if(feet == currFeet && inches <= currInches){
                activePlayers.push(data[i]);
                data[i].active = "active";
            }
        }
    }
    appendColumn(nextHeight);
    activeHandling();
    heightNum+=1;
});

function removeHandling(target){
    let order = [];
    let spliceIndex;
    for(let i = 0; i < data.length; i++){
        if(data[i].id == target.id){
            if(data[i].active == 'active'){
                for(let j = 0; j < activePlayers.length; j++){
                    if(data[i].id == activePlayers[j].id){
                        spliceIndex = j;
                        for(let k = j; k < activePlayers.length; k++){
                            order.push(activePlayers[k].id);
                        }
                    }
                }
                data[i].order = order;
                activePlayers.splice(spliceIndex, 1);
            }
            let div = document.createElement('div');
            let txt = document.createTextNode(data[i].fname + ' ' + data[i].lname + ' is removed');
            div.appendChild(txt);
            div.classList.add('removed-player');
            div.id = data[i].id;
            div.addEventListener('click', (e) => {
                insertHandling(e.target);
            });
            data[i].active = 'removed';
            target.classList.add('removed');
            let removedArray = removedPlayers.childNodes;
            let check = false;
            for(let m = 1; m < removedArray.length; m++) {
                if(data[i].id == removedArray[m].id) {
                    check = true;
                }
            }
            if(check == false) {
                removedPlayers.appendChild(div);
            }
        }
    }
    activeHandling();
}

function insertHandling(target){
    let check = false;
    for(let i = 0; i < data.length; i++){
        if(target.id == data[i].id){
            let currFeet = parseInt(currHeight[0]);
            let currInches = parseInt(currHeight[1]);
            let playerFeet = parseInt(data[i].startheight.split("'")[0]);
            let playerInches = parseInt(data[i].startheight.split("'")[1]);
            if((playerFeet < currFeet) || (playerFeet == currFeet && playerInches >= currInches)){
                data[i].active = 'active';
                for(let j = 0; j < activePlayers.length; j++){
                    for(let k = 0; k < data[i].order.length; k++){
                        if(activePlayers[j].id == data[i].order[k] && check == false){
                            check = true;
                            activePlayers.splice(j,0,data[i]);
                        }
                    }
                }
                if(check == false){
                    activePlayers.splice(activePlayers.length-1,0,data[i]);
                }
            } else {
                data[i].active = 'dormant';
            }
        }
    }
    for(let i = 1; i < removedPlayers.childNodes.length; i++){
        if(removedPlayers.childNodes[i].attributes[0].value == target.attributes[0].value){
            target.remove();
        }
    }
    let headers = document.querySelectorAll('.rowHeader');
    for(let i = 0; i < headers.length; i++){
        if(target.id == headers[i].id){
            headers[i].classList.remove('removed');
        }
    }
    activeHandling();
}

function buildBtns(){
    btns = document.getElementsByClassName("rowHeader");
    for(let i = 0; i < btns.length; i++){
        btns[i].addEventListener('click', (e)=>{
            removeHandling(e.target);
        });
    }
}

function appendColumn(textContent) {
    let tbl = document.getElementById('my-table'), i;
    for (i = 0; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), textContent, 'col',i);
    }
}

function createCell(cell, text, style, position) {
    if(position != 0 && style == 'col'){
        text = " ";
    }
    let div = document.createElement('div');
    let txt = document.createTextNode(text);
    div.appendChild(txt);
    div.setAttribute('class', style);
    if(position == 0){
        if(style == 'col'){
            div.className = "colHeader";
        } else if(style == 'row'){
            div.className = "rowHeader";
            div.id = idNum-1;
        }
    }
    cell.appendChild(div);
}

function appendRow(textContent) {
    let tbl = document.getElementById('my-table'), row = tbl.insertRow(tbl.rows.length), i;
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), textContent, 'row',i);
    }
}

function displayName(p){  
    let aString = "";  
    if(p.attemptNum == 0){
        aString = "1st";
    } else if (p.attemptNum == 1){
        aString = "2nd";
    } else if (p.attemptNum == 2){
        aString = "3rd";
    } else {
        alert("something in the attempt number broke");
    }
    aString = aString + " attempt.";
  
    let displayString = p.fname + " " + p.lname + " on " + aString;
    return displayString;
}

function activeHandling(){
    activePlayer.innerHTML = "";
    let div = document.createElement('div');
    let text;
    if(activePlayers[0]){
        text = displayName(activePlayers[0]);
    }
    let txt = document.createTextNode(text);
    div.appendChild(txt);
    activePlayer.appendChild(div);
    let botDiv = document.createElement('div');

    if(activePlayers.length > 9){
        otherPlayers.innerHTML = "";
        for(i = 1; i < 5; i++){
            let text = displayName(activePlayers[i]);
            let txt = document.createTextNode(text);
            let spacing = document.createElement('br');
            botDiv.appendChild(txt);
            botDiv.appendChild(spacing);
        }
        otherPlayers.append(botDiv);
    } else {
        otherPlayers.innerHTML = "";
        for(i = 1; i < activePlayers.length; i++){
            let text = displayName(activePlayers[i]);
            let txt = document.createTextNode(text);
            let spacing = document.createElement('br');
            botDiv.appendChild(txt);
            botDiv.appendChild(spacing);
        }
        otherPlayers.append(botDiv);
    }
}

document.addEventListener('keydown', (event) => {
    if(event.key == 'z'){
        determineWinner(data);
    }
  });

done.addEventListener('click', ()=>{
    console.log(activePlayers);
});
