import chalk from "chalk";
import { log } from "console";
import inquirer from "inquirer";
export default async() => {
let login = inquirer.prompt([{
    name:"Username",
    Message:"Username",
    type:"input"
},
{
    name:"pin",
    message:"Pin",
    type:"input"
}])
.then((answers) => {
    if(answers.Username == "123" && answers.pin == "123")
        main(100000)
    else if(answers.Username != "123" || answers.pin != "123")
        console.log("Incorrect Username or password")
})

function withdraw(bal: number): void{
    let withdraw_amount = inquirer.prompt([{
            name:"amount",
            message:"How much do you want to withdraw",
            type:"input"
        }])
        .then((answers) => {
            if(answers.amount > bal){
                console.log(chalk.red("ERR! Insufficient balance. Please enter valid amount."))
                withdraw(bal)
            }
            else {
            console.log("You withdrawn",parseInt(answers.amount))
            console.log("Your new balance is",bal-parseInt(answers.amount))
            main(bal-parseInt(answers.amount))
            }
         })
 
}
function deposit(bal: number): void{
        let deposit_amount = inquirer.prompt([{
        name:"deposit",
        message:"How much do you want to deposit",
        type:"input"
    }])
    .then((answers) => {
        console.log("You deposited",parseInt(answers.deposit))
        console.log("Your new balance is",bal + parseInt(answers.deposit))
        main(bal + parseInt(answers.deposit))
       
    })
    
}
function main(balance: number):void{
    let options = inquirer.prompt([{
        name:"options",
        message:"What do you want to do",
        type:"list",
        choices:["Check Balance","Withdraw","Deposit","Quit"]
    }])
    .then((answers) => {
        if(answers.options == "Check Balance"){
            console.log("Your balance is",balance)
            main(balance)
        }
        
        else if(answers.options == "Withdraw"){
           withdraw(balance)
        }

        else if(answers.options == "Deposit"){
            deposit(balance)
        }
        else if(answers.options == "Quit")
           console.log("You are logged out.")
    })
}
}