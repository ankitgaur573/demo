'use strict';
module.exports = (sequelize, DataTypes) => {
  var SavedPlaces = sequelize.define('SavedPlaces', {
    requestId: DataTypes.INTEGER,
    placeId: DataTypes.STRING,
    address: DataTypes.STRING,
    icon: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  SavedPlaces.associate = function(models) {
    // associations can be defined here
  };
  return SavedPlaces;
};