
function myObject(what){  
    this.iAm = what;  
    this.whatAmI = function(language){  
        console.log('I am ' + this.iAm + ' of the ' + language + ' language');  
    };  
}; 

var myNewObject = new myObject('an object');  
myNewObject.whatAmI('JavaScript');  
console.log(myNewObject);