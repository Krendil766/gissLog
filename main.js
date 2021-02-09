let regStr = /\s{4,}/ || /--->/;
let regName = /\w*\@\w*-[0-9A-Za-z]*/ig;

let logItem = document.querySelector('.log_item');

function createTextLog(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                //let regRegistr = /\d\d\:\d\d\:\d\d/;
                //let regName = /\w*\@\w*-[0-9A-Za-z]*/ig;
                //let arr = Array.from(allText.split(regRegistr))
                //arr.filter(item => {
                //    if (item.includes('Begin registration of')) {
                //        console.log(item.match(regName));
                //    }
                //})
                let date = new Date();
                let year = date.getFullYear();
                if (year < 10) {
                    year = '0' + year;
                }
                let mon = date.getMonth();
                mon += 1
                if (mon < 10) {
                    mon = '0' + mon;
                }
                let day = date.getDate();
                if (day < 10) {
                    day = '0' + day;
                }
                let today = `${day}/${mon}/${year}`;
                let arrLog = Array.from((allText.split(regStr)));
                let indexToday = arrLog.findIndex(item => item.includes(today))
                let todayArr = arrLog.slice(indexToday)
                logItem.innerHTML = todayArr.map(item => item + '</br>');
            }
        }
    }
    rawFile.send(null);
}

function createTableOfLog(param) {
    let obj = {};
    let arrDateRegistration;
    let arrIdUsers;
    let arrCountRegistrationUsers;
    let arrUsersRegistration;

    let arrStr = Array.from(logItem.innerHTML.split('<br>,'));
    arrStr.filter(item => {
        if (item.includes('Registration of the user')) {
            console.log(item);
        }
    })
}

createTableOfLog(createTextLog("./gisserver.20190901.log"))



let obj = [{
        id: 1,
        name: 'gopp',
        dateOn: '12:12:21',
        dateOff: '18:00:15',
        count: 7,
    },
    {
        id: 2,
        name: 'gk',
        dateOn: '13:18:21',
        dateOff: '18:00:15',
        count: 5,
    },
    {
        id: 3,
        name: 'ci',
        dateOn: '10:08:25',
        dateOff: '17:00:15',
        count: 15,
    },
    {
        id: 4,
        name: 'cn',
        dateOn: '08:28:21',
        dateOff: '15:30:15',
        count: 25,
    },
    {
        id: 5,
        name: 'nts',
        dateOn: '09:35:21',
        dateOff: '17:45:15',
        count: 75,
    }
]

console.log(obj);
//let reg = /\w*\@\w*-[0-9A-Za-z]*/ig