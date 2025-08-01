import express from 'express'
import path from 'path'

const app = express()
const port = process.env.PORT || 3000

const distPath = path.resolve(__dirname, 'dist')

app.use(express.static(distPath))

// fallback для SPA — на все не найденные маршруты отдаём index.html
app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
