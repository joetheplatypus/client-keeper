module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Counselling', {
    date: {
      type: DataTypes.DATE,
      unique: true
    },
    attendees: DataTypes.JSON
  })
}
