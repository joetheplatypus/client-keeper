module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Interaction', {
    date: {
      type: DataTypes.DATE,
      unique: true
    },
    attendees: DataTypes.JSON,
    notes: DataTypes.TEXT
  })
}
