const https = require('https')
const querystring = require('querystring');
const postData = querystring.stringify({
    "flightWay":"Oneway","dcity":"CTU","acity":"DLC","army":false
  });
  
  const options = {
    hostname: 'https://flights.ctrip.com/itinerary/api/12808/lowestPrice',
    port: 443,
    path: '',
    method: 'POST',
    headers: {
      'Content-Length': Buffer.byteLength(postData),
      'content-type': 'application/json',
      'cookie': '_RF1=222.209.187.168; _RSG=DaqKQGzpnY8WDpYm.qYXOB; _RDG=28e7f17a01ee962328265d6bf8a96cfd47; _RGUID=88b1cfd4-1a53-490d-b621-8b4fb08b3360; _ga=GA1.2.1866937337.1597906091; _gid=GA1.2.2093896843.1597906091; Session=SmartLinkCode=trip&SmartLinkKeyWord=&SmartLinkQuary=_UTF.&SmartLinkHost=www.trip.com&SmartLinkLanguage=zh; MKT_CKID_LMT=1597906091135; MKT_CKID=1597906091134.5yp5f.lws5; MKT_Pagesource=PC; FD_SearchHistorty={"type":"S","data":"S%24%u6210%u90FD%28CTU%29%24CTU%242020-09-30%24%u5927%u8FDE%28DLC%29%24DLC%24%24%24"}; _abtest_userid=55dbe475-fb33-4f0a-a646-6c9140a95cdf; _jzqco=%7C%7C%7C%7C1597906091557%7C1.1464352306.1597906091131.1597908779351.1597908786048.1597908779351.1597908786048.undefined.0.0.7.7; __zpspc=9.1.1597906091.1597908786.7%233%7Cwww.trip.com%7C%7C%7C%7C%23; _bfa=1.1597906088257.4eppv2.1.1597906088257.1597906088257.1.14; _bfs=1.14; _bfi=p1%3D10320673302%26p2%3D10320673302%26v1%3D14%26v2%3D13'
    }
  };
  
  const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // Write data to request body
  req.write(postData);
  req.end();