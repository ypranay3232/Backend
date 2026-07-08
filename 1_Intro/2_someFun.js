function age() {
    return 100
}
console.log(age())
// run as : node filename

const Goal = 'code'

if (Goal === 'code') {
    console.log("Its fun")
} else {
    console.log(`Other than ${Goal}is not fun`)
}

// lets see something fun about process.argv which returns the location where node is installed and we can also do something as 

const greet = process.argv[2]//we pass index 2 because process.argv takes (at index0 it has nodejs path, index1 it has js path(filename) , at index 2(we can add anything)),

// such that when running (node file name Morning here after adding filename we specify what value is assigned to greet)  

if (greet === 'Morning' || greet === 'afternoon' || greet === 'night') {
    console.log(`Yup ${greet}`)
} else {
    console.log(`Hello ${greet}`)
}