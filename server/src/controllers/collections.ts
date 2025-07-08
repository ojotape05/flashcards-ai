import { db } from "../database/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Request, Response } from "express";

export async function buscarCollections(req: Request, res: Response) {

  try{
    const snapshot = await getDocs(collection(db, "collections"));

    if (snapshot.empty) {
      res.status(404).send("Nenhuma coleção encontrada");
      return
    }

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log("get: /buscar-colecao | res.json:", data)
    res.status(200).json(data)

  } catch (error) {
    console.log("get: /buscar-colecao | ERROR:", error)
    res.status(500).send('Error ao consultar o Banco de Dados')
  }
}