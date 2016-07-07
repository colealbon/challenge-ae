var TradeEvent = React.createClass({

    componentDidMount: function() {
      this.setState({ mounted: true });
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        // save old price here if you want to animate or otherwise annoy
        // priceIncrease: nextProps.calc_value > this.props.calc_value
      });
    },

    getInitialState: function() {
        return {
          time: this.props.time,
          action: this.props.action,
          unitcnt: this.props.unitcnt,
          unitprice: this.props.price,
          mounted: false
        };
    },
    render: function() {
        var child = this.state.mounted ?
        '<tr><td>this.props.time</td><td>this.props.action</td><td>this.props.unitprice</td><td>this.props.unitcnt</td></tr>' : 
        null;
      return (
          {child}
      );
    }
});
