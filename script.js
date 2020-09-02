var readline = require('readline-sync');
var name = readline.question('輸入一些文字...');
require('./jieba-js-master/scripts/main');
dict1 = require('./jieba-js-master/scripts/data/dictionary.js');
dict2 = require('./jieba-js-master/scripts/data/dict_custom.js');
const translate = require('@vitalets/google-translate-api');

// random int
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
// 去除重複的wordIndex element
function uniq(a) {
	return Array.from(new Set(a));
}

console.log('斷詞需要一些時間...');
_text = name;
node_jieba_parsing([ dict1, dict2 ], _text, function(_result) {
	let wordCut = _result;
	// 斷詞結果
	let wordIndex = []; // 要翻譯的斷詞後位置
	for (i = 0; i < Math.floor(wordCut.length * 0.3); i++) {
		wordIndex.push(getRandomInt(wordCut.length));
	}
	uniq(wordIndex);
	// console.log('wordcut:' + wordCut);
	// console.log('wordindex:' + wordIndex);
	wordIndex.forEach((element) => {
		translate((text = wordCut[element]), (opts = { to: 'en' })).then((res) => {
			wordCut[element] = res.text;
			if (element === wordIndex[wordIndex.length - 1]) {
				console.log('翻譯結果： ' + wordCut.join(''));
			}
		});
	});
});
