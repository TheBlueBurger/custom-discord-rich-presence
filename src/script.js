var discordrpc;
var client = null;
var connected = false;
document.onclose = function(e) {
    if(connected) client.destroy();
}
var start_prefence = function() {
    if(document.getElementById("client_id").value == null || document.getElementById("client_id").value == 0) alert("Please input a valid Client ID!");
    document.getElementById("status").innerText = "STATUS: Connecting"
    discordrpc = require('discord-rpc');
    client = new discordrpc.Client({"transport": "ipc"});
    client.on('connected', () => {
        connected = true;
        var checkmarkchecked = document.getElementById("show_time_elapsed").checked ? new Date() : null;
        var firstrow = document.getElementById("first_row_text").value != "" ? document.getElementById("first_row_text").value : undefined;
        var secondrow = document.getElementById("second_row_text").value != "" ? document.getElementById("second_row_text").value : undefined;
        var doReturn = false;
        if(firstrow.toString() != "" && firstrow.length < 2) {
            doReturn = true;
            alert("The first row needs to be longer then two characters!");
            stop_prefence();
        };
        if(secondrow.toString() != "" && secondrow.length < 2) {
            doReturn = true;
            alert("The second row needs to be longer then two characters!");
            stop_prefence();
        };
        if(doReturn) return;
        client.setActivity({
            "details": firstrow,
            "state": secondrow,
            "startTimestamp": checkmarkchecked
        })
        document.getElementById("status").innerText = "STATUS: Connected to "+client.user.username.toString()+"#"+client.user.discriminator.toString();
    });
    client.login({"clientId": document.getElementById("client_id").value})
}
var stop_prefence = function() {
    if(client !== null) {
        connected = false;
        client.clearActivity();
        client.destroy();
        client = null;
    }
    document.getElementById("status").innerText = "STATUS: Disconnected";
}