"use strict";

{

  /*
  * 1 選択肢をクリックで .selected を付け外し
  * 2 診断するクリックで selected 有りで該当分野の score を加算
  * 3 score の値で fields を降順ソート
  * 4 診断結果の表示準備
  * 5 score 上位から 結果表示にセットする
  *   -- 同列最下位が複数になる場合はランダムでセット
  */



  /*  ------  変数の宣言  ------  */

  // 顧客からの要望書にある表の順番
  const fields = [
    { name: 'オフィスビジネス分野', urlNumber: 11, score: 0 },
    { name: '情報処理分野', urlNumber: 2, score: 0 },
    { name: '自動車分野', urlNumber: 1, score: 0 },
    { name: '金属加工分野', urlNumber: 7, score: 0 },
    { name: '機械・メカトロニクス分野', urlNumber: 8, score: 0 },
    { name: '建築分野', urlNumber: 6, score: 0 },
    { name: '左官分野', urlNumber: 12, score: 0 },
    { name: '塗装分野', urlNumber: 14, score: 0 },
    { name: '木工分野', urlNumber: 13, score: 0 },
    { name: '設備施工分野', urlNumber: 4, score: 0 },
    { name: '電気分野', urlNumber: 5, score: 0 },
    { name: '印刷分野', urlNumber: 3, score: 0 },
    { name: 'アパレル分野', urlNumber: 9, score: 0 },
    { name: '社会福祉分野', urlNumber: 10, score: 0 },
  ];

  // 加算するfieldsのindex値
  const fieldIndexToAddScore = [
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13], // Q1
    [0, 11], // Q2
    [0, 1, 4, 5, 6, 8, 9, 10, 11, 12, 13],  // Q3
    [0, 1, 4],  // Q4
    [3, 4, 5, 6, 7, 8, 10, 11, 12], // Q5
    [0, 2, 8, 12, 13], // Q6
    [0, 1, 4, 11, 12], // Q7
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 12], // Q8
    [2, 3, 4, 5, 6, 7, 9, 10], // Q9
    [3, 4, 5, 6, 7, 11, 12], // Q10
    [3, 5, 6, 7, 8, 9, 10], // Q11
    [1, 3, 4, 6, 10, 11, 12], // Q12
  ]

  // 表示する分野は３つのみ
  const maxDisplayNum = 3;
  // 選択済みの個数
  let selectedNum = 0;  // 0 の時は診断を押せない


  const questions_Li = document.querySelectorAll('.ques li');
  const btn = document.querySelector('#btn');

  /*  ------  関数の宣言  ------  */

  // 質問のindexから該当する分野のスコアを加算する
  function addScore(quesIndex) {
    fieldIndexToAddScore[quesIndex].forEach(fieldIndex => {
      fields[fieldIndex].score++;
    });
  }


  /*  ------  メインの処理  ------  */

  // 1
  // 選択肢を選んだら.selectを付け外し
  questions_Li.forEach((li) => {
    li.addEventListener('click', () => {
      li.classList.toggle('selected');
      if (li.classList.contains('selected')) {
        selectedNum++;
        btn.classList.add('active');
      }
      else {
        selectedNum--;
        if (selectedNum === 0) {
          btn.classList.remove('active');
        }
      }
    });
  });


  // 診断するが押されたら
  btn.addEventListener('click', () => {
    // 選択肢が１つも押されてなかったら何もしない
    if (selectedNum === 0) {
      return;
    }

    // 2
    // スコアを集計
    questions_Li.forEach((li, quesIndex) => {
      if (li.classList.contains('selected')) {
        addScore(quesIndex);
      }
    });


    // 3　
    // スコアの降順に並び替える
    fields.sort((a, b) => b.score - a.score);


    // 4
    // 結果の表示準備
    document.querySelector('.ques').classList.add('hide');
    document.querySelector('.result').classList.remove('hide');
    document.querySelector('header p').textContent = 'あなたにおススメの分野は・・・';

    const baseURL = 'https://www.fukuoka-kunren.ac.jp/bunyas/';
    const baseSrcPath = 'img/sub';

    const displayLinks = document.querySelectorAll('.result a');
    const displayImages = document.querySelectorAll('.result img');


    // 5
    // 同列で複数存在する場合は、beginからend-1までの数で表現
    let begin = 0;
    let end = 1;
    let count = 0;

    // 点数上位から順にセット
    const setupRecommendField = () => {
      for (let i = begin; i < end; i++) {
        displayLinks[count].href = baseURL + fields[i].urlNumber;
        displayImages[count].src = baseSrcPath + fields[i].urlNumber + ".png";
        count++;
      }
    };

    // MAX表示件数までランダムでセット
    const randomFieldSetup = () => {
      for (let i = begin; count < maxDisplayNum; i++) {
        let setupIndex = Math.floor(Math.random() * (end - begin)) + begin;
        let setupfield = fields.splice(setupIndex, 1)[0];
        displayLinks[count].href = baseURL + setupfield.urlNumber;
        displayImages[count].src = baseSrcPath + setupfield.urlNumber + ".png";
        end--;
        count++;
      }
    };


    for (let i = 0; count < maxDisplayNum; i++) {
      if (fields[i].score === fields[i + 1].score) {
        end++;
        continue;
      }

      // set数が表示数を超えない時は、すべてsetup
      if (count + (end - begin) < maxDisplayNum) {
        setupRecommendField();
        begin = end;
        end++;
      }
      // 表示数を超えるときはランダム
      else {
        randomFieldSetup();
        break;
      }

    }

  });

}
