import express from 'express'
import { Router, Request, Response } from 'express';

const app = express()
const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Word with Typescript' })
})

route.get('/buscar-colecoes', (req: Request, res: Response) => {

})

route.post('/nova-colecao', (req: Request, res: Response) => {

  console.log("post: /nova-colecao | req.body:", req.body)

})

// route.get('/', (req: Request, res: Response) => {
//   res.json({})
// })

app.use(route)

app.listen(3333, () =>
  console.log('Server running on http://localhost:3333/')
)