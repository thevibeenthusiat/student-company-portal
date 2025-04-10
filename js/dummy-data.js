const programmingLanguages = [
    {
        id: 1,
        name: "JavaScript",
        topics: [
            {
                id: 1,
                title: "Variables and Data Types",
                description: "Learn about variables, primitive types, and type coercion in JavaScript.",
                examples: [
                    "let name = 'John';\nconst age = 25;\nvar isStudent = true;",
                    "// Type coercion\nconsole.log('5' + 3); // Outputs: '53'\nconsole.log('5' - 3); // Outputs: 2"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Create variables using let, const, and var and demonstrate their differences.",
                        status: "not_started",
                        submission: null
                    },
                    {
                        id: 2,
                        text: "Write code that demonstrates type coercion in JavaScript.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            },
            {
                id: 2,
                title: "Functions and Scope",
                description: "Understanding function declarations, expressions, and variable scope.",
                examples: [
                    "function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconst add = (a, b) => a + b;",
                    "let globalVar = 'I am global';\nfunction test() {\n    let localVar = 'I am local';\n    console.log(globalVar); // Works\n}\nconsole.log(localVar); // Error!"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Create both a function declaration and a function expression.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            },
            {
                id: 3,
                title: "Arrays and Objects",
                description: "Working with arrays and objects in JavaScript.",
                examples: [
                    "const fruits = ['apple', 'banana'];\nfruits.push('orange');\n\nconst person = {\n    name: 'John',\n    age: 25\n};",
                ],
                questions: [
                    {
                        id: 1,
                        text: "Create an array and demonstrate three different array methods.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            }
        ]
    },
    {
        id: 2,
        name: "Python",
        topics: [
            {
                id: 4,
                title: "Basic Syntax",
                description: "Learn Python's basic syntax, indentation, and variable declaration.",
                examples: [
                    "name = 'Alice'\nage = 30\nis_student = True",
                    "# Indentation example\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Write a program demonstrating proper Python indentation.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            },
            {
                id: 5,
                title: "Lists and Dictionaries",
                description: "Working with Python's built-in data structures.",
                examples: [
                    "# Lists\nnumbers = [1, 2, 3]\nnumbers.append(4)\n\n# Dictionaries\nuser = {'name': 'John', 'age': 25}"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Create a program using both lists and dictionaries.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            }
        ]
    },
    {
        id: 3,
        name: "Java",
        topics: [
            {
                id: 6,
                title: "Classes and Objects",
                description: "Object-oriented programming fundamentals in Java.",
                examples: [
                    "public class Student {\n    private String name;\n    public Student(String name) {\n        this.name = name;\n    }\n}"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Create a class with private fields and public methods.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            },
            {
                id: 7,
                title: "Inheritance",
                description: "Understanding inheritance and polymorphism.",
                examples: [
                    "class Animal {\n    void makeSound() {}\n}\n\nclass Dog extends Animal {\n    void makeSound() {\n        System.out.println(\"Woof!\");\n    }\n}"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Create a base class and two derived classes demonstrating inheritance.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            }
        ]
    },
    {
        id: 4,
        name: "C++",
        topics: [
            {
                id: 8,
                title: "Pointers and References",
                description: "Understanding memory management in C++.",
                examples: [
                    "int x = 10;\nint* ptr = &x;\nint& ref = x;\n\n*ptr = 20; // Changes x to 20\nref = 30;  // Changes x to 30"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Write a program demonstrating pointer arithmetic and reference usage.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            },
            {
                id: 9,
                title: "Templates",
                description: "Generic programming with C++ templates.",
                examples: [
                    "template<typename T>\nT max(T a, T b) {\n    return (a > b) ? a : b;\n}"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Create a template function that works with multiple data types.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            }
        ]
    },
    {
        id: 5,
        name: "SQL",
        topics: [
            {
                id: 10,
                title: "Basic Queries",
                description: "Learn fundamental SQL queries and operations.",
                examples: [
                    "SELECT * FROM users WHERE age > 18;\n\nINSERT INTO users (name, age) VALUES ('John', 25);"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Write queries to create a table and insert data.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            },
            {
                id: 11,
                title: "Joins",
                description: "Understanding different types of SQL joins.",
                examples: [
                    "SELECT orders.id, users.name\nFROM orders\nINNER JOIN users ON orders.user_id = users.id;"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Write queries demonstrating INNER, LEFT, and RIGHT joins.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            },
            {
                id: 12,
                title: "Aggregation",
                description: "Using aggregate functions and GROUP BY.",
                examples: [
                    "SELECT category, COUNT(*) as count, AVG(price) as avg_price\nFROM products\nGROUP BY category\nHAVING count > 5;"
                ],
                questions: [
                    {
                        id: 1,
                        text: "Write queries using different aggregate functions.",
                        status: "not_started",
                        submission: null
                    }
                ],
                status: "not_started"
            }
        ]
    }
];

const students = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        profile_picture: "https://via.placeholder.com/50",
        progress: {
            "JavaScript": {
                completed_topics: 3,
                score: 30
            },
            "Python": {
                completed_topics: 5,
                score: 50
            }
        }
    },
    // ... more students
]; 