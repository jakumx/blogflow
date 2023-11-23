module.exports = {
  singleView: function (user) {
    return {
      name: user.name,
      picture: user.picture,
      sub: user.sub,
      email: user.email
    }
  }
}
