const http = require('http');
const request = require('request');
const fs = require('fs');
const path = require('path');

const productLinksRegex = /<a href="product\.html&productid=(\d+)"><img/g;
const cardDataRegex = /data-original="([^"]+)" src="([^"]+)".+?<div class="cardtitle"><a href="[^"]+">(?:<img src="[^"]+" alt="[^"]+">)?(.+?)<\/a> \((.+?)\)<\/div>/g;
const cardsDe = {};
const cardsEn = {};

const imageRoot = path.join(__dirname, 'bin/img/cards/de');
const cardTranslations = path.join(__dirname, 'src/locales');

http.get('http://deckbauer.telfador.net/products.html&gameid=1', function (res) {
	var rawData = '';
	res.on('data', function (chunk) { rawData += chunk });
	res.on('end', function () {
		var match = productLinksRegex.exec(rawData);
		var productCnt = 0;
		var allDone = function () {
			if (--productCnt === 0) {
				console.log('all done, writing files now');
				fs.writeFile(path.join(cardTranslations, 'de/cards.js'), 'export default ' + JSON.stringify(cardsDe));
				fs.writeFile(path.join(cardTranslations, 'en/cards.js'), 'export default ' + JSON.stringify(cardsEn));
			}
		}

		while (match != null) {
			productCnt++;
			console.log('productid: ' + match[1])
			http.get('http://deckbauer.telfador.net/product.html&productid=' + match[1], function (res) {
				var rawData = '';
				res.on('data', function (chunk) { rawData += chunk });
				res.on('end', function () {
					console.log('Status ' + res.statusCode + ' for ' + rawData.substr(
															rawData.indexOf('>', rawData.indexOf('<h3')) + 1,
															rawData.indexOf('</h3>') - rawData.indexOf('>', rawData.indexOf('<h3')) - 1
														));
					var pos = 0, id;
					while (rawData.indexOf('cardtitle', pos) > -1) {
						pos = rawData.indexOf('cardtitle', pos);

						pos = rawData.indexOf('&id=', pos) + 4;
						id = rawData.substr(pos, rawData.indexOf('"', pos) - pos);
						cardsDe[id] = {};
						cardsEn[id] = {};
						cardsDe[id].title = rawData.substr(pos, rawData.indexOf('</div>', pos) - pos).replace(/.+>([^<]+)<\/a>.*/, '$1');
						cardsEn[id].title = rawData.substr(pos, rawData.indexOf('</div>', pos) - pos).replace(/.+<\/a> \(([^\)]+)\).*/, '$1');
						if (cardsEn[id].title == '*') {
							cardsEn[id].title = cardsDe[id].title;
						}

						pos = rawData.indexOf('cardtype', pos) + 10;
						cardsDe[id].type = rawData.substr(pos, rawData.indexOf('(', pos) - pos - 1);
						pos = rawData.indexOf('(', pos) + 1;
						cardsEn[id].type = rawData.substr(pos, rawData.indexOf(')', pos) - pos);

						pos = rawData.indexOf('data-original="', pos) + 15;
						cardsDe[id].front = rawData.substr(pos, rawData.indexOf('"', pos) - pos);
						pos = rawData.indexOf('src="', pos) + 5;
						cardsEn[id].back = cardsDe[id].back = rawData.substr(pos, rawData.indexOf('"', pos) - pos);

						if (cardsDe[id].type == 'Abenteuer') {
							cardsDe[id].back = cardsDe[id].front.substr(0, cardsDe[id].front.length - 5) + 'b.png';
							delete cardsEn[id].back;
						}
					}
					allDone();
					/*var match;
					var download = function () {
						match = imageLinkRegex.exec(rawData);
						if (match != null) {
							var imagePath = path.join(imageRoot, match[1]);
							if (!fs.existsSync(imagePath)) {
								fs.mkdirSync(imagePath);
							}
							
							console.log('downloading ' + match[1] + '/' + match[2]);
							request('http://deckbauer.telfador.net/assets/cardgames/lotr/' + match[1] + '/' + match[2]).pipe(fs.createWriteStream(path.join(imagePath, match[2]))).on('close', download);
						}
					};
					download();*/
				});
			});
			match = productLinksRegex.exec(rawData);
		}
	});
});