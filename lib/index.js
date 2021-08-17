
/**
 Creating promises:

 const promise = new Promise((resolve, reject) => {
   // Write your code here
   const number = 5;
   if (number >= 3) {
     resolve(3); // Resolve the promise successfully
   } else {
     reject(new Error("The number is lower than 3")); // Fail the promise
   }
 })
  
 */


/**
* Returns the number 3 as promise
*/
const number3 = () => {
  return Promise.resolve(3);
}


/**
 * Returns the message passed as failed promise
 */
const error = (message) => {
  return Promise.reject(message);
}


/**
 * Returns the sum of numbers as a promise. 
 * Must fail the promise if the array is empty or undefined (new Error('Array must not be empty or undefined'))).
 */
const sum = (numbers) => {
  return new Promise((resolve, reject) => {
    if (!numbers || numbers.length === 0) {
      reject(new Error('Array must not be empty or undefined'));
    } else {
      const sum = numbers.reduce((sum, number) => sum + number, 0);
      resolve(sum);
    }
  })
}


/**
 * Returns only odd numbers. 
 * Must fail the promise if the array is empty or undefined (new Error('Array must not be empty or undefined'))).
 */
const odd = (numbers) => {
  return new Promise((resolve, reject) => {
    if (!numbers || numbers.length === 0) {
      reject(new Error('Array must not be empty or undefined'));
    } else {
      const odds = numbers.filter(number => number % 2 !== 0);
      resolve(odds);
    }
  })
}


const users = [
  { 
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.org',
    organizationId: 1
  },
  {
    id: 2,
    name: 'Terrence Schowalter',
    email: 'terrence.schowalter29@example.org.com',
    organizationId: 2
  },
  {
    id: 3,
    name: 'Margaretta Armstrong MD',
    email: 'Margaretta_Armstrong73@yahoo.com',
    organizationId: 1
  },
  {
    id: 4,
    name: 'Josefa Dare',
    email: 'Josefa_Dare34@gmail.com',
    organizationId: 2
  }
]

const organizations = [
  {
    id: 1,
    name: 'Raynor - Daugherty',
    address: '189 Little Canyon'
  },
  {
    id: 2,
    name: 'Tillman, Schaefer and Gorczany',
    address: '8345 Klein Loaf'
  }
]


/**
 * Returns the user if exists, or undefined if not found
 */
const findUserById = (id) => {
  let expectedUser;
  for (user of users) {
    if (user.id === id) {
      expectedUser = { ...user };
      break;
    }
  }
  return Promise.resolve(expectedUser);
}

// module.exports.findUserById = findUserById


/**
 * Returns the organization if exists, or undefined if not found
 */
const findOrganizationById = (id) => {
  let expectedOrganization;
  for (organization of organizations) {
    if (organization.id === id) {
      expectedOrganization = { ...organization };
      break;
    }
  }
  return Promise.resolve(expectedOrganization);
}
// module.exports.findOrganizationById = findOrganizationById


/**
 * Returns the user merged with the organization if exist, or undefined if not found.
 * Combining the last implement promises!
 * Example:
    {
      id: 3,
      name: 'Margaretta Armstrong MD',
      email: 'Margaretta_Armstrong73@yahoo.com',
      organization: {
        id: 1,
        name: 'Raynor - Daugherty',
        address: '189 Little Canyon'
      }
    }
 */
const findUserByIdWithOrganization = (id) => {
  return findUserById(id)
    .then(user => {
      if (!user) {
        return undefined;
      } else {
        return findOrganizationById(user.organizationId)
          .then(organization => {
            delete user.organizationId;
            user.organization = organization;
            return user;
          })
      }
    })
}

module.exports = {
  number3, 
  error, 
  sum, 
  odd, 
  findUserById, 
  findOrganizationById, 
  findUserByIdWithOrganization
}
