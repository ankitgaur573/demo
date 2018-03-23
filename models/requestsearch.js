'use strict';
module.exports = (sequelize, DataTypes) => {
  var RequestSearch = sequelize.define('RequestSearch', {
    userId: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    radius: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  RequestSearch.associate = function(models) {
    // associations can be defined here
  };
  return RequestSearch;
};