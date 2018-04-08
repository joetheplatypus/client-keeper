module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Client', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  })
}
