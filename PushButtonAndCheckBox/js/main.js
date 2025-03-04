const Q1 = document.getElementById('Q1');
const Q2 = document.getElementById('Q2');
const Q3 = document.getElementById('Q3');
const Q4 = document.getElementById('Q4');
const Q5 = document.getElementById('Q5');
const Q6 = document.getElementById('Q6');
const Q7 = document.getElementById('Q7');
const Q8 = document.getElementById('Q8');
const Q9 = document.getElementById('Q9');
const Q10 = document.getElementById('Q10');
const Q11 = document.getElementById('Q11');
const Q12 = document.getElementById('Q12');


document.getElementById('button').addEventListener('click', () => {

  document.querySelector('.question').classList.add('none');
  document.getElementById('button').classList.add('none');
  document.getElementById('text').classList.remove('none');
  document.getElementById('reload').classList.remove('none');


  const flag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // console.log(Q1.checked);

  if (Q1.checked) {
    flag[2]++;
    flag[3]++;
    flag[4]++;
    flag[5]++;
    flag[6]++;
    flag[7]++;
    flag[8]++;
    flag[9]++;
    flag[10]++;
    flag[12]++;
    flag[13]++;
  }

  if (Q2.checked) {
    flag[0]++;
    flag[11]++;
  }

  if (Q3.checked) {
    flag[0]++;
    flag[1]++;
    flag[4]++;
    flag[5]++;
    flag[6]++;
    flag[8]++;
    flag[9]++;
    flag[10]++;
    flag[11]++;
    flag[12]++;
    flag[13]++;
  }

  if (Q4.checked) {
    flag[0]++;
    flag[1]++;
    flag[4]++;
  }

  if (Q5.checked) {
    flag[3]++;
    flag[4]++;
    flag[5]++;
    flag[6]++;
    flag[7]++;
    flag[8]++;
    flag[10]++;
    flag[11]++;
    flag[12]++;
  }

  if (Q6.checked) {
    flag[0]++;
    flag[2]++;
    flag[8]++;
    flag[12]++;
    flag[13]++;
  }

  if (Q7.checked) {
    flag[0]++;
    flag[1]++;
    flag[4]++;
    flag[11]++;
    flag[12]++;
  }

  if (Q8.checked) {
    flag[2]++;
    flag[3]++;
    flag[4]++;
    flag[5]++;
    flag[6]++;
    flag[7]++;
    flag[8]++;
    flag[9]++;
    flag[10]++;
    flag[12]++;
  }

  if (Q9.checked) {
    flag[2]++;
    flag[3]++;
    flag[4]++;
    flag[5]++;
    flag[6]++;
    flag[7]++;
    flag[9]++;
    flag[10]++;
  }

  if (Q10.checked) {
    flag[3]++;
    flag[4]++;
    flag[5]++;
    flag[6]++;
    flag[7]++;
    flag[11]++;
    flag[12]++;
  }

  if (Q11.checked) {
    flag[3]++;
    flag[5]++;
    flag[6]++;
    flag[7]++;
    flag[8]++;
    flag[9]++;
    flag[10]++;
  }

  if (Q12.checked) {
    flag[1]++;
    flag[3]++;
    flag[4]++;
    flag[6]++;
    flag[10]++;
    flag[11]++;
    flag[12]++;
  }

  let max = flag[0];
  for (let i = 1; i <= flag.length; i++) {
    if (max < flag[i]) {
      max = flag[i];
    }
  }
  // console.log(max);

  const anserArray = [];

  for (let i = max; i >= 0; i--) {
    for (let j = 0; j < flag.length; j++) {
      if (flag[j] === i && anserArray.length < 3) {
        anserArray.push(j);
      }
    }
  }

  const link = document.getElementById('link');

  const linkArray = ['https://www.fukuoka-kunren.ac.jp/bunyas/11', 'https://www.fukuoka-kunren.ac.jp/bunyas/2', 'https://www.fukuoka-kunren.ac.jp/bunyas/1', 'https://www.fukuoka-kunren.ac.jp/bunyas/7', 'https://www.fukuoka-kunren.ac.jp/bunyas/8', 'https://www.fukuoka-kunren.ac.jp/bunyas/6', 'https://www.fukuoka-kunren.ac.jp/bunyas/12', 'https://www.fukuoka-kunren.ac.jp/bunyas/14', 'https://www.fukuoka-kunren.ac.jp/bunyas/13', 'https://www.fukuoka-kunren.ac.jp/bunyas/4', 'https://www.fukuoka-kunren.ac.jp/bunyas/5', 'https://www.fukuoka-kunren.ac.jp/bunyas/3', 'https://www.fukuoka-kunren.ac.jp/bunyas/9', 'https://www.fukuoka-kunren.ac.jp/bunyas/10'];

  const fieldArray = ['オフィスビジネス', '情報処理', '自動車', '金属加工', '機械・メカトロニクス', '建築', '左官', '塗装', '木工', '設備施工', '電気', '印刷', 'アパレル', '社会福祉',]

  anserArray.forEach(element => {
    // console.log(element);
    const a = document.createElement('a');
    a.setAttribute('href', linkArray[element]);
    a.setAttribute('target', '_blank');
    link.appendChild(a);
    a.textContent = fieldArray[element] + '分野';
    link.appendChild(document.createElement('br'));
    link.appendChild(document.createElement('br'));
  });

});

document.getElementById('reload').addEventListener('click', () => {
  location.reload();
});


