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
    shared: true,
    starred: true,
  },
  {
    id: "2",
    title: "Vídeos do Produto",
    modified: "1 dia atrás",
    shared: true,
  },
  {
    id: "3",
    title: "Relatório Financeiro",
    modified: "3 dias atrás",
    sizeTotal: "1.8 MB",
  },
  {
    id: "4",
    title: "Demo do Cliente",
    modified: "1 semana atrás",
    sizeTotal: "45.2 MB",
    starred: true,
  },
  {
    id: "5",
    title: "Documentação API",
    modified: "2 semanas atrás",
  },
  {
    id: "6",
    title: "Contrato Assinado",
    modified: "1 mês atrás",
    sizeTotal: "892 KB",
    shared: true,
  },
]

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Word with Typescript' })
})

route.get('/buscar-colecoes', (req: Request, res: Response) => {
  res.json(colecoes)
})

route.post('/nova-colecao', (req: Request, res: Response) => {

  console.log("post: /nova-colecao | req.body:", req.body)
  const nova_colecao = {
    id: "7",
    title: req.body.new_data.title,
    modified: req.body.new_data.modified,
    sizeTotal: req.body.new_data.sizeTotal,
    shared: req.body.new_data.shared
  }

  colecoes.push(nova_colecao)
  res.json(colecoes)

})

// route.get('/', (req: Request, res: Response) => {
//   res.json({})
// })

app.use(route)

app.listen(3333, () =>
  console.log('Server running on http://localhost:3333/')
)