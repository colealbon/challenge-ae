var Price = React.createClass({

    componentDidMount: function(){
      var self = this;
      socket.on('price', function (data) {
          self.setState({price: data.raw_value});
          // This is not proper: it circumvents efficient REACT DOM update.
          // setstate is preferable but author forgot how to set up
          // react children
          document.getElementById('price').innerHTML = 'Current Price: ' + data.raw_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
               ' (as of ' + new Date(data.time * 1000).toLocaleString() + ')';
      });
      self.setState({ mounted: true });
    },

    render: function() {
      	return(<div><span className='price'> Price: {this.props.price}</span></div>)
    }

});

ReactDOM.render(<Price />, document.getElementById('price'));
