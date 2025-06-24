import express from 'express'
import cors from 'cors';
import { Router, Request, Response } from 'express';

const app = express()
const route = Router()

app.use(express.json())
app.use(cors())

var colecoes = [
  {
    id: "1",
    title: "Apresentação Q4 2024",
    modified: "2 horas atrás",
    sizeTotal: "2.4 MB",
    shared_emails: ['teste@gmail.com'],
    shared: true,
    starred: true,
  },
  {
    id: "2",
    title: "Vídeos do Produto",
    modified: "1 dia atrás",
    shared_emails: ['teste@gmail.com'],
    shared: true,
  },
  {
    id: "3",
    title: "Relatório Financeiro",
    modified: "3 dias atrás",
    sizeTotal: "1.8 MB",
    shared_emails: [],
    shared: false
  },
  {
    id: "4",
    title: "Demo do Cliente",
    modified: "1 semana atrás",
    sizeTotal: "45.2 MB",
    starred: true,
    shared_emails: [],
    shared: false
  },
  {
    id: "5",
    title: "Documentação API",
    modified: "2 semanas atrás",
    shared_emails: [],
    shared: false
  },
  {
    id: "6",
    title: "Contrato Assinado",
    modified: "1 mês atrás",
    sizeTotal: "892 KB",
    shared_emails: ['teste@gmail.com'],
    shared: true,
  },
]

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Word with Typescript' })
})

route.get('/buscar-colecoes', (req: Request, res: Response) => {
  console.log("get: /buscar-colecao | res.json:", colecoes)
  res.json(colecoes)
})

route.post('/nova-colecao', (req: Request, res: Response) => {

  console.log("post: /nova-colecao | req.body:", req.body)

  const nova_colecao = {
    id: `${colecoes.length + 1}`,
    title: req.body.new_data.title,
    modified: req.body.new_data.modified,
    sizeTotal: req.body.new_data.sizeTotal,
    starred: false,
    shared: req.body.new_data.shared,
    shared_emails: req.body.new_data.emails
  }

  colecoes.push(nova_colecao)
  res.status(200).json(nova_colecao)

})

route.delete('/delete-colecao', (req: Request, res: Response) => {

  console.log("delete: /delete-colecao | req.body:", req.body)
  const indexColecao = colecoes.findIndex(colecao => colecao.id === req.body.id)

  if(indexColecao === -1){
    res.status(404).json({message: "Coleção não encontrada"})
  }

  colecoes = colecoes.filter(colecao => colecao.id !== req.body.id)
  res.status(200).json(colecoes)

})

route.post('/favoritar-colecao', (req: Request, res: Response) => {

  console.log("post: /favoritar-colecao | req.body:", req.body)
  const indexColecao = colecoes.findIndex(colecao => colecao.id === req.body.id)

  if(indexColecao === -1){
    res.status(404).json({message: "Coleção não encontrada"})
  }

  colecoes[indexColecao].starred = req.body.starred

  res.status(200).json(colecoes[indexColecao])

})

route.post('/compartilhar-colecao', (req: Request, res: Response) => {

  console.log("post: /compartilhar-colecao | req.body:", req.body)
  const indexColecao = colecoes.findIndex(colecao => colecao.id === req.body.id)

  if(indexColecao === -1){
    res.status(404).json({message: "Coleção não encontrada"})
  }

  colecoes[indexColecao].shared= req.body.shared
  colecoes[indexColecao].shared_emails = req.body.emails

  res.status(200).json(colecoes[indexColecao])

})

app.use(route)

app.listen(3333, () =>
  console.log('Server running on http://localhost:3333/')
)