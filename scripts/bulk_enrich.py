import json

def bulk_enrich():
    path = '/Users/rajpc/Documents/Java/src/data/interview-questions.json'
    try:
        with open(path, 'r') as f:
            questions = json.load(f)

        def update_q(q_id, detailed_sol):
            for q in questions:
                if q.get('id') == q_id:
                    q['detailedSolution'] = detailed_sol
                    return

        # --- System Design Enhancements ---

        # 6. CAP Theorem
        update_q(6, """### CAP Theorem Explained
The CAP theorem states that a distributed data store can effectively provide only two of the following three guarantees:
1.  **Consistency (C):** Every read receives the most recent write or an error.
2.  **Availability (A):** Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
3.  **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

### Trade-offs
- **CP (Consistency + Partition Tolerance):** Wait for response from the partitioned node. System might time out. Good for banking. (e.g., MongoDB, HBase)
- **AP (Availability + Partition Tolerance):** Return the most recent version of data available, which might be stale. Good for social media feeds. (e.g., Cassandra, DynamoDB)
- **CA (Consistency + Availability):** Not possible in distributed systems as network partitions are inevitable.
""")

        # 7. Sharding
        update_q(7, """### Sharding Strategies
1.  **Key Based Sharding (Hash):** `shard_id = hash(key) % total_shards`. Uniform distribution but adding/removing nodes causes rebalancing (requires Consistent Hashing).
2.  **Range Based Sharding:** Shard based on range of values (e.g., User ID 1-1000). Easy to implement but can lead to "hot spots" if one range is more active.
3.  **Directory Based Sharding:** Lookup table holding location of each key. Flexible but the lookup table becomes a single point of failure/bottleneck.

### Pros & Cons
- **Pros:** Horizontal scaling, reduced index size, improved performance.
- **Cons:** Complex queries (joins across shards are hard), data rebalancing is difficult, no native transaction support across shards.
""")

        # 11. Distributed Transactions
        update_q(11, """### 2-Phase Commit (2PC)
- **Coordinator** asks all participants if they can commit. If all say "yes", it sends "commit". If any say "no", it sends "rollback".
- **Drawback:** Blocking protocol. If coordinator fails, participants are locked. Not scalable.

### Saga Pattern
- **Choreography:** Services emit events. Other services listen and react. Decentralized. Hard to track.
- **Orchestration:** a central Orchestrator tells services what to do. Centralized control. Easier to manage state.
- **Compensation:** Since there is no rollback, if a step fails, you must execute a "compensating transaction" to undo previous steps (e.g., "refund payment" if "ship item" fails).
""")

       # --- Core Java & Concurrency Enhancements ---

        # 1. == vs .equals()
        update_q(1, """### Comparison
- **`==` Operator:**
    - Checks reference equality (address in memory) for objects.
    - Checks value equality for primitives (int, char, etc.).
    - Example: `s1 == s2` is true only if they point to the exact same object.

- **`.equals()` Method:**
    - Defined in `Object` class. Default implementation uses `==`.
    - Classes override it to check for logical equality (content).
    - Example: `String` overrides it to compare character sequence. `Integer` compares int value.
    - *Contract:* If `a.equals(b)` is true, then `a.hashCode()` must be same as `b.hashCode()`.
""")

        # 2. Immutable String
        update_q(2, """### How it works
1.  **Internal Storage:** String stores characters in a `private final byte[] value` (Java 9+) or `char[]` (older).
2.  **No Setters:** The class provides no methods to modify the value.
3.  **Final Class:** `String` class is `final`, so it cannot be subclassed to override behavior.
4.  **String Pool:** JVM maintains a special memory area for String literals to save memory. Immutability is required for the pool to function safely (sharing references).
""")

        # 3. SOLID
        update_q(3, """### The 5 Principles
1.  **Single Responsibility Principle (SRP):** A class should have only one reason to change.
2.  **Open/Closed Principle (OCP):** Software entities should be open for extension but closed for modification.
3.  **Liskov Substitution Principle (LSP):** Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.
4.  **Interface Segregation Principle (ISP):** Clients should not be forced to implement interfaces they don't use. Split large interfaces into smaller ones.
5.  **Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions.
""")

        # 5. Garbage Collection
        update_q(5, """### How GC Works
1.  **Mark:** GC identifies which objects are still in use (reachable from GC Roots: active threads, static variables, local vars).
2.  **Sweep:** GC removes objects that are not marked.
3.  **Compact:** (Optional) Moves surviving objects to contiguous memory to reduce fragmentation.

### Generations
- **Young Generation:** Where new objects are allocated (Eden space). Minor GC happens here. Fast.
- **Old Generation:** Objects that survived simplified GCs in Young Gen are moved here. Major GC. Slower.
- **Permanent Gen / Metaspace:** Stores metadata about classes and methods.
""")

        # 8. Deadlock
        update_q(8, """### Conditions for Deadlock
1.  **Mutual Exclusion:** Resources cannot be shared.
2.  **Hold and Wait:** A process holding a resource is waiting for another.
3.  **No Preemption:** Resources cannot be forcibly taken away.
4.  **Circular Wait:** A waits for B, B waits for C, C waits for A.

### Prevention
- **Avoid Circular Wait:** Lock resources in a strict order (e.g., always lock Account A before Account B).
- **Lock Timeout:** Use `tryLock(timeout)` instead of infinite wait.
- **Deadlock Detection:** Run a background thread to detect cycles and abort one transaction.
""")
        
        # 140. String Immutability reasoning
        update_q(140, """### Why Immutable?
1.  **Security:** Strings are used for params like network connections, db URLs, usernames. Passing mutable strings could allow malicious modification.
2.  **Synchronization:** Immutable objects are automatically thread-safe.
3.  **Caching (String Pool):** If strings were mutable, we couldn't reuse the same instance for literals "Hello" in different parts of code.
4.  **Hashcode Caching:** Since content doesn't change, hashcode is calculated once and cached. Key for HashMap performance.
""")

        # 113. ArrayList vs LinkedList
        update_q(113, """### Comparison Table
| Feature | ArrayList | LinkedList |
| :--- | :--- | :--- |
| **Underlying Data Structure** | Resizable Array | Doubly Linked List |
| **Access (get)** | O(1) - Random Access | O(n) - Sequential Access |
| **Insert/Delete (middle)** | O(n) - Requires shifting | O(1) - Only pointer change (if node known) |
| **Memory Overhead** | Low (just array) | High (node object + next/prev pointers) |
| **Data Locality** | High (contiguous memory, cache friendly) | Low (scattered memory) |

### When to use
- **ArrayList:** Read-heavy, frequent access by index.
- **LinkedList:** Write-heavy (specifically adding/removing from start/middle), implementing Stacks/Queues.
""")

        # 12. String vs StringBuffer vs StringBuilder
        update_q(12, """### Comparison
| Feature | String | StringBuffer | StringBuilder |
| :--- | :--- | :--- | :--- |
| **Immutability** | Immutable | Mutable | Mutable |
| **Thread Safety** | Thread-safe (inherently) | Thread-safe (synchronized methods) | Not Thread-safe |
| **Performance** | Slow (creates new object for every concat) | Slower than Builder (synch overhead) | Fastest |
| **Usage** | Constants, Keys, Parameters | Multithreaded string manipulation | Single-threaded string manipulation (most common) |
""")

        # 13. HashMap internal working
        update_q(13, """### Internal Working
1.  **put(key, value):**
    - Calculates `hash(key)`.
    - Finds bucket index: `index = hash & (n-1)`.
    - If bucket is empty, adds node.
    - If collision (bucket not empty), checks `equals()` with existing keys.
    - If key exists, updates value. If not, adds to linked list (or Red-Black tree if > 8 nodes, Java 8+).
2.  **get(key):**
    - Calculates hash, finds bucket.
    - Traverses list/tree, comparing keys using `equals()`.
3.  **Resize:** When `size > capacity * loadFactor` (default 0.75), array size doubles and re-hashes all entries.
""")

        # 15. Java 8 Features
        update_q(15, """### Key Features
1.  **Lambda Expressions:** `(args) -> { body }`. Functional programming style.
2.  **Stream API:** Functional-style operations on streams of elements (map, filter, reduce). Parallel processing support.
3.  **Optional Class:** Container object to avoid NullPointerException.
4.  **Default Methods:** Methods in interfaces with implementation (fixes "diamond problem" partially).
5.  **Date Time API:** `LocalDate`, `LocalTime` (immutable, thread-safe replacments for `Date`).
""")

        # 18. Checked vs Unchecked Exceptions
        update_q(18, """### Differences
1.  **Checked Exceptions:**
    - Inherit from `Exception` (but not `RuntimeException`).
    - Checked at **compile-time**.
    - Must be handled (`try-catch`) or declared (`throws`).
    - Use for: Recoverable conditions (file not found, network issue).
    - Examples: `IOException`, `SQLException`.
2.  **Unchecked Exceptions:**
    - Inherit from `RuntimeException`.
    - Checked at **runtime**.
    - No need to handle explicitly.
    - Use for: Programming errors (logic bugs).
    - Examples: `NullPointerException`, `ArrayIndexOutOfBoundsException`.
""")
        
        # 21. Spring Boot Autoconfiguration
        update_q(21, """### How it works
- **@EnableAutoConfiguration:** Triggers the process.
- **spring.factories:** Spring scans this file in jar dependencies to find `AutoConfiguration` classes.
- **Conditional Annotations:** Configuration classes run only if conditions are met:
    - `@ConditionalOnClass`: If a specific class is in classpath (e.g., if H2 driver is found, configure H2 datasource).
    - `@ConditionalOnMissingBean`: If user hasn't defined their own bean, use the default.
""")
        
        # 23. Bean Scopes
        update_q(23, """### Spring Bean Scopes
1.  **Singleton (Default):** One instance per Spring Container. Cached in singleton cache.
2.  **Prototype:** New instance created every time it is requested.
3.  **Request:** One instance per HTTP request (Web aware).
4.  **Session:** One instance per HTTP session (Web aware).
5.  **Application:** One instance per ServletContext.
6.  **WebSocket:** One instance per WebSocket lifecycle.
""")

        # 24. @Component vs @Bean
        update_q(24, """### Comparison
- **@Component:**
    - Class-level annotation.
    - Spring explicitly scans and creates the bean (via Component Scanning).
    - Control is with Spring.
    - Use for: Your own classes.
- **@Bean:**
    - Method-level annotation (usually in `@Configuration` class).
    - You write the code to instantiate the object.
    - Control is with Developer.
    - Use for: Third-party libraries (can't add `@Component` to their source code).
""")
        
        # 127. Find Missing Number
        update_q(127, """### Algorithm (Sum Formula)
1.  Calculate expected sum of 1 to N: `total = N * (N + 1) / 2`.
2.  Calculate actual sum of elements in array.
3.  `Missing Number = Expected Sum - Actual Sum`.
4.  **Complexity:** Time O(n), Space O(1).
5.  **Overflow Risk:** If N is large, sum might overflow. XOR approach avoids this.

### Approach 2 (XOR)
- `XOR` all numbers from 1 to N.
- `XOR` all elements in array.
- `XOR` of results gives missing number. (Since `A ^ A = 0` and `A ^ 0 = A`).
""")

        # 131. Palindrome Check
        update_q(131, """### Approaches
1.  **Reverse String:** `str.equals(new StringBuilder(str).reverse().toString())`. Simple but O(n) space.
2.  **Two Pointers (Optimal):**
    - Pointer `left` at 0, `right` at length-1.
    - Loop while `left < right`.
    - Compare `str.charAt(left)` with `str.charAt(right)`.
    - If mismatch -> Not palindrome.
    - Else `left++`, `right--`.
    - **Complexity:** Time O(n/2), Space O(1).
""")

        with open(path, 'w') as f:
            json.dump(questions, f, indent=4)
        print("Bulk enrichment complete.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    bulk_enrich()
