module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Dropin', {
    date: {
      type: DataTypes.DATE,
      unique: true
    },
    attendees: DataTypes.JSON,
    choir: DataTypes.BOOLEAN
  })
}
