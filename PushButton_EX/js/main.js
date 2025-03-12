"use strict";

{

  /*
  * 1 選択肢をクリックしたら.selectedを付け外し
  * 2 診断するクリックしたら.selected有りで該当分野のscores[]を加算
  * 3 得点の上位3位すべてをspliceしてtop3_score[]に抜き出す
  *   -- 同列で4分野以上あれば、そのすべてを抜き出す
  * 4 もし、4分野以上あれば
  * 　 priorityScores[]で上位3つに絞り、spliceしてexTop3_score[]に抜き出す
  * 5 絞り込んだ上位3分野へのリンクを表示する
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

  // 質問毎の加算するindex値
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
  // 優先質問のindex値（同列で絞り込めなかった場合に使う）
  const priorityQuesNum = [0, 1, 2, 5];
  // 優先質問の合計得点（14分野）
  const priorityScores = Array(14).fill(0);

  // 表示する分野は３つのみ
  const maxDisplayNum = 3;



  /*  ------  関数の宣言  ------  */

  // 質問のindexから該当する分野のスコアを加算する
  function addScore(quesIndex) {
    fieldIndexToAddScore[quesIndex].forEach(fieldIndex => {
      fields[fieldIndex].score++;
    });
  }

  // 優先する質問用のスコア加算
  function addPriorityScore(quesIndex) {
    fieldIndexToAddScore[quesIndex].forEach(fieldIndex => {
      priorityScores[fieldIndex]++;
    });
  }




  /*  ------  メインの処理  ------  */

  // 1
  // 選択肢を選んだら.selectを付け外し
  const questions_Li = document.querySelectorAll('.ques li');
  questions_Li.forEach((li) => {
    li.addEventListener('click', () => {
      li.classList.toggle('selected');
    });
  });


  // 診断するが押されたら
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {

    // 2
    // スコアを集計
    questions_Li.forEach((li, quesIndex) => {
      if (li.classList.contains('selected')) {
        addScore(quesIndex);
        if (priorityQuesNum.includes(quesIndex)) {
          addPriorityScore(quesIndex);
        }
      }
    });




    // 3　
    // スコアの降順に並び替える
    fields.sort((a, b) => b.score - a.score);
    console.log(fields);


    // 同列3位までのindexを計算
    let top3_index = 2;
    for (let i = 2; i < fields.length; i++) {

      if (fields[i].score !== fields[i + 1].score)
        break;

      top3_index++;

    }


    // 4
    // 分野が3つに絞り込めてなかったら
    if (top3_index.length >= 3) {
      // 優先質問で再探索

    }


    // 5
    // 結果の表示準備
    document.querySelector('.ques').classList.add('hide');
    document.querySelector('.result').classList.remove('hide');

    const baseURL = 'https://www.fukuoka-kunren.ac.jp/bunyas/';

    const displayLink = document.querySelectorAll('.result a');
    const displayFields = document.querySelectorAll('.result li');

    document.querySelector('header p').textContent = 'あなたにおススメの分野は・・・';

    for (let i = 0; i < maxDisplayNum; i++) {
      displayFields[i].textContent = fields[i].name;
      displayLink[i].href = baseURL + fields[i].urlNumber;
    }



    console.log("同列３位の分野数は…" + top3_index);
    console.log(fields)

  });

}