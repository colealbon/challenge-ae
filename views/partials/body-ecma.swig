
<script src='/socket.io/socket.io.js'></script>

<script>
    function socketconnect () {
        var socket = io('http://{{ app_host }}:{{ http_port }}');
    }
    var socketioElement=document.createElement('script')
    socketioElement.setAttribute("type", "text/javascript")
    socketioElement.setAttribute("src", "/socket.io/socket.io.js")
    document.head.appendChild(socketioElement)
</script>

<script>
    var socket = io();
    var LATEST_BLOCKTIME;
    socket.on('pulsetime', function(timestamp) {
        const timestampStr = new Date(timestamp).toLocaleString();
        document.getElementById('pulsetime').innerHTML = timestampStr;
    });

</script>

<script src="components/Timestamp.jsx" type="text/babel"></script>
<script src="components/Price.jsx" type="text/babel"></script>
