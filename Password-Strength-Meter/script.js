const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reason = document.getElementById('reasons')


// it will call this updateStrengthMeter immediately
passwordInput.addEventListener('input' , updateStrengthMeter)
updateStrengthMeter()     //-->calling without giving any input

//function for Updatee Strength meter
function updateStrengthMeter()
{
    const weaknesses = calculatePasswordStrength(passwordInput.value)  //first call password calculator
    console.log(weaknesses)


    let strength = 100           //---> for every weakness there will be deduction from strength val
    reason.innerHTML = ''       //--> clean previous reason each and every time
    weaknesses.forEach(weakness => {      //--> we need to handle undefined weaknesses
        if (weakness == null) return
        strength = strength - weakness.deduction
        const reasonmessage = document.createElement('div')
        reasonmessage.innerText = weakness.message 
        reason.appendChild(reasonmessage)
    })
   strengthMeter.style.setProperty('--strength' , strength) 
}

//we need to call this calculatePasswordStrength() on every input update 
function calculatePasswordStrength(password)
{
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numbercaseWeakness(password))
    weaknesses.push(specialcharacter(password))
    weaknesses.push(repeatcharWeakness(password))
    return weaknesses
}

//all types of weakness function below
//all of these function will return an object having deduction and message

function lengthWeakness(password)
{
    let length = password.length

    if (length == 0)
    {
        return {
            message : 'some-values  ,',
            deduction : 100
        }
    }
    if (length <= 3)
    {
        return {
            message : 'minimun-length  ,',
            deduction : 80
        }
    }

    if (length <= 5)
    {
        return {
         message : 'more characters  ,',
         deduction : 60
        }
    }

    if (length <= 10)
    {
        return {
            message : 'a longer ,',
            deduction : 15
        }
    }
}

// for lower case letters in our password we need to use "password.match(/[a-z]/g)"
// /[a-z]/g, here a-z is the range and g is global ,return an array of all diff values instead of our password

//------------------------------------------------------------------------//
// function lowercaseWeakness(password)
// {
//     const matches = password.match(/[a-z]/g) || []

//     if(matches.length === 0)
//     {
//         return {
//             message : 'Your password must have lower-Case characters',
//             deduction : 20
//         }
//     }
//     if(matches.length <= 2)
//     {
//         return {
//             message : 'Your password could have more lower case',
//             deduction : 5
//         }
//     }
// }
//---------------------------------------------------------///

function lowercaseWeakness(password)
{
    return characterTypeWeakness(password , /[a-z]/g,'lowercase Characters ,') //-->here we are calling 
            // characterTypeWeak() and sending arguments to that function
   
}

function uppercaseWeakness(password)
{
    return characterTypeWeakness(password , /[A-Z]/g , 'UpperCase Character ,')
}

function numbercaseWeakness(password)
{
    return characterTypeWeakness(password , /[0-9]/g , 'Numericals ,')
}

function specialcharacter(password)
{
    return characterTypeWeakness(password , /[^0-9a-zA-Z\s]/g , 'special characters ,')
}

function repeatcharWeakness(password)
{
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0)
    {
        return {
            message : 'do not repeat-character ,',
            deduction : matches.length * 10
        }
    }
}

function characterTypeWeakness(password , regex , type)
{
    const matches = password.match(regex) || []
   
    if(matches.length === 0)
    {
        return {
            message : `${type}`,
            deduction : 20
        }
    }
    if(matches.length <= 2)
    {
        return {
            message : `${type}`,
            deduction : 5
        }
    }
}
