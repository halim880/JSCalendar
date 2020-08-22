let curr_col = 7;
let curr_row = 3;
let curr_date = 19;
let curr_month_index = 5;
let curr_year = 2020;

let month_length = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let month_name = ['January', 'Fabruary','March', 'April','May', 'June','July', 'August','September', 'October','November', 'December']
let days = ['sat', 'sun','mon', 'tue','wed', 'thi','fri']

let target_year = 1971;
let target_month_index = 2; 
let target_date = 1;

let total_day = getTotalDay(2020, 1);


function targetSquare(t_y, t_m_i){
    let col = curr_col;
    let row = curr_row;
    let date = curr_date;

    let month_index = curr_month_index;
    let year = curr_year;
/******The loop will run untill total day from current day to the target day******/
    for(let i=0; i<total_day; i++){
        date--;
        if(date!== 0){
            col--;
            if(col == 0){
                col = 7;
                row--;
                if(row == 0){
                    row = 5;
                }
            }
        }
        //if current iterating month get finished initiate the previous month.
        else{
            month_index--;
            //if current iterating year get finished initiate the previous year.
            if (month_index < 0) {
                year--;
                month_index = 11;
                date = 31;
                row = 5;
                col--;
                if(col == 0){
                    col = 7;
                }
            } 
            else {
                if(month_index == 1){ //for leap year add  fab month will contain 29 days;

                    date = month_length[month_index]; //get the month length for current iterating month
                    if (isLeapYear(year)) {
                        date = 29;
                    }
                }
                else date = month_length[month_index]; //get the month length for current iterating month
                row = 5;
                col--;
                if(col == 0){
                    col = 7;
                }
            }

        }

        if((date == 1) && (month_index == t_m_i) && (year == t_y)){
            let target_square = new Array(2);
            target_square[0] = col;
            target_square[1] = row;
            console.log("target sqr : " + target_square);
            return target_square;
        }
    }

    
}


function isLeapYear(year) {
    if(year%4==0){
        return true;
    }
    else false;
}





function getTotalDay(t_y, t_m_i){
    if(isCurrentYear(t_y)){
        return daysFromThisYear(t_m_i);
    }
    else if(isSibling()){
        let m_day = daysFromCurrentYear() + daysFromTargetYear();
        console.log('isSibling : ' + m_day)
        return m_day;
    }

    else
    {
        let c_day = daysFromCurrentYear();
        let t_day = daysFromTargetYear();
        let r_day = daysFromRemainingYear();
        let x_day = daysFromLeapYear();
        return  c_day + t_day + r_day + x_day;
    }
}



function isCurrentYear(t_y){
    if(curr_year == t_y){
        return true;
    }
}

function isSibling(){
    if((curr_year - target_year) == 1) return true;
}


function daysFromThisYear(t_m_i){
    let sum = 0;
    let days_form_current_month = curr_date;

    // days from target month
    let days_from_target_month = 0;
    if (t_m_i == 1) {
        if(isLeapYear(curr_year)){
            days_from_target_month = 29 - target_date;
        }
        else days_from_target_month = 28 - target_date;
    }
    else {
        days_from_target_month = (month_length[t_m_i] - target_date)+1;
    }


    // days from remaining month
    let days_remaining_month = 0;
    if((curr_month_index - t_m_i) > 1){
        for(let i = t_m_i + 1; i < curr_month_index; i++){
            days_remaining_month = days_remaining_month + month_length[i];
        }
    }
    sum = days_form_current_month + days_from_target_month + days_remaining_month;
    console.log("daysFromThisYear: " + sum);

    return sum;
}



function daysFromCurrentYear(){
    let sum = 0;
    for(let i = 0; i<= curr_month_index; i++){
        if (i==1) {
            if(isLeapYear(curr_year)){
                sum = sum + 29;
            }
            else sum = sum + 28;
        }
        else{
            sum = sum + month_length[i];
        }
    }

    let m_day = sum-(month_length[curr_month_index]-curr_date);

    console.log("daysFromCurrentYear:" + m_day);
    return m_day;
}


function daysFromTargetYear(){
    let sum = 0;
    for(let i= target_month_index; i<=11; i++){
        if (i==1) {
            if(isLeapYear(target_year)){
                sum = sum + 29;
            }
            else sum = sum + 28;
        }
        else{
            sum = sum + month_length[i];
        }
    }

    let m_day = sum - target_date;

    console.log("daysFromTargetYear :" + m_day);
    return m_day;
}
function daysFromRemainingYear(){
    let year = (curr_year - target_year) - 1;
    let days = year*365;
    console.log("daysFromRemainingYear" + days);
    return days;
}

function daysFromLeapYear(){
    let end_year = target_year + 1;
    let x_day = 0;
    for(let i = end_year; i<curr_year; i++){
        if(isLeapYear(i)){
            x_day++;
        }
    }
    console.log("daysFromLeapYear :"+ x_day);
    return x_day;
}