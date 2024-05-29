

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Timings", {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },    
      Fajr: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Sunrise: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Dhuhr: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Asr: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Sunset: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Maghrib: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Isha: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Imsak: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Midnight: {
            type: DataTypes.STRING,
            allowNull: false
          }
    })
    return Posts
}