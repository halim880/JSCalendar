


/********************************************** Display Calendar *****************************************/
// global scope
let date = 1;
let col = 0;
let row = 0;
// global scope ends

function displayMonth(t_y, t_m_i){
    document.getElementById('month_name').innerHTML = month_name[t_m_i];
    document.getElementById('full_year').innerHTML = t_y;
}


function displayWeek(){
    for(let i = 0; i<days.length; i++){
        const div = document.createElement('div');
        let p = document.createElement('p');
        p.innerHTML = days[i];
        div.appendChild(p);
        document.querySelector('.days').appendChild(div);
    }

}

function displayDates(target_year, target_month_index){
    createFirstRow(target_year, target_month_index);
    createMiddleRows();
    let needed = (month_length[target_month_index] + 1) - date;
    if(needed<=7){
        createLastRow(needed);
    }
    else {
        createLastRow(7);
        needed = (month_length[target_month_index] + 1) - date;
        modifyFirstRow(needed);
    }
}

function createFirstRow(t_y, t_m_i){
    let t_sqr = targetSquare(t_y, t_m_i)
    let s_col =t_sqr[0]-1;
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

/************************************************** Display Calendar end *****************************************/ 



/************************************************** Display Target Info  Start************************************/ 

function assignTargetInfo(){
    resetCalendar();
    target_year = parseInt(document.getElementById('select_target_year').value);
    target_month_index = parseInt(document.getElementById('select_target_month').value);

    displayMonth(target_year, target_month_index);
    displayWeek();

    total_day = getTotalDay(target_year, target_month_index);
    displayDates(target_year, target_month_index);

    document.querySelector('.wrapper').classList.remove('hide');

    displayTargetData();
}

function resetCalendar(){
    document.querySelector('.days').innerHTML = '';
    document.querySelector('.dates').innerHTML = '';
    date = 1;
}


// Dummy data for testing
let db = [
    {
        year: 2019,
        month:[
            {
                month_index: 0,
                data: [1, 4, 7, 9, 24]
            },
            {
                month_index: 1,
                data: [3, 4, 6, 8, 14]
            },
            {
                month_index: 2,
                data: [1, 4, 7, 9, 24]
            },
            {
                month_index: 3,
                data: [1, 4, 7, 9, 24]
            }
        ]

    }
]

function displayTargetData(t_y, t_m_i){
    let attendance = db[0].month[0].data;
    t_month = month_length[t_m_i]
    t_year = t_y;

    for(let i = 0; i<attendance.length; i++){
        let id = createIdforTarget(attendance[i])
        document.getElementById(id).parentElement.classList.add('present');
    }
}

function createIdforTarget(date){
    return (date + 100).toString();
}
/**************************************************Display Target Info Ends************************************/ 


// log the ID of clicked square
function clicked(e){
    console.log(e.id);
}