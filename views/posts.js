const singleView = function (post) {
  if (!post) return null
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    author: {
      name: post.User.name,
      picture: post.User.picture
    },
    category: {
      name: post.Category.name,
      picture: post.Category.imageUrl
    }
  }
}

module.exports = {
  listViews: function (posts) {
    return posts.map(function (post) {
      return singleView(post)
    })
  },
  singleView
}
