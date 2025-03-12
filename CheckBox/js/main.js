'use strict';

const checkbox = document.querySelectorAll('input');
const recom = document.getElementById('recom');
const QArray1 = [];
const jobSum = [];
let checkCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const office = [1, 2, 3, 5, 6];//オフィスビジネス
const inform = [2, 3, 6, 11];//情報処理
const car = [0, 5, 7, 8];//自動車
const metal = [0, 4, 7, 8, 9, 10, 11];//金属加工
const machine = [0, 2, 3, 4, 6, 7, 8, 9, 11];//機械・メカトロニクス
const archit = [0, 2, 4, 7, 8, 9, 10];//建築
const plaster = [0, 2, 4, 7, 8, 9, 10, 11];//左官
const coating = [0, 4, 7, 8, 9, 10];//塗装
const wood = [0, 2, 3, 5, 7, 10];//木工
const equipment = [0, 2, 7, 8, 10];//設備施工
const electric = [0, 2, 4, 7, 8, 10, 11];//電気
const printing = [1, 2, 4, 6, 9, 11];//印刷
const apparel = [0, 2, 4, 5, 6, 7, 9, 11];//アパレル
const society = [0, 2, 5];//社会福祉

const page = "https://www.fukuoka-kunren.ac.jp/bunyas/";

function checkTest() {
  for (let i = 0; i < 12; i++) {
    if (checkbox[i].checked) {
      QArray1.push(i);
    }
  }

  if (QArray1.length != 0) {
    console.log("QArray1 : [" + QArray1 + "]");
  }

  const QArray2 = Array.from(new Set(QArray1));

  if (QArray2.length != 0) {
    console.log("QArray2 : [" + QArray2 + "]");
    console.log("QArray2.length : " + QArray2.length);

    for (let i = 0; i < office.length; i++) {
      if (QArray2.indexOf(office[i]) >= 0) {
        checkCount[0] += 1;
      }
    }

    for (let i = 0; i < inform.length; i++) {
      if (QArray2.indexOf(inform[i]) >= 0) {
        checkCount[1] += 1;
      }
    }

    for (let i = 0; i < car.length; i++) {
      if (QArray2.indexOf(car[i]) >= 0) {
        checkCount[2] += 1;
      }
    }

    for (let i = 0; i < metal.length; i++) {
      if (QArray2.indexOf(metal[i]) >= 0) {
        checkCount[3] += 1;
      }
    }

    for (let i = 0; i < machine.length; i++) {
      if (QArray2.indexOf(machine[i]) >= 0) {
        checkCount[4] += 1;
      }
    }

    for (let i = 0; i < archit.length; i++) {
      if (QArray2.indexOf(archit[i]) >= 0) {
        checkCount[5] += 1;
      }
    }

    for (let i = 0; i < plaster.length; i++) {
      if (QArray2.indexOf(plaster[i]) >= 0) {
        checkCount[6] += 1;
      }
    }

    for (let i = 0; i < coating.length; i++) {
      if (QArray2.indexOf(coating[i]) >= 0) {
        checkCount[7] += 1;
      }
    }

    for (let i = 0; i < wood.length; i++) {
      if (QArray2.indexOf(wood[i]) >= 0) {
        checkCount[8] += 1;
      }
    }

    for (let i = 0; i < equipment.length; i++) {
      if (QArray2.indexOf(equipment[i]) >= 0) {
        checkCount[9] += 1;
      }
    }

    for (let i = 0; i < electric.length; i++) {
      if (QArray2.indexOf(electric[i]) >= 0) {
        checkCount[10] += 1;
      }
    }

    for (let i = 0; i < printing.length; i++) {
      if (QArray2.indexOf(printing[i]) >= 0) {
        checkCount[11] += 1;
      }
    }

    for (let i = 0; i < apparel.length; i++) {
      if (QArray2.indexOf(apparel[i]) >= 0) {
        checkCount[12] += 1;
      }
    }

    for (let i = 0; i < society.length; i++) {
      if (QArray2.indexOf(society[i]) >= 0) {
        checkCount[13] += 1;
      }
    }

    for (let i = 0; i < 14; i++) {
      jobSum[i] = checkCount[i];
    }

    let top = 0;
    const topCount = [];

    for (let j = 0; j < 3; j++) {
      for (let i = 1; i < 13; i++) {
        if (jobSum[i] > jobSum[top]) {
          top = i;
          console.log("top : " + top);
        }
      }
      topCount.push(top);
      jobSum[top] = 0;
    }

    for (let i = 0; i < 3; i++) {
      let newA = document.createElement('a');
      let br = document.createElement('br');

      if (topCount[i] == 0) {
        newA.href = page + "11";
        newA.innerText = "オフィスビジネス";
      }

      if (topCount[i] == 1) {
        newA.href = page + "2";
        newA.innerText = "情報処理";
      }

      if (topCount[i] == 2) {
        newA.href = page + "1";
        newA.innerText = "自動車";
      }

      if (topCount[i] == 3) {
        newA.href = page + "7";
        newA.innerText = "金属加工";
      }

      if (topCount[i] == 4) {
        newA.href = page + "8";
        newA.innerText = "機械・メカトロニクス";
      }

      if (topCount[i] == 5) {
        newA.href = page + "6";
        newA.innerText = "建築";
      }

      if (topCount[i] == 6) {
        newA.href = page + "12";
        newA.innerText = "左官";
      }

      if (topCount[i] == 7) {
        newA.href = page + "14";
        newA.innerText = "塗装";
      }

      if (topCount[i] == 8) {
        newA.href = page + "13";
        newA.innerText = "木工";
      }

      if (topCount[i] == 9) {
        newA.href = page + "4";
        newA.innerText = "設備施工";
      }

      if (topCount[i] == 10) {
        newA.href = page + "5";
        newA.innerText = "電気";
      }

      if (topCount[i] == 11) {
        newA.href = page + "3";
        newA.innerText = "印刷";
      }

      if (topCount[i] == 12) {
        newA.href = page + "9";
        newA.innerText = "アパレル";
      }

      if (topCount[i] == 13) {
        newA.href = page + "10";
        newA.innerText = "社会福祉";
      }
      newA.target = "_blank";
      recom.appendChild(newA);
      recom.appendChild(br);
    }

    checkbox[12].remove();
  }
}