const models = require('../models')
const { User, Category, Post } = models

const createUser = async function (attrs = {}) {
  const data = Object.assign({
    name: 'some name',
    sub: 'some sub',
    email: 'example@email.com',
    picture: 'some picture',
    credential: 'some credential'
  }, attrs)
  const user = await User.create(data)
  return user
}

const createCategory = async function (attrs) {
  const data = Object.assign({
    name: 'category name',
    imageUrl: 'category image'
  }, attrs)

  const category = await Category.create(data)
  return category
}

const createPost = async function (attrs, user, category ) {
  if (!user) {
    user = await createUser()
  }

  if (!category) {
    category = await createCategory()
  }

  const data = Object.assign({
    title: 'post title',
    content: 'post content'
  }, attrs)

  const post = await Post.create({
    ...data,
    UserId: user.id,
    CategoryId: category.id
  })
  return post
}

deleteAllDataFromModels = async function () {
  await Post.destroy({ where: { } })
  await Category.destroy({ where: { } })
  await User.destroy({ where: { } })
}

module.exports = {
  userFactory: createUser,
  categoryFactory: createCategory,
  postFactory: createPost,
  destroyAllData: deleteAllDataFromModels
}