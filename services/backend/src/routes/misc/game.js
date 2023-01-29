exports.init = function(app) {
    //localhost:9000/startGame
    app.post('/startGame', function (request, response) {
        fetch('http://CarryCherryCloud-backend:9001/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}, null, 2),
        })
            .then(function(res) {
                return res.text();
            }).then(function(data) {
            response.send(JSON.parse(data));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}


exports.move = function(app) {
    //localhost:9000/move?x_from=1&y_from=1&x_to=2&y_to=2&sessionID=123
    app.post('/move', function (request, response) {
        let url = 'http://CarryCherryCloud-backend:9001/move/' + request.query.x_from + '/' + request.query.y_from + '/' + request.query.x_to + '/' + request.query.y_to + '/' + request.query.sessionID;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "x_from": request.query.x_from,
                "y_from": request.query.y_from,
                "x_to": request.query.x_to,
                "y_to": request.query.y_to,
                "sessionID": request.query.sessionID
            }, null, 2),})
            .then(function(res) {
                return res.text();
            }).then(function(data) {
            response.send(JSON.parse(data));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}
