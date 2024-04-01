const express = require("express");
const fs = require("fs").promises;
const querystring = require("querystring");

const app = express();

app.get("/", async (req, res) => {
  try {
    const mainHTML = await fs.readFile("../Client-Side/Pages/main.html");
    res.setHeader("Content-Type", "text/html");
    res.send(mainHTML);
  } catch (error) {
    console.error("Error reading main HTML:", error);
  }
});

app.get("/styles/style.css", async (req, res) => {
  try {
    const mainCSS = await fs.readFile("../Client-Side/Style/style.css");
    res.setHeader("Content-Type", "text/css");
    res.send(mainCSS);
  } catch (error) {
    console.error("Error reading CSS file:", error);
  }
});

app.get("/welcome.html", async (req, res) => {
  try {
    const welcomeHTML = await fs.readFile(
      "../Client-Side/Pages/welcome.html",
      "utf8"
    );
    res.setHeader("Content-Type", "text/html");
    res.send(welcomeHTML);
  } catch (error) {
    console.error("Error reading welcome HTML:", error);
  }
});
app.get("/clientData.json", async (req, res) => {
  try {
    const json = await fs.readFile(
      "../Client-Side/Data/ClientData.json",
      "utf8"
    );
    res.setHeader("Content-Type", "text/json");
    res.send(json);
  } catch (error) {
    console.error("Error reading welcome HTML:", error);
  }
});

app.post("/welcome.html", async (req, res) => {
  let formData = "";

  req.on("data", (data) => {
    formData += data;
  });

  req.on("end", async () => {
    const parsedData = querystring.parse(formData);

    try {
      const welcomeHTML = await fs.readFile(
        "../Client-Side/Pages/welcome.html",
        "utf8"
      );
      let fileContent = welcomeHTML
        .replace("{Name}", parsedData.Name)
        .replace("{MobileNumber}", parsedData.Mobile)
        .replace("{address}", parsedData.Address)
        .replace("{Email}", parsedData.Email);

      console.log(parsedData);
      res.setHeader("Content-Type", "text/html");
      res.send(fileContent);
    } catch (error) {
      console.error("Error reading welcome HTML:", error);
    }

    try {
      const oldData = await fs.readFile(
        "../Client-Side/Data/ClientData.json",
        "utf8"
      );
      const data = JSON.parse(oldData || "[]");

      data.push(parsedData);
      await fs.writeFile(
        "../Client-Side/Data/ClientData.json",
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.error("Error writing client data:", error);
    }
  });

  req.on("error", (error) => {
    console.error("Request error:", error);
  });
});

app.all("*", (req, res) => {
  res.status(404).send("Invalid URL!");
});

app.listen(7000);
