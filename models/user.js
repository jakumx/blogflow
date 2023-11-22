'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      const { User, Post } = models

      User.hasMany(Post)
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    sub: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    picture: DataTypes.STRING,
    credential: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  })
  return User
}
