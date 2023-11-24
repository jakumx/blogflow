module.exports = {
  listViews: function (categories) {
    return categories.map(function (category) {
      return {
        id: category.id,
        name: category.name,
        picture: category.imageUrl
      }
    })
  }
}
