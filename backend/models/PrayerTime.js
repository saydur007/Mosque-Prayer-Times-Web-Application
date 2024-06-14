

module.exports = (sequelize, DataTypes) => {
    const prayerTimes = sequelize.define("PrayerTime", {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      weekday:{
        type: DataTypes.STRING,
        allowNull: false
      }  ,

      FajrStart: {
            type: DataTypes.STRING,
            allowNull: false
          },
    Fajr: {
            type: DataTypes.STRING,
            allowNull: false
          },
    ZuhrStart: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Zuhr: {
            type: DataTypes.STRING,
            allowNull: false
          },
          AsrStart: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Asr: {
            type: DataTypes.STRING,
            allowNull: false
          },
          
          Maghrib: {
            type: DataTypes.STRING,
            allowNull: false
          },
          IshaStart: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Isha: {
            type: DataTypes.STRING,
            allowNull: false
          }
    })
    return prayerTimes
}