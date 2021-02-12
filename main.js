let regStr = /\s{4,}/ || /--->/;
let regName = /\w*\@/ig;
let regDate = /\d\d:\d\d:\d\d/;
let regIndex = /\d\d\d/;
let logItem = document.querySelector('.log_item');
let sectionTable = document.querySelector('.section_table')
let tableItem = document.querySelector('.table_item');
let table = document.querySelector('.table')

function createTextLog(file) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
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
                let indexToday = arrLog.findIndex(item => item.includes(today))
                let todayArr = arrLog.slice(indexToday)
                logItem.innerHTML = todayArr.map(item => item + '</br>');
            }
        }
    }
    rawFile.send(null);
}

function createArrOfLog(param) {
    let arrReg = [];
    let arrStr = Array.from(logItem.innerHTML.split('<br>,'));
    arrStr.filter((item, index, arr) => {
        let objReg = {};
        let arrCountConect = [];
        let arrCountAddedObj = [];
        let c = 0;
        if (item.includes('Registration of the user')) {
            objReg.regIndex = item.match(regIndex).join('');
            objReg.name = (item.match(regName).join('')).slice(0, (item.match(regName).join('')).length - 1);
            objReg.dateOn = (item.match(regDate)).join('');
            objReg.dateOff = (item.match(regDate)).join('');
            objReg.registr = true;
            arrCountConect = arr.filter((item, index, arr) => {
                if (item.includes('Registration of the user')) {
                    if (item.includes(objReg.name)) {
                        arr.forEach(item2 => {
                            if (item2.includes('Connection with a server is close')) {
                                if (item.includes(objReg.regIndex)) {
                                    objReg.dateFin = (item2.match(regDate)).join('')
                                }
                            }
                        })
                        return objReg.dateOff = item.match(regDate).join('');
                    }
                }
            })
            for (let i = 0; i < arr.length; i++) {
                let count = 0;
                if (arr[i].includes('Open map. Name =')) {
                    if (arr[i].includes(objReg.name))
                        for (let j = i; j < arr.length; j++) {
                            if (arr[j].includes('Append object successful, object number')) {
                                count++
                            } else if (arr[j].includes('Close map, number') || arr[j].includes('Connect timeout (min)')) {
                                break;
                            }
                        }
                    c = count;
                    arrCountAddedObj.push(objReg.name, c)
                }
                objReg.countAddObj = arrCountAddedObj.filter(item => {
                    return item > 0 ? item : 0
                })


            }
            objReg.countReg = (arrCountConect.length);
            arrReg.push(objReg);
        }
    })

    let unique = arrReg.filter((set => item => !set.has(item.name) && set.add(item.name))(new Set));
    return unique;
}

function createTable(good) {
    good.forEach((item, index) => {
        table.insertAdjacentHTML('beforeend', `
        <table class="table">
        <tr>
            <td>${++index}</td>
            <td>${item.name}</td>
            <td>${item.dateOn}</td>
            <td>${item.dateOff}</td>
            <td>${item.dateFin}</td>
            <td>${item.countReg}</td>
            <td>${item.countAddObj}</td>
        </tr>
    </table>`)
    })
}
createTable(createArrOfLog(createTextLog("./gisserver.20210201.log")))