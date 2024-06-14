module.exports={
    convertFormat: function(hours, minutes) {
    
        // Convert hours and minutes to integers
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
    
        // Convert the hour to 12-hour format
        hours = hours % 12 || 12; // Converts '0' or '12' to '12'
    
        // Format the hours and minutes with leading zeros if needed
        let formattedHours = hours < 10 ? '0' + hours : hours;
        let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
        // Return the formatted time
        return `${formattedHours}:${formattedMinutes}`;
    },
    calculateFajrAsr : function(timeest)
    {
        var time = timeest.split(' ')[0];
        var hour = Number(time.split(':')[0]);
        var hour2 = hour;
        var min = Number(time.split(':')[1]);
        var min2 = min;
        console.log(Number(hour));
        console.log(Number(min));
        var calculatetime = "";
        if (min2 >=15){
            min2 = min2 -15;
            hour2+=1;
        }
        else{
            min2 = min2 + 45;
        }
        if(min >= 30)
            {
                min = min -30;
                hour +=1;
                min2 = min2 -15;
                hour2 +=1;
            }
            else{
                min = min + 30;
            
            }
        var reminder = min  % 15;
        console.log(reminder);
        if (reminder == 0)
            {
                return this.convertFormat(hour, min); 
            }
        else{
            min = min + (15 - reminder);
            if(min == 60)
                {
                    min = 0;
                    hour +=1;
                }
                return this.convertFormat(hour, min); 
                
        }
       
    },

    calculateIsha : function(timeest)
    {
        var time = timeest.split(' ')[0];
        var hour = Number(time.split(':')[0]);
        var hour2 = hour;
        var min = Number(time.split(':')[1]);
        var min2 = min;
        console.log(Number(hour));
        console.log(Number(min));
        var calculatetime = "";
    
        if(min >= 15)
            {
                min = min -15;
                hour +=1;
            }
            else{
                min = min + 45;
            
            }
        var reminder = min  % 15;
        console.log(reminder);
        if (reminder == 0)
            {
               if(hour > 22)
                {
                    return this.convertFormat(10, 45);
                }
                else if(hour == 22 && min > 45)
                {
                    return this.convertFormat(10, 45);
                }
                else if(hour <19)
                    {
                        return this.convertFormat(7, 0);
                    }
                return this.convertFormat(hour, min);
            }
        else{
            min = min + (15 - reminder);
            if(min == 60)
                {
                    min = 0;
                    hour +=1;
                }
                if(hour > 22)
                    {
                        return this.convertFormat(10, 45);
                    }
                    else if(hour == 22 && min > 45)
                    {
                        return this.convertFormat(10, 45);
                    }
                    else if(hour < 19)
                        {
                            return this.convertFormat(7, 0);
                        }
                    return this.convertFormat(hour, min);
                
        }
        
       
    },
    calculateZuhr : function(timeest)
    {
        var time = timeest.split(' ')[0];
        var hour = Number(time.split(':')[0]);
        var min = Number(time.split(':')[1]);
       if(hour == 13)
        {
            return this.convertFormat(13, 45);
        }
    else if(hour == 12 && min < 45)
        {
            return this.convertFormat(12, 45);
                
        }
        else{
            return this.convertFormat(13, 45);
        }
},
calculateMaghrib: function (timeest)
{
    var time = timeest.split(' ')[0];
    var hour = Number(time.split(':')[0]);
    var min = Number(time.split(':')[1]);
    return this.convertFormat(hour, min);
}
}