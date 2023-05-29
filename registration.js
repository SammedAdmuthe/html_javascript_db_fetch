var sql = require('mysql');
var http = require('http');
var fs  = require('fs');
var qs = require('qs');
const { Console } = require('console');
const { url } = require('inspector');


function creatConnection() {
    //Create SQL connection logic
    var connection = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root123",
        database: "ecommerce"
    });
    return connection;
}
const loginPage = fs.readFileSync('./LoginPage.html')
const successPage = fs.readFileSync( './success.html')
// const requestHandler = function(req, res) {

//     var body = '';

//     fs.readFile(__dirname + "/LoginPage.html")
//     .then(contents => {
//         res.setHeader("Content-Type", "text/html");
//         // console.log(contents);
//         // console.log(req.form);
//         // if(req.method === 'POST') {
//         //     req.on('data', function(chunk){
//         //         body+=chunk;
//         //         // console.log(chunk);
//         //     });
//         //     req.on('end', function () {
//         //         var requestedData = JSON.parse(body);
//         //             console.log(requestedData);
//         //                     var connection = creatConnection();
//         //             // var json = qs.parse(body);
//         //             console.log(requestedData.Username);
//         //             // console.log(json.pwd);

//         //             // console.log(json.emailAddr);

//         //             connection.connect(function (err) {
//         //                 var sql = "insert into users values(?,SHA1(?),?)";
//         //                 connection.query(sql, [requestedData.Username, requestedData.Password, requestedData.EmailAddress], function (err, result) { //query SQL database
//         //                     if(err) return err;
//         //                     console.log(result);
//         //                 });
//         //                 // window.location.href = "success.html";
//         //                 connection.end();

//         //                 // res.end(contents);

//         //             });
//         //             // console.log(json);

//         //     });

//         // }
//         res.end(contents);

        
//     })

    

// };

const server = http.createServer((req, res)=>{
    var url = req.url;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    if(url == '/') {
        console.log(req.method);
        var body = '';

        if(req.method === 'POST') {
            req.on('data', function(chunk){
                body+=chunk;
                console.log(chunk);
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
                        var sql = "insert into users values(?,SHA1(?),?)";
                        connection.query(sql, [requestedData.Username, requestedData.Password, requestedData.EmailAddress], function (err, result) { //query SQL database
                            if(err) return err;
                            console.log(result);
                        });
                        // window.location.href = "success.html";
                        connection.end();

                        // res.end(contents);

                    });
                    // console.log(json);

            });

        }
        res.end(loginPage);
    }
    else if(url == '/success.html') {
        
        res.end(successPage);
    } 
});

server.listen(8081);