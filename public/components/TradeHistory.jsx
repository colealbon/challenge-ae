var TradeHistory = React.createClass({
    getInitialState: function() {
        return {
            tradehistory: this.props.tradehistoryjson,
        };
    },
    render: function () {
        return 'hello history'
     }
});

/*          <table>
            JSON.parse(tradehistory).map(function(tradeevent) {
                return(
                    <div key={tradeevent}>
                        <TradeEvent
                            time={tradeevent.time}
                            action={tradeevent.action}
                            unitcnt={tradeevent.unitcnt}
                            unitprice={tradeevent.unitprice}
                        </TradeEvent>
                    <div>
                )
            })
            </table>
*/
