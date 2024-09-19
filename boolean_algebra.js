/*
First - Identify the distributions a(b+c) and variables
Second - Distribute. ab + ac
Third - Identify auxiliar identities and properties
Fourth - Solve.
*/

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Insert expression (~to negate variable): ', input => {
  findVariablesAndDistributions(input);

  rl.close();
})

function cleanVariables(variables){
  // to take repeated vars off
  for(v in variables){
    for(i in variables){
      if(variables[i] === variables[v] && v != i){
        variables[i] = ''
      }
    }
  }

  return variables.join('').split('');
}

function solveDistribution(distributions){
  const distributionsDone = [];
  for(dist of distributions){
    let terms = dist.match(/[a-zA-Z]+/g);
    let distributed = '';
    for(let i = 1; i < terms.length; i++){
      distributed += terms[0] + terms[i] + '+';
    }
    // taking off the last '+'
    distributed = distributed.split('');
    distributed.pop();
    distributed = distributed.join('');
    distributionsDone.push(distributed);
  }

  return distributionsDone;
}

function findVariablesAndDistributions(input){
  input = input.split(' ').join(''); // cleaning whitespaces
  let variables = input.match(/[a-zA-Z]/g);
  variables = cleanVariables(variables);
  console.log(variables);
  const distributions = input.match(/[a-zA-Z]+\([a-zA-Z]+\+[a-zA-z]+\)/g);

  let finalInput = input.replace(/[a-zA-Z]+\([a-zA-Z]+\+[a-zA-z]+\)/g, '');

  // if(finalInput.split('')[finalInput.length-1] === '+'){
  //   finalInput = finalInput.split('');
  //   finalInput.pop();
  //   finalInput = finalInput.join('');
  // }

  const solvedDistributions = solveDistribution(distributions);

  for(dist of solvedDistributions){
    finalInput += dist;
  }

  console.log(finalInput);
  findAllTerms(finalInput);
}

function findAllTerms(input){
  const terms = input.match(/[a-zA-Z]+/g);
  console.log(terms);

  //A + AB = A
  for(term in terms){
    for(j in terms){
      const re = new RegExp(`${terms[term]}`, 'g');
      if(terms[j].match(re) && term != j){
        console.log(j);
        terms.splice(j, 1);
      }
    }
  }
  console.log(terms)


  //A + ~AB = A + B
}