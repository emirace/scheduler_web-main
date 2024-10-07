import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.resolve(
    '.',
    'public/Free Scheduler Template - Cafe Demo.xlsx',
  )
  const fileBuffer = fs.readFileSync(filePath)
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=Free Scheduler Template - Cafe Demo.xlsx',
  )
  res.send(fileBuffer)
}
