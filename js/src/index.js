//@ts-check
const express = require('express')
const { cors } = require('cors-ts')

const { PUBLIC_FOLDER } = require('./constants')
const AudioController = require('./controllers/AudioDownload')
const VideoController = require('./controllers/VideoController')

const app = express()
const PORT = process.env.PORT || 9520

app.use(cors())

app.use(express.static(PUBLIC_FOLDER))

app.use(AudioController)
app.use(VideoController)

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
