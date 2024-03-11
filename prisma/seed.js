const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const postsArray = []

const posts = []

const updatedData = postsArray.map((data) => {
  const newData = {
    id: data.id,
    type: data.type,
    categorydoc: data.categorydoc,
    categorynpm: data.categorynpm,
    index: data.index,
    title: data.title,
    description: data.description,
    content: JSON.parse(data.content),
    createdAt: new Date(data.createdAt).toISOString(),
    updatedAt: new Date(data.updatedAt).toISOString(),
    authorId: data.authorId,
  }
  posts.push(newData)
})

async function main() {
  console.log(`Start seeding...`)
  for (const post of posts) {
    await prisma.post.create({ data: post })
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
