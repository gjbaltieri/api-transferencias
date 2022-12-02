import { appDataSource } from './data-source'
import 'dotenv/config'
import app from './config/app'

appDataSource
  .initialize()
  .then(async () => {
    app.listen(process.env.PORT || 3030, () => console.log(`Server running in localhost:${process.env.PORT || 3030}`))
  })
  .catch(console.error)
