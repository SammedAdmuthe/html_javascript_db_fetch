var sql = require('mysql');
var http = require('http');
var fs  = require('fs').promises;
var qs = require('qs');
const { Console } = require('console');


function creatConnection() {
    //Create SQL connection logic
    var connection = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "your_root_password",
        database: "ecommerce"
    });
    return connection;
}

const requestHandler = function(req, res) {

    var body = '';
    fs.readFile(__dirname + "/LoginPage.html")
    .then(contents => {
        res.setHeader("Content-Type", "text/html");
        // console.log(contents);
        // console.log(req.form);
        if(req.method === 'POST') {
            req.on('data', function(chunk){
                body+=chunk;
                // console.log(chunk);
            });
            req.on('end', function () {
                var requestedData = JSON.parse(body);
                    console.log(requestedData);
                            var connection = creatConnection();
                    // var json = qs.parse(body);
                    console.log(requestedData.Username);
                    // console.log(json.pwd);

                    // console.log(json.emailAddr);

                    connection.connect(function (err) {
                        var sql = "insert into users values(?,?,?)";
                        connection.query(sql, [requestedData.Username, requestedData.Password, requestedData.EmailAddress], function (err, result) { //query SQL database
                            if(err) return err;
                            console.log(result);
                        });
                        connection.end();

                        // res.end(contents);

                    });
                    // console.log(json);

            });

        }
        res.end(contents);
    
        // if(req.method === 'POST') {
        //     req.on('data', function(chunk){
        //         body+=chunk;
        //     });
        //     // if(req.method === 'POST')
        //     // {
        //         // console.log(req);
        //     //     console.log(req.body);
    
    
        //     // }
        //     req.on('end', function () {
        //         var connection = creatConnection();
        //         var json = qs.parse(body);
        //         console.log(json.username);
        //         console.log(json.pwd);

        //         console.log(json.emailAddr);

        //         connection.connect(function (err) {
        //             var sql = "insert into users values(?,?,?)";
        //             connection.query(sql, [json.username, json.pwd, json.emailAddr], function (err, result) { //query SQL database
        //                 if(err) return err;
        //                 console.log(result);
        //             });
        //             connection.end();

        //             res.end(contents);

        //         });
        //         console.log(json);
                
        //       }); 

        //}
        
        
    })

    

};

const server = http.createServer(requestHandler);

server.listen(8080);