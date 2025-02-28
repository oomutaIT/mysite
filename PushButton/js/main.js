"use strict";

{

  /*
  * 1 選択肢をクリックしたら.selectedを付け外し
  * 2 診断するクリックしたら.selected有りで該当分野のscores[]を加算
  * 3 得点の上位3位すべてをspliceしてtop3_score[]に抜き出す
  *   -- 同率で4分野以上あれば、そのすべてを抜き出す
  * 4 もし、4分野以上あれば
  * 　 priorityScores[]で上位3つに絞り、spliceしてexTop3_score[]に抜き出す
  * 5 絞り込んだ上位3分野へのリンクを表示する
  */

  // 表の列番号順
  const fields = [
    { name: 'オフィスビジネス分野', urlNumber: 11 },
    { name: '情報処理分野', urlNumber: 2 },
    { name: '自動車分野', urlNumber: 1 },
    { name: '金属加工分野', urlNumber: 7 },
    { name: '機械・メカトロニクス分野', urlNumber: 8 },
    { name: '建築分野', urlNumber: 6 },
    { name: '左官分野', urlNumber: 12 },
    { name: '塗装分野', urlNumber: 14 },
    { name: '木工分野', urlNumber: 13 },
    { name: '設備施工分野', urlNumber: 4 },
    { name: '電気分野', urlNumber: 5 },
    { name: '印刷分野', urlNumber: 3 },
    { name: 'アパレル分野', urlNumber: 9 },
    { name: '社会福祉分野', urlNumber: 10 },
  ];
  const top3_Fields = [];
  const exTop3_Fields = []; // 同率4つ以上で使用

  // 質問毎の加算するindex値
  const fieldToAdd = [
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
  // 優先質問のindex値（同率で絞り込めなかった場合に使う）
  const priorityNumber = [0, 1, 2, 5];

  // 分野毎の合計得点（14分野）
  const scores = Array(14).fill(0);
  const top3_scores = [];
  const exTop3_scores = []; // 同率4つ以上で使用

  // 優先質問の合計得点（14分野）
  const priorityScores = Array(14).fill(0);
  const top3_priorityScores = [];
  const exTop3_priorityScores = [];

  let maxScoreIndex = 999;  // 計算用
  const maxDisplayNum = 3;  // 表示する分野は３つのみ


  function addScore(index) {
    fieldToAdd[index].forEach(addIndex => {
      scores[addIndex]++;
    });
  }

  function addPriorityScore(index) {
    fieldToAdd[index].forEach(addIndex => {
      priorityScores[addIndex]++;
    });
  }

  // scores[]の最上位を切り出す
  function addToTop3() {
    maxScoreIndex = scores.indexOf(Math.max(...scores));
    top3_scores.push(...scores.splice(maxScoreIndex, 1));
    top3_Fields.push(...fields.splice(maxScoreIndex, 1))
    top3_priorityScores.push(...priorityScores.splice(maxScoreIndex, 1))
  }

  // priorityScores[]の最上位を切り出す
  function addToExTop3() {
    maxScoreIndex = priorityScores.indexOf(Math.max(...priorityScores));
    top3_scores.push(...priorityScores.splice(maxScoreIndex, 1));
    top3_Fields.push(...priorityScores.splice(maxScoreIndex, 1))
    exTop3_priorityScores.push(...top3_priorityScores.splice(maxScoreIndex, 1))
  }


  // 1
  // 選択肢を選んだら.selectを付け外し
  const questions = document.querySelectorAll('.ques li');
  questions.forEach((ques) => {
    ques.addEventListener('click', () => {
      ques.classList.toggle('selected');
    });
  });


  // 診断するが押されたら
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {

    // 2
    // scores[] と priorityScores[] に集計
    questions.forEach((ques, index) => {
      if (ques.classList.contains('selected')) {
        addScore(index);
        if (priorityNumber.includes(index)) {
          addPriorityScore(index);
        }
      }
    });


    // 3
    // scoresから上位3分野の得点をtop3_Scores[]に追加
    for (let i = 0; i < maxDisplayNum; i++) {
      addToTop3(maxScoreIndex);
    }
    // 同率3位があれば更に追加
    scores.forEach(score => {
      if (top3_scores[2] === score) {
        addToTop3();
      }
    });


    // 4
    // 分野が3つに絞り込めてなかったら
    if (top3_scores.length > maxDisplayNum) {

    }


    // 5
    // 結果の表示準備
    const baseURL = 'https://www.fukuoka-kunren.ac.jp/bunyas/';
    const displayLink = document.querySelectorAll('.result a');
    const displayFields = document.querySelectorAll('.result li');

    document.querySelector('header p').textContent = 'あなたにおススメの分野は・・・';
    document.querySelector('.ques').classList.add('hide');
    document.querySelector('.result').classList.remove('hide');

    if (exTop3_scores.length === 0) {
      for (let i = 0; i < maxDisplayNum; i++) {
        displayFields[i].textContent = top3_Fields[i].name;
        displayLink[i].href = baseURL + top3_Fields[i].urlNumber;
      }
    }
    else {
      for (let i = 0; i < maxDisplayNum; i++) {
        displayFields[i].textContent = exTop3_Fields[i].name;
        displayLink[i].href = baseURL + exTop3_Fields[i].urlNumber;
      }
    }


    console.log(top3_scores);
    console.log(top3_Fields);
    console.log(top3_priorityScores);

  });

  // 【--- fix ---】
  // 各種top3[]、exTop3[] を作らず、top3_indexで管理
  //  --> top3_indexにある番号は、探索時に飛ばして対応







}