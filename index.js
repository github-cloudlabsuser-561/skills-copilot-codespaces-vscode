const data = [
    [{ name: 'John' }, { name: 'Jane' }],
    [{ name: 'Bob' }]
];

const names = data.flatMap(arr => arr.map(obj => obj.name));

console.log(names); // Output: ['John', 'Jane', 'Bob']