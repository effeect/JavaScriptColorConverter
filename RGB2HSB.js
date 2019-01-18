//I used https://www.rapidtables.com/convert/color/rgb-to-hsv.html as a source for the maths calculation below. HSV and HSB are the same thing.
function RGBtoHSB(ArgR,ArgG,ArgB) 
{
   //Declaring tempoary storage 
    var r1; 
    var g1;
    var b1;
    
    //Color caculation for the arguements, this will be stored in diffirent variables in a bit
    var r = ArgR / 255;
    var g = ArgG / 255;
    var b = ArgB / 255;
    
    //Variables for the hue, saturation and brightness
    hue; //Goes up to 360
    saturation; //Saturation goes up to 100
    brightness = Math.max(r, g, b); //Mixes the numbers and gives a max result, goes up to 100
    
    var minDiff = brightness - Math.min(r, g, b); //Calculation used for saturation
    var diffc = function(arg) //This function processes color changes
    {
        return (brightness - arg) / 6 / minDiff + 1 / 2 
    }; 

    if (minDiff == 0)
    {
        hue = saturation = 0; //This is a rare case.
    } 
    else 
    {
        saturation = minDiff / brightness; //Calculation for saturation is complete
        
        //HUE CALCULATIONS BELOW-------------------------------------
        
        //Running the function we created earlier
        r1 = diffc(r);
        g1 = diffc(g);
        b1 = diffc(b);

        //Bunch of conditionals, all else ifs so only one of these can be executed.
        
        //Please note, the max RGB value is already stored in the brightness variable which means we are just reusing a variable. The brightness variable is not being changed here
        if(r == brightness) //If R is maxium 
        {
            hue = b1 - g1; //If red is max, hue is green - blue 
        }
        else if(g == brightness) //If G is maxium
        {
            hue = (1 / 3) + r1 - b1;
        }
        else if (b == brightness) //If blue is maxium
        { 
            hue = (2 / 3) + g1 - r1;
        }
        else if (hue < 0)
        {
            hue += 1;
        }
        else if (hue > 1) 
        {
            hue -= 1;
        }
    }
//        hue = Math.round(hue * 360),
//        saturation = Math.round(saturation * 100),
//        brightness = Math.round(brightness * 100)
    return{
//        This for console.log results
        hue : Math.round(hue * 360),
        saturation : Math.round(saturation * 100),
        brightness : Math.round(brightness * 100)
    };
    
    
    
}


function hsbToRgb(hue, saturation, brightness){ //I've had some issues with naming so I've been naming the brightness and v, HSV and HSB are the same thing

    var r; //Storage for Red
    var g; //Storage for Green
    var b; //Storage for Blue
    
    //Note : I've changed the brightness to v, mainly so it doesn't cause conflicts like in the last function
    var h = hue /360
    var s = saturation /100 
    var v = brightness /100
    
    //Numbers we need for the switch statement
    var i = Math.floor(3*h/PI); //The floor function rounds the number up, this is so we use switch
    var f = (3*h/PI) - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    //Final part of calcuation, these are the possible final calculations of the RGB. I've used a switch statement instead of if statements because "i" is a whole number which means we won't have weird results.
    switch(i % 6){
        case 0:
            r = v, g = t, b = p; 
        break;
            
        case 1:
            r = q, g = v, b = p; 
        break;
            
        case 2:
            r = p, g = v, b = t; 
        break;
            
        case 3: 
            r = p, g = q, b = v; 
        break;
            
        case 4:
            r = t, g = p, b = v;
        break;
            
        case 5:
            r = v, g = p, b = q;
        break;
    }
    
    return{
        red : r * 255, //Returns the value to a non-linear number
        green : g * 255, //Returns the value to a non-linear number
        blue : b * 255 //Returns the value to a non-linear number
    }

}


