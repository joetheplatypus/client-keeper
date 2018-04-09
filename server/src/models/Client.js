module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Client', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  })
}
