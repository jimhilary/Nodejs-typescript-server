import express,{Request,Response} from "express"
import { Server } from "../models/server.model";

 const router = express.Router();

router.get("/get", async (req:Request, res:Response) => {
  try {
    const servers = await Server.find({});
    if (!servers[0]) {
      res.send("no servers yet");
    }
    res.json([...servers ]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.post("/create", async (req:Request, res:Response)  => {
  try {
    console.log(req.body)
    const addServer = new Server({
      name: req.body.name,
    });
    await addServer.save();
    res.status(201).send("server saved successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.put("/edit/:serverId", async (req:Request, res:Response)  => {
  const { serverId } = req.params;
  try {
    const editedserver = await Server.findByIdAndUpdate(
      serverId,
      {  name:req.body.name },
      { new: true }
    );
    res.status(200).send(editedserver);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.delete("/delete/:serverId", async (req:Request, res:Response)  => {
  const { serverId } = req.params;
  try {
    const deleteserver = await Server.findByIdAndDelete(serverId);
    res.status(200).send("server deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router
