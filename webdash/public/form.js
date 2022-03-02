$(function() {
    $('#settings').submit(function(event) {
        event.preventDefault(); // Stops browser from navigating away from page
        var data;
        // build a json object or do something with the form, store in data
        $.post(window.location.href+"/settings", data, function(resp) {
            alert(resp);
            // do something when it was successful
        });
    });
});