import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import SchemaUser from "./src/database/schema.js";

const app = express();

const { PORT } = process.env;

const randomuser = async () => {
  const data = await fetch("https://randomuser.me/api");
  const { results } = await data.json();

  const [user] = results;

  const name = `${user.name.first} ${user.name.last}`;

  return name;
};

app.get("/", async (req, res) => {
  const users = await SchemaUser.find();

  res.status(200).send({
    users,
  });
});

app.post("/", async (req, res) => {
  const name = await randomuser();

  const model = new SchemaUser({ name });
  await model.save();

  res.status(200).send({
    user: name,
  });
});

app.put("/:user", async (req, res) => {
  const register = await SchemaUser.findOne({ _id: req.params.user });

  const name = await randomuser();

  await SchemaUser.updateOne(
    {
      _id: register._id,
    },
    {
      $set: {
        name,
      },
    }
  );

  res.status(200).send({
    user: name,
  });
});

app.delete("/:user", async (req, res) => {
  const register = await SchemaUser.findOne({ _id: req.params.user });
  await SchemaUser.remove({ _id: req.params.user });

  res.status(200).send(`User ${register.name} deleted successful!`);
});

app.listen(PORT, () => console.log("running on port %i", PORT));
