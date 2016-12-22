// require axios
var axios = require("axios");



var helper = {
  runQuery: function(topic, startYear, endYear){
    //NYT API key
    var APIkey= "4fc69655e5054c938c1458fdd2ec26eb";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + APIkey + "&q="+ topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1231";
    return axios.get(queryURL).then(function(response){
      var results = [];
      // if there is a result, return it formatted properly
      if (response.data.results[0]) {
        for(var i=0; i<5; i++) {
          results.push(response.data.results[i].formatted);
        }
        return results;
      } else {
        // if no results
        return "Nothing was found";
      }
    });
  },
  getSaved: function(){
    return axios.get('/api/saved');
  },
  postSaved: function(article){
    return axios.post('/api/saved', {title: title, date: date, url: url});
  },
  deleteSaved: function(id){
    return axios.delete('api/saved/' + id);
  }
};

module.exports = helper;
