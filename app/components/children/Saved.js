// Include React
var React = require("react");

// bring in helpers
var helpers = require("../utils/helpers");

// Creating the Saved component
var Saved = React.createClass({
  // delete saved article
  handleDelete: function(){
    var articleID = event.target.value;

    helpers.deleteSaved(articleID).then(function(response){
      console.log("Deleted article");
    }.bind(this));
  },
  // render the function
  render: function(){
    return (
      <div className="panel card z-depth-4 center-align">
        <h3 className="panelTitle">Saved</h3>

        <div>
          {this.props.saved.map(function(search, i){
            return(
              <li key={search._id}>
                <strong><a href={search.web_url} className="left-align" target="_blank">{search.title}</a></strong>
                  <i> {search.pub_date.substring(0,10)}</i>
                <span>
                  <button className="waves-effect waves-light btn right-align" onClick={this.handleDelete} value={search._id}>Remove</button>
                </span>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = Saved;
