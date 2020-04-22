const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const googleTrends = require('google-trends-api');
const fetch = require('node-fetch');
const path = require('path');
const cors = require ('cors');
const corsOptions = {
  origin: 'https://tedenco-topics.herokuapp.com/', 
  optionsSuccessStatus: 200
}
app.use (cors (corsOptions));
app.options ('*', cors ());
app.use ('/', routes);

const app = express();
const port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
console.log("ok")
var countries =  ["ID","HU","HK","GR","FI","EG","DK","KR","CO","CA","CL","BR","AU","AT","AR","SA","ZA","FR","US","DE","GB","IT","BE","IN","IE","IL","JP","KE","MY","MX","NG","NO","NZ","NL","PH","PL","PT","RO","RU","SG","SE","CH","TW","CZ","TH","TR","UA","VN"]
let nation ="";
var length = -1;
var tab =[]

function googleCall(coutry) {




  googleTrends.dailyTrends({
    geo: nation,
  }, function(err, results) {

    if (err) {
      console.log(err);
    }else{

      const ok = JSON.parse(results);

      const res = ok.default.trendingSearchesDays[0].trendingSearches;
      const str = ok.default.rssFeedPageUrl;
      const strL = str.length
      const lg = str[64] + str[65];
      var glob = ok.default;
      res.map(function(num) {

        var topic = num;
        const trendy = {country:lg,topic:topic}
        let civ = 'tab' + lg;


          tab.push(trendy);
          app.get('/news-trend-'+lg, (req, res) => res.send(tab))


      });



    }
  });

}


function ApiCall(){
  countries.map(function(country){

    nation = country;
    googleCall(country);
  })
}

ApiCall();


//newsCall();
//setInterval(function(){newsCall()}, 3600000);



app.listen(port, () =>
console.log('Express server is running on localhost:3001')
);
