"use strict";

{

  /*
  * 質問の選択時に.selectedの有無をチェックし、得点を加減算
  * 診断するbtnをクリック時に得点の上位3分野を探索  ・・・top3_score
  *  - 同率で4分野以上あれば、優先質問の合計で再探索・・・exTop3_score
  * 絞り込んだ上位3分野へのリンクを表示する
  */

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
  const exTop3_Fields = [];

  // 質問毎の加算分野
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
  // 分野毎の合計得点
  const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const top3_scores = [];
  const exTop3_scores = [];

  // 優先質問の番号（同率の場合に使う）
  const priorityNumber = [0, 1, 2, 5];

  // 優先質問の合計得点
  const priorityScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const top3_priorityScores = [];
  const exTop3_priorityScores = [];

  let maxScoreIndex = 999;

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

  function addToTop3() {
    maxScoreIndex = scores.indexOf(Math.max(...scores));
    top3_scores.push(...scores.splice(maxScoreIndex, 1));
    top3_Fields.push(...fields.splice(maxScoreIndex, 1))
    top3_priorityScores.push(...priorityScores.splice(maxScoreIndex, 1))
  }

  // 選択肢を選んだらスタイルを適用
  const questions = document.querySelectorAll('.ques li');
  questions.forEach((ques) => {
    ques.addEventListener('click', () => {
      ques.classList.toggle('selected');
    });
  });

  // 診断btnが押されたら
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {
    // scores, priorityScoresに集計
    questions.forEach((ques, index) => {
      if (ques.classList.contains('selected')) {
        addScore(index);
        if (priorityNumber.includes(index)) {
          addPriorityScore(index);
        }
      }
    });

    // scoresから上位3分野を探索
    for (let i = 0; i < 3; i++) {
      addToTop3()
    }

    // 同率3位を探索
    scores.forEach(score => {
      if (top3_scores[2] === score) {
        addToTop3()
      }
    });

    if (top3_scores.length >= 3) {

    }

    // 結果の表示準備
    const baseURL = 'https://www.fukuoka-kunren.ac.jp/bunyas/';
    const displayLink = document.querySelectorAll('.result a');
    const displayFields = document.querySelectorAll('.result li');

    document.querySelector('header p').textContent = 'あなたにおススメの分野は・・・';
    document.querySelector('.ques').classList.add('hide');
    document.querySelector('.result').classList.remove('hide');

    if (exTop3_scores.length === 0) {
      for (let i = 0; i < 3; i++) {
        displayFields[i].textContent = top3_Fields[i].name;
        displayLink[i].href = baseURL + top3_Fields[i].urlNumber;
      }
    }
    else {
      for (let i = 0; i < 3; i++) {
        displayFields[i].textContent = exTop3_Fields[i].name;
        displayLink[i].href = baseURL + exTop3_Fields[i].urlNumber;
      }
    }


    console.log(top3_scores);
    console.log(top3_Fields);
    console.log(top3_priorityScores);


    // scores.fill(0);
  });

  // ---fix---
  // 各種top3配列を作らず、top3_indexで管理
  // top3_indexにある番号は、探索時に飛ばす







}
