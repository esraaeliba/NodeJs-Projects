const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

let HomeHTML = "";
fs.readFile("../Client-Side/Pages/main.html", "utf-8", (err, data)=>{
    if(err){
        console.log("Error");
    }else{
        HomeHTML = data;
    }
});

let welcomeHTML = fs.readFileSync("../Client-Side/Pages/welcome.html","utf-8");
let styleCSS = fs.readFileSync("../Client-Side/Style/style.css","utf-8");
let scriptJS = fs.readFileSync("../Client-Side/Scripts/script.js","utf-8");
let imageJPG = fs.readFileSync("../Client-Side/Images/image.jpg","utf-8");
let favIconico = fs.readFileSync("../Client-Side/Icons/favicon.ico","utf-8");


http 
  .createServer((req, res) => { 
    if (req.method == "GET") { 
      switch (req.url) { 
        case "/": 
        case "/main.html": 
        case "/Pages/main.html": 
        case "/Client-Side/Pages/main.html": 
          res.setHeader("Content-Type", "text/html"); 
          res.write(HomeHTML); 
          break; 
        case "/style.css": 
        case "/Style/style.css": 
        case "/Client-Side/Style/style.css": 
          res.setHeader("Content-Type", "text/css"); 
          res.write(styleCSS); 
          break; 
        case "/script.js": 
        case "/Scripts/script.js": 
        case "/Client-Side/Scripts/script.js": 
          res.setHeader("Content-Type", "text/javascript"); 
          res.write(scriptJS); 
          break; 
        case "/image.jpg": 
        case "/Images/image.jpg": 
        case "/Client-Side/Images/image.jpg": 
          res.setHeader("Content-Type", "image/jpeg"); 
          res.write(imageJPG); 
          break; 
        case "/favicon.ico": 
        case "/Icons/favicon.ico": 
        case "/Client-Side/Icons/favicon.ico": 
          res.setHeader("Content-Type", "image/vnd.microsoft.icon"); 
          res.write(favIconico); 
          break; 
        default: 
          if (req.url.includes("welcome.html")) { 
            res.setHeader("Content-Type", "text/html"); 
            res.write(welcomeHTML); 
          } else res.write("Invalid URL !!"); 
          break; 
      } 
      res.end(); 
    } 


    else if (req.method == "POST") {
        let formData = "";
        req.on("data", (data) => {
            formData += data;
        });

        req.on("end", () => {
            const parsedData = querystring.parse(formData);
            const Name = parsedData.Name;
            const MobileNumber = parsedData.MobileNumber;
            const Address = parsedData.Address;
            const Email = parsedData.Email;
        res.setHeader("Content-Type", "text/html"); 
        let File = welcomeHTML
                            .replace("{Name}", Name)
                            .replace("{MobileNumber}", MobileNumber)
                            .replace("{address}", Address)
                            .replace("{Email}", Email); 
        res.write(File); 
        res.end(); 
      });
 
      req.on("error", () => { 
        console.log("Error"); 
      });
      req.on("close", () => { 
        console.log("Closed"); 
      });
    } 

    
    else if (req.method == "PUT") { 
    } 

    else if (req.method == "PATCH") { 
    } 

    else if (req.method == "DELETE") { 
    } 

    else { 
      res.end("Please Check ur Method [GET- POST - PATCH - PUT - DELETE]"); 
    } 

  }) 
  .listen(7000, () => { 
    console.log("http://localhost:7000"); 
  });