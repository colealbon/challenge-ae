var Price = React.createClass({

    componentDidMount: function(){
      var self = this;
      socket.on('price', function (data) {
          self.setState({price: data.price});
          document.getElementById('price').innerHTML = 'Current Price: $' + data.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
               ' (as of ' + new Date(data.time * 1000).toLocaleString() + ')';
          document.getElementById('total').innerHTML = '$' + (data.price * document.getElementById('amount').value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      });
      self.setState({ mounted: true });
    },

    render: function() {
      	return(<div><span className='price'> Price: {this.props.price}</span></div>)
    }

});

ReactDOM.render(<Price />, document.getElementById('price'));
