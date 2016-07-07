var Timestamp = React.createClass({
    render: function() {
        var timestamp = new Date().now()
        return (<span className='timestamp'>{timestamp}</span>);
    }
});
