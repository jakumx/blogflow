module.exports = {
  listViews: function (categories) {
    return categories.map(function (category) {
      return {
        name: category.name,
        picture: category.imageUrl
      }
    })
  }
}
