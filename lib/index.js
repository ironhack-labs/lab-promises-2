//  Creating promises:

// const promise = new Promise((resolve, reject) => {
//   // Write your code here
//   const number = 5
//   if (number >= 3) {
//     resolve(3) // Resolve the promise successfully
//   } else {
//     reject(new Error('The number is lower than 3')) // Fail the promise
//   }
// })

/**
 * Returns the number 3 as promise
 */
const number3 = () => {
  return new Promise((resolve, reject) => {
    resolve(3)
  }).catch(new Error('Number 3 was not resolved successfully'))
}

/**
 * Returns the message passed as failed promise
 */
const error = (message) => {
  return new Promise((resolve, reject) =>
    reject(message).catch((result) => result),
  )
}

/**
 * Returns the sum of numbers as a promise.
 * Must fail the promise if the array is empty or undefined (new Error('Array must not be empty or undefined'))).
 */
const sum = (numbers) => {
  return new Promise((resolve, reject) => {
    if (!numbers || !numbers.length) {
      return reject(new Error('Array must not be empty or undefined'))
    }
    let result = numbers.reduce((acc, cur, index, arr) => {
      return (acc += cur)
    }, 0)
    return resolve(result)
  })
}

/**
 * Returns only odd numbers.
 * Must fail the promise if the array is empty or undefined (new Error('Array must not be empty or undefined'))).
 */
const odd = (numbers) => {
  return new Promise((resolve, reject) => {
    if (!numbers || !numbers.length) {
      reject(new Error('Array must not be empty or undefined'))
    }
    resolve(numbers.filter((curr) => curr % 2 != 0 && curr))
  })
}

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.org',
    organizationId: 1,
  },
  {
    id: 2,
    name: 'Terrence Schowalter',
    email: 'terrence.schowalter29@example.org.com',
    organizationId: 2,
  },
  {
    id: 3,
    name: 'Margaretta Armstrong MD',
    email: 'Margaretta_Armstrong73@yahoo.com',
    organizationId: 1,
  },
  {
    id: 4,
    name: 'Josefa Dare',
    email: 'Josefa_Dare34@gmail.com',
    organizationId: 2,
  },
]

const organizations = [
  {
    id: 1,
    name: 'Raynor - Daugherty',
    address: '189 Little Canyon',
  },
  {
    id: 2,
    name: 'Tillman, Schaefer and Gorczany',
    address: '8345 Klein Loaf',
  },
]

/**
 * Returns the user if exists, or undefined if not found
 */
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    let result = ''
    users.forEach((curr) => {
      if (curr.id === id) result = curr
    })
    resolve(result || undefined)
  })
}

/**
 * Returns the organization if exists, or undefined if not found
 */
const findOrganizationById = (id) => {
  return new Promise((resolve, reject) => {
    let result = ''
    for (let i = 0; i < organizations.length; i++) {
      if (organizations[i].id === id) {
        result = organizations[i]
        break
      }
    }
    resolve(result || undefined)
  })
}

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
  return findUserById(id).then((user) => {
    if (!user) return undefined

    return findOrganizationById(user.organizationId).then((org) => {
      delete user.organizationId
      user['organization'] = org
      return user
    })
  })
}

// **********************************************************************
// **** DON'T TOUCH THE CODE BELOW - IT IS NECESSARY TO ENABLE TESTS ****
// **********************************************************************

module.exports = {
  number3,
  error,
  sum,
  odd,
  findUserById,
  findOrganizationById,
  findUserByIdWithOrganization,
}
