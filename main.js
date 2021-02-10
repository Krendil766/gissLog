let regStr = /\s{4,}/ || /--->/;
let regName = /\w*\@[0-9A-Za-zА-Яа-я]*-[0-9A-Za-zА-Яа-я]*/ig;
let regDate = /\d\d:\d\d:\d\d/g;
let regIndex = /\d\d\d/;

let logItem = document.querySelector('.log_item');
let sectionTable = document.querySelector('.section_table')
let tableItem = document.querySelector('.table_item');
let table = document.querySelector('.table')


function createTextLog(file) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;
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
                //let indexToday = arrLog.findIndex(item => item.includes(today))
                //let todayArr = arrLog.slice(indexToday)
                //logItem.innerHTML = todayArr.map(item => item + '</br>');
                logItem.innerHTML = arrLog.map(item => item + '</br>');
            }
        }
    }
    rawFile.send(null);
}

function createArrOfLog(param) {
    let arrDateRegistration;
    let arrIdUsers;
    let arrCountRegistrationUsers;
    let arrUsersRegistration;
    let arrReg = [];
    let newArr = [];
    let arrClos = [];
    let cv;

    let arrStr = Array.from(logItem.innerHTML.split('<br>,'));

    arrStr.filter((item, index, arr) => {
            let objReg = {};
            let arrCount = []
            if (item.includes('Registration of the user')) {
                objReg.regIndex = item.match(regIndex).join('');
                objReg.name = item.match(regName).join('');
                objReg.dateOn = (item.match(regDate)).join('');
                objReg.dateOff = (item.match(regDate)).join('');
                objReg.registr = true;
                arrCount = arr.filter((item, index, arr) => {
                    if (item.includes(objReg.name)) {
                        arr.forEach(item => {
                            if (item.includes('Connection with a server is close')) {
                                if (item.includes(objReg.regIndex)) {
                                    objReg.dateOff = (item.match(regDate)).join('')
                                }
                            }
                        })
                        return objReg.dateFin = (item.match(regDate)).join('');
                    }
                })
                objReg.countReg = (arrCount.length) / 2;
                arrReg.push(objReg);


            }

            /*             newArr = arrReg.filter(item => {
                            if (item.name == objReg.name) {
                                newArr.push(item)
                            }
                        }) */
        })
        /*     let objNew = arrReg.reduce((prev, item) => {
            return (typeof prev[item.name] !== 'undefined') ? {...prev, [item.name]: prev[item.name] + 1 } : {...prev, [item.name]: 1 }
        }, {});
        let arrCount = Object.keys(objNew).map((key) => ({
            [key]: objNew[key]
        })) */

    let arr = [];
    arrReg.forEach((item, i, array) => {
        if (!arr.length) {
            arr.push(item)
        } else {
            let a = arr.find(tmp => tmp !== item)
            arr.push(a)
        }
    })
    console.log(arr);

    return arrReg;
}

function createTable(good) {
    good.forEach((item, index) => {
        table.insertAdjacentHTML('beforeend', `
        <table class="table">
        <tr>
            <td>${index++}</td>
            <td>${item.name}</td>
            <td>${item.dateOn}</td>
            <td>${item.dateOff}</td>
            <td>${item.dateFin}</td>
            <td>${item.countReg}</td>
            <td></td>
        </tr>
    </table>`)
    })

}
createTable(createArrOfLog(createTextLog("./gisserver.20190901.log")))