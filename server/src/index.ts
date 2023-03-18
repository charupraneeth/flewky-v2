import express from "express";

const app = express();

const port = process.env.PORT || 1337;

app.get("/", (_, res) => {
  res.send("Hello");
});

app.listen(port, () => console.log(`App listening at port : ${port}`));
