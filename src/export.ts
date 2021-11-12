import { writeFile, mkdir } from 'fs/promises'
import { resolve } from 'path'
import { getPostCollection } from './lib/getPostCollection'

const TARGET_DIR = process.env.TARGET_DIR

if (!TARGET_DIR) {
  throw new Error('TARGET_DIR env variable must be set')
}

const run = async () => {
  const collection = await getPostCollection()
  const items = collection.allItems()

  const dist = resolve(__dirname, '../..', TARGET_DIR)

  try {
    await mkdir(dist)
  } catch (e) {}

  await writeFile(resolve(dist, 'allPosts.json'), JSON.stringify(items), { encoding: 'utf-8' })

  console.log(`Wrote 1 file to ${dist}`)
}

run()
  .then(() => {
    console.log('Done')
  })
  .catch((e) => console.error(e))
