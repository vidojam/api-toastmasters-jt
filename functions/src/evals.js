import { db } from "./connectdb.js";
import { ObjectId } from "mongodb"; // OjectId is a class/must a new ObjectId as in the bottom

const coll = db.collection("evals");

// CRUD GET
export async function getAllEvals(req, res) {
  const evals = await coll.find({}).toArray();
  res.send(evals).status(200);
}

export async function getOneEval(req, res) {
  const { firstNameValue } = req.params
  const oneEval = await coll.find({"firstName": firstNameValue }).toArray()
  res.status(200).send(oneEval)
}

// CRUD: POST
export async function  addEval(req, res) {
  const newEval = req.body
  await coll.insertOne(newEval) // sending back json!
  res.status(201).send({message: "new eval added to evals"});
}

// CRUD DELETE
export async function deleteEval (req, res) {
  const docId = {"_id": new ObjectId(req.params.docId)};
  await coll.deleteOne( docId );
  res.status(201).send( { message: "eval has been sadly deleted"});
}

export async function updateEval(req, res) {
  const docId = { "_id": new ObjectId(req.params.docId) };
  const update = {$set: req.body} ;
  const returnOption = { returnNewDocument: true};

  const query = await coll.findOneAndUpdate( docId, update, returnOption)

  //await getAllEvals(req,res).status(201).send( {message: "Evals has been updated."})
  res.status(201).send( {message: "eval has been updated"});
  console.table(query.value);

}