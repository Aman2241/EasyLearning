import json
import os

def fix_and_enhance():
    main_file = '/Users/rajpc/Documents/Java/src/data/interview-questions.json'
    
    try:
        with open(main_file, 'r') as f:
            questions = json.load(f)
    except FileNotFoundError:
        print("File not found.")
        return

    def update_q(q_id, detailed_sol):
        for q in questions:
            if q.get('id') == q_id:
                q['detailedSolution'] = detailed_sol
                print(f"Updated Question {q_id}")
                return

    # 1. Fix ID 4 (Monolithic vs Microservices) - I accidentally added String Reverse solution here
    for q in questions:
        if q.get('id') == 4:
            # Check if it has the wrong solution
            if "StringBuilder" in q.get('detailedSolution', ''):
                print("Fixing ID 4...")
                q['detailedSolution'] = """### Monolithic Architecture
- **Single Unit:** All components (UI, Business Logic, DB access) are bundled together.
- **Pros:** Simple to develop/test/deploy initially.
- **Cons:** Hard to scale individual components. A single bug can bring down the whole app. Tight coupling.

### Microservices Architecture
- **Collection of Services:** App is broken down into small, independent services communicating via APIs (HTTP/REST/gRPC).
- **Pros:** Scalability (scale only what's needed), Technology Diversity (polyglot), Fault Isolation.
- **Cons:** Distributed system complexity (network latency, data consistency, monitoring).
"""

    # 2. Enhance Coding Questions
    
    # ID 129: Reverse a String
    update_q(129, """### Approaches
1.  **StringBuilder:** Use the built-in `reverse()` method. Efficient and simple.
2.  **Char Array:** Convert string to char array, swap start and end indices until they meet.
3.  **Recursive:** `reverse(str.substring(1)) + str.charAt(0)`. Not recommended for deep recursion.

### Code Implementation (Two Pointers)
```java
public static String reverse(String str) {
    char[] chars = str.toCharArray();
    int left = 0, right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
    return new String(chars);
}
```
""")

    # ID 130: Check Prime
    update_q(130, """### Logic
A prime number is a number greater than 1 that has no divisors other than 1 and itself.
- ** brute force:** Check from 2 to n-1. O(n).
- ** optimized:** Check from 2 to sqrt(n). If n has a factor larger than sqrt(n), the other factor must be smaller than sqrt(n). O(sqrt(n)).

### Code
```java
boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```
""")

    # ID 131: Fibonacci
    update_q(131, """### Approaches
1.  **Recursive:** `fib(n) = fib(n-1) + fib(n-2)`. O(2^n) exponential time. Bad.
2.  **Iterative:** simple loop. O(n).
3.  **Dynamic Programming (Memoization):** Store results in array. O(n).

### Code (Iterative)
```java
void printFib(int count) {
    int n1 = 0, n2 = 1, n3;
    System.out.print(n1 + " " + n2);
    for (int i = 2; i < count; ++i) {
        n3 = n1 + n2;
        System.out.print(" " + n3);
        n1 = n2;
        n2 = n3;
    }
}
```
""")

    # ID 132: Second Highest Salary
    update_q(132, """### SQL Query Approaches
1.  **Subquery:**
    ```sql
    SELECT MAX(Salary) FROM Employee 
    WHERE Salary < (SELECT MAX(Salary) FROM Employee);
    ```
2.  **Limit/Offset (MySQL/Postgres):**
    ```sql
    SELECT Salary FROM Employee 
    ORDER BY Salary DESC 
    LIMIT 1 OFFSET 1;
    ```
3.  **Dense Rank:**
    ```sql
    WITH Ranked AS (
        SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) as rank
        FROM Employee
    )
    SELECT Salary FROM Ranked WHERE rank = 2;
    ```
""")

    # ID 133: Swap without third variable
    update_q(133, """### Math Logic
Using Addition and Subtraction:
1. `a = a + b` (a becomes sum)
2. `b = a - b` (b becomes original a)
3. `a = a - b` (a becomes original b)

### Code
```java
int a = 10, b = 20;
a = a + b; // a = 30
b = a - b; // b = 10
a = a - b; // a = 20
```
*Note: Be careful of integer overflow.*
""")

    # Write back
    with open(main_file, 'w') as f:
        json.dump(questions, f, indent=4)
        
    print("Corrections and enhancements saved.")

if __name__ == "__main__":
    fix_and_enhance()
