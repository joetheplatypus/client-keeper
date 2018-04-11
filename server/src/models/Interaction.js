module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Interaction', {
    date: DataTypes.DATE,
    attendees: DataTypes.JSON,
    notes: DataTypes.TEXT
  })
}
