var webdriver = require('selenium-webdriver');

jasmine.getEnv().defaultTimeoutInterval = 30000;

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome(["no-sandbox"])).
    build();

describe('basic play tests', function () {
	it('play bossa nova', function (done) {
		driver.get('http://songs.bmg.com/mso/view/playlist/8616E09A9B4B2C53E0D2DD7B12B98631');
		driver.findElement(webdriver.By.className('song__play-button')).click().then(function() {
				driver.findElement(webdriver.By.className('player__title__song-name')).getText().then(function(text) {
				expect(text).toBe('Bossa Moon');
				done();
			});
		});
	});

	it('play call me maybe', function (done) {
		driver.get('http://songs.bmg.com/mso/view/playlist/8616E09A9B4B2C53E0D2DD7B12B98631');
		driver.findElements(webdriver.By.className("song__play-button")).then(function(elements_arr){ 
		    console.log(elements_arr.length);
			elements_arr[1].click().then(function() {
					driver.findElement(webdriver.By.className('player__title__song-name')).getText().then(function(text) {
					expect(text).toBe('Call Me Maybe');
					done();
				});
			});
		});

	});

	it('jump forward bossa nova', function (done) {
		driver.get('http://songs.bmg.com/mso/view/playlist/8616E09A9B4B2C53E0D2DD7B12B98631');
		driver.findElement(webdriver.By.className('song__play-button')).click();
		driver.findElement(webdriver.By.className('player__title__song-name')).getText().then(function(text) {
			driver.findElement(webdriver.By.className('player__progress-bar__bar')).then(function(elem){
				driver.actions().mouseMove(elem).click().perform();
				driver.sleep(1000);
				//expect missing that jump works
				expect(text).toBe('Bossa Moon');
				done();
			}); 
		});
	});
});