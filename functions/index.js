import functions from "firebase-functions"
import express from "express";
import cors from "cors";
import { getAllEvals, addEval, deleteEval, updateEval, getOneEval} from "./src/evals.js";

//const PORT = 3002;

const app = express();

app.use(cors());
app.use(express.json());


app.get("/evals", getAllEvals);
app.get("/evals/search/:firstNameValue", getOneEval);
app.post("/evals", addEval);
app.delete("/evals/:docId", deleteEval);
app.patch("/evals/:docId", updateEval);

// app.listen(PORT, () => {
//   console.log(`Listening on http://localhost:${PORT}...`);
// });

export const api = functions.https.onRequest(app);

