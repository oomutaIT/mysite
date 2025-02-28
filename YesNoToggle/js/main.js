
const car = 1;               //自動車
const IT = 2;                //情報
const printing = 3;          //印刷
const air_conditioning = 4;  //空調整備
const electricity = 5;       //電気
const architecture = 6;      //建築
const metal_processing = 7;  //金属加工
const machine = 8;           //機械
const apparel = 9;           //アパレル
const nursing_care = 10;     //介護
const office = 11;           //オフィスビジネス
const plastering = 12;       //左官
const woodworking = 13;      //木工
const coating = 14;          //塗装

// 適性ポイント
let subject_point = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 診断表(URLの番号順で優先表示)
let Diagnosis_chart = [
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],//Q1
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],//Q2
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],//Q3
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],//Q4
    [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],//Q5
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],//Q6
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],//Q7
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],//Q8
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],//Q9
    [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1],//Q10
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],//Q11
    [0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0] //Q12
];


// 得点加算メゾット
function point_sum(Question_number) {

    for (let i = 0; i < 14; i++) {

        if (Diagnosis_chart[Question_number][i] == 1) {
            subject_point[i] = subject_point[i] + 1;
        }
    }
}




// 結果表示ボタンで呼び出し
function Result() {

    for (let i = 0; i < 12; i++) {

        // ラジオボタンの取得
        let radio = document.getElementsByName(`Q${i + 1}`);

        if (radio[0].checked == true) {
            point_sum(i);
        }

    }

    // ポイント上位３つの取り出し
    let Rank_subject = new Array(3);
    for (let i = 1; i <= 3; i++) {

        let big = subject_point[0];
        Rank_subject[i] = 1;

        // 一番高い数値の配列番号を取り出す
        for (let j = 1; j < 14; j++) {

            if (big < subject_point[j]) {
                big = subject_point[j];
                Rank_subject[i] = j + 1;
            }
            // 一番高いデータを除外
            subject_point[Rank_subject[i] - 1] = -1;
        }

        let target = document.getElementById(`Rank${i}`);
        let target_img = document.getElementById(`Rank${i}_img`);

        target.href = `https://www.fukuoka-kunren.ac.jp/bunyas/${Rank_subject[i]}`;
        target_img.src = `img/sub${Rank_subject[i]}.png`;

    }

    document.getElementById('Result').classList.remove('hidden');
    document.getElementById('Question_s').classList.add('hidden');

    // for (let j = 1; j < 14; j++) {
    //     console.log(subject_point[j]);
    // }

    console.log(Rank_subject[1]);
    console.log(Rank_subject[2]);
    console.log(Rank_subject[3]);
}

