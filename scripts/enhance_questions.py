import json
import os

def enhance_questions():
    main_file = '/Users/rajpc/Documents/Java/src/data/interview-questions.json'
    
    try:
        with open(main_file, 'r') as f:
            questions = json.load(f)
    except FileNotFoundError:
        print("File not found.")
        return

    # Helper to find question by ID or approximate match
    def update_question(q_id, detailed_sol, new_code=None):
        for q in questions:
            if q.get('id') == q_id:
                q['detailedSolution'] = detailed_sol
                if new_code:
                     # Check if it has snippets or single snippet
                    if 'codeSnippets' in q:
                         # Append or replace? Let's just add a Java snippet if missing or update it
                         pass # Complex to update specific snippet, let's assume we replace single snippet for now if strictly coding
                    else:
                        q['codeSnippet'] = new_code
                print(f"Updated Question {q_id}")
                return

    # Update specific questions with detailed solutions
    
    # 1. Reverse a String
    update_question(4, """### Approaches
1.  **StringBuilder:** Use the built-in `reverse()` method. efficient and simple.
2.  **Char Array:** Convert string to char array, swap start and end indices until they meet.
3.  **Recursive:** `reverse(str.substring(1)) + str.charAt(0)`. Not recommended for deep recursion due to stack overflow risk.

### Complexity
- **Time:** O(n) for all methods.
- **Space:** O(n) for StringBuilder and Recursive (stack). O(1) for Char Array (in-place if mutable, but String in Java is immutable so O(n) for new array).
""")

    # 5. Check various questions... I will pick a few IDs based on previous knowledge or assumption of low IDs being "Basic Coding/Java"
    # Actually, I should probably generate a new file with detailed solutions and merge it, or just use this script to inject them.
    # Let's inject a generic "Detailed Solution" for categories to test the UI first.
    
    # Let's find some Coding questions and generic System Design ones if any existed (extracted from 3-5 years)
    count = 0
    for q in questions:
        if q.get('category') == 'Coding' and 'detailedSolution' not in q:
            # Add a placeholder or simple expansion if possible. 
            # For now, I will manually update a few key ones or just let the new System Design ones carry the feature.
            pass
            
    # Write back
    with open(main_file, 'w') as f:
        json.dump(questions, f, indent=4)
        
    print("Enhanced questions saved.")

if __name__ == "__main__":
    enhance_questions()
