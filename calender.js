
/******************************* Current Calender information ************************/ 
let current_year = new Date().getFullYear();
let current_month_num = new Date().getMonth();
let current_date = new Date().getDate();
let current_day = ()=>{
    let date = new Date();
    let d = date.toString()
    let day = d.substring(0,3);
    return day;
}
let current_col= () => {
    let c_date = new Date().getDate();
    let id = (100 + c_date).toString();
    let c_sqr__id = document.getElementById(id).parentNode.id;
    let col = c_sqr__id.substring(0,1);
    return col;
}

let current_row= () => {
    let c_date = new Date().getDate();
    let id = (100 + c_date).toString();
    let c_sqr__id = document.getElementById(id).parentNode.id;
    let row = c_sqr__id.substring(1,2);
    return row;
}

let current_month_name = ()=>{
    let d = new Date();
    return d.toString().split(' ')[1];
}
let current_month_length = getMonthLength(current_month_name());
/******************************* Current Calender information end************************/ 


let test = new Date();
let t = test.toString().split(' ')[2];
console.log(t)
// Current calendar info End



let date = 1;
let col = 0;
let row = 0;




function calendar(){
    displayWeek();
    displayDates();
    displayCurrentDate()
}

/********************************************** Display Calendar *****************************************/ 
function displayMonth(){
    document.getElementById('month_name').innerHTML = current_month_name();
    document.getElementById('full_year').innerHTML = current_year;
}


function displayWeek(){
    let days = ['sat', 'sun','mon', 'tue','wed', 'thi','fri']
    for(let i = 0; i<days.length; i++){
        const div = document.createElement('div');
        let p = document.createElement('p');
        p.innerHTML = days[i];
        div.appendChild(p);
        document.querySelector('.days').appendChild(div);
    }

}

function displayDates(){
    createFirstRow();
    createMiddleRows();
    let needed = (current_month_length+1) - date;
    if(needed<=7){
        createLastRow(needed);
    }
    else {
        createLastRow(7);
        needed = (current_month_length+1) - date;
        modifyFirstRow(needed);
    }
}

function createFirstRow(){
    let s_col = startingSqr(c_day(), c_date());
    for(col = 0; col<7; col++){
        if(col<s_col)
        {
           let div = document.createElement('div');
           div.setAttribute('id', 0 + col.toString());
           document.querySelector('.dates').appendChild(div);
        }
        else 
        {
            let div = document.createElement('div');
            div.setAttribute('onclick', 'clicked(this)')
            div.setAttribute('id', 0 + col.toString());
            let p = document.createElement('p');
            p.setAttribute('id', 100 + date);
            p.innerHTML = date;
            div.appendChild(p);
            document.querySelector('.dates').appendChild(div);
            date++;
        }
    }
}


function createMiddleRows(){
    for(row = 1; row<4; row++){
        for (let col = 0; col < 7; col++) 
        {
            let div = document.createElement('div');
            div.setAttribute('onclick', 'clicked(this)')
            div.setAttribute('id', row.toString() + col.toString());
            let p = document.createElement('p');
            p.setAttribute('id', 100 + date);
            p.innerHTML = date;
            div.appendChild(p);
            document.querySelector('.dates').appendChild(div);
            date++;
        }
    }
}
function createLastRow(needed){
    for(let col = 0; col<needed; col++){
        let div = document.createElement('div');
        div.setAttribute('onclick', 'clicked(this)')
        div.setAttribute('id', 4 + col.toString());
        let p = document.createElement('p');
        p.setAttribute('id', 100 + date);
        p.innerHTML = date;
        div.appendChild(p);
        document.querySelector('.dates').appendChild(div);
        date++;
    }
}




function modifyFirstRow(r){
    if(r==1){
        let p = document.createElement('p');
        p.innerHTML = date;
        document.getElementById('00').setAttribute('onclick', 'clicked(this)')
        document.getElementById('00').appendChild(p);
    }
    else
    {
        let p = document.createElement('p');
        p.innerHTML = date;
        document.getElementById('00').setAttribute('onclick', 'clicked(this)')
        document.getElementById('00').appendChild(p);

        let p2 = document.createElement('p');
        p2.innerHTML = date+1;
        document.getElementById('01').setAttribute('onclick', 'clicked(this)')
        document.getElementById('01').appendChild(p2);
    }
}

displayMonth();
/************************************************** Display Calendar end *****************************************/ 



/************************************************** Essential functionality ************************************/ 

//Starting Day of a month
let d = new Date();
let c_day =()=>{
    let x = d.getDay()+ 2;
    if(x>7){x=1}
    return x;
}

let c_date = ()=>{
    return d.getDate();
}

// Returns the month length
function getMonthLength(month_name){
    for(let i=0; i<year.length; i++){
        if(month_name == year[i].name){
           return year[i].length;
        }
    }
}

function isLeapYear(year){
    if(year%4==0){
        return true;
    }
    else false;
}

// Returns the month name
function getMonthName(month_num){
    for(let i=0; i<year.length; i++){
        if(month_num == year[i].month_num){
           return year[i].name;
        }
    }
}


function startingSqr(day_num, date){
    let row = findRow(day_num, date);

     let needed =((date + (7-day_num)) - ((row-1)*7))%7;
     
     if(needed==0){
         starting = 0;
     }
     else
     {
        starting = 7 - needed;
     }
     return starting;
}

function findRow(day_num, date){
    let row = 0;
    let col = 7 - day_num;
    let check = col + date;

    if(check<7){
        row = 1;
    }
    else if (check<14) {
        row = 2;
    } 
    else if (check<21) {
        row = 3;
    } 
    else if (check<28) {
        row = 4;
    } 
    else {
        row = 5;
    }

    return row;
}




displayWeek();
displayDates();

function findDayNumber(name){
    let num = 0;
    switch (name) {
        case 'sat': num = 1;
            break;
        case 'sun': num = 2;
            break;
        case 'mon': num = 3;
            break;
        case 'tue': num = 4;
            break;
        case 'wed': num = 5;
            break;
        case 'thi': num = 6;
            break;
        default: num = 7;
            break;
    }
    return num;
}
function findDayName(num){
    let name = '';
    switch (num) {
        case 1: name = 'sat';
            break;
        case 2: name = 'sun';
            break;
        case 3: name = 'mon';
            break;
        case 4: name = 'tue';
            break;
        case 5: name = 'wed';
            break;
        case 6: name = 'thi';
            break;
        default: name = 7;
            break;
    }
    return name;
}

function clicked(e){
    console.log(e.id);
}


function displayCurrentDate(){
    document.getElementById(current_col() + current_row()).classList.add('currentDate');
}

displayCurrentDate();

function getTheSqrId(date) {
    
}
 