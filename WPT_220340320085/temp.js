const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "cdac",
  port: 3306,
});

const bodyParser = require("body-parser");

app.use(express.static("abc"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var result;

app.get("/getBook", function (req, res) {
  let bookid = req.query.bookid;
  let output = { status: false, bookDetails: {} };
  //console.log("Book id:" + bookid);
  connection.query(
    "select * from book where bookid=?;",
    [bookid],
    (err, res1) => {
      if (err) {
        result = err;
      } else if(res1.length>0){
        result = res1;
        output.status = true;
        output.bookDetails = res1[0];
        console.log(output);
      }
      //console.log(result);
      res.send(output);
    }
  );
});



app.get("/updateBook", function (req, res) {
	let bookid = req.query.bookid;
	let bookprice = req.query.bookprice;
	let output = false;
	//console.log("Book id:" + bookid);
	//console.log("Book price:" + bookprice);
	connection.query(
	  "update book set price=? where bookid=?;",
	  [bookprice,bookid],
	  (err, res1) => {
		if (err) {
		  result = err;
		  console.log(err);
		} else if(res1.affectedRows>0){
		  result = res1;
		  output = true;
		  console.log(output);
		}
		res.send(output);
	  }
	);
  });

app.listen(8081, function () {
  console.log("Server listening at port 8081...");
});
