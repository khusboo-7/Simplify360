class Person {
  constructor(name) {
    this.name = name;
  }
  toString() {
    return this.name;
  }
  equals(other) {
    return this.name === other.name;
  }
}

class Network {
  constructor() {
    this.adjacencyList = new Map();
  }
  addPerson(person) {
    if (!this.adjacencyList.has(person)) {
      this.adjacencyList.set(person, new Set());
    }
  }
  addConnection(person1, person2) {
    this.addPerson(person1);
    this.addPerson(person2);
    this.adjacencyList.get(person1).add(person2);
    this.adjacencyList.get(person2).add(person1);
  }
  getFriends(person) {
    return this.adjacencyList.get(person) || new Set();
  }
  findCommonFriends(Person1, Person2) {
    return [...this.getFriends(Person1)].filter(element =>
      this.getFriends(Person2).has(element)
    );
  }

  findConnectionCount(friend1, friend2) {
    if (friend1.equals(friend2)) return 0;

    const arr = [];
    const selected = new Map();

    arr.push(friend1);
    selected.set(friend1, 0);

    while (arr.length > 0) {
      const currentPerson = arr.shift();
      const depth = selected.get(currentPerson);

      for (let friend of this.getFriends(currentPerson)) {
        if (!selected.has(friend)) {
          selected.set(friend, depth + 1);
          arr.push(friend);

          if (friend.equals(friend2)) {
            return depth + 1;
          }
        }
      }
    }

    return -1;
  }
}

const Bob = new Person('Bob');
const Alice = new Person('Alice');
const ankita = new Person('ankita');
const bittu = new Person('bittu');
const chintu = new Person('chintu');
const jaggu = new Person('jaggu');
const divya = new Person('divya');
const laddu = new Person('laddu');
const vishal = new Person('vishal');
const deepak = new Person('deepak');

const network = new Network();

network.addConnection(Bob, Alice);
network.addConnection(Bob, laddu);
network.addConnection(Bob, jaggu);
network.addConnection(Alice, jaggu);
network.addConnection(Bob, chintu);
network.addConnection(chintu, vishal);
network.addConnection(chintu, Alice);
network.addConnection(ankita, jaggu);

let getOutput = (Person1, Person2) => {
  console.log(
    `connection b/w ${Person1} and ${Person2} : ${network.findConnectionCount(Person1, Person2)}`
  );
};
getOutput(ankita, jaggu);
getOutput(ankita, bittu);
getOutput(ankita, divya);
getOutput(ankita, ankita);
getOutput(ankita, deepak);
getOutput(ankita, laddu);
getOutput(vishal, ankita);

let getCommonFriends = (Person1, Person2) => {
  console.log(
    `common friends b/w ${Person1} and ${Person2} : ${network.findCommonFriends(Person1, Person2)}`
  );
};
getCommonFriends(Bob, Alice);
getCommonFriends(Alice, chintu);
