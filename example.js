const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://bbs.uestc.edu.cn/forum.php?mod=forumdisplay&fid=25');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();