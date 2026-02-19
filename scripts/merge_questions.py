import json
import os
import glob

def merge_questions():
    base_path = '/Users/rajpc/Documents/Java/src/data'
    main_file = os.path.join(base_path, 'interview-questions.json')
    
    # Read original file
    try:
        with open(main_file, 'r') as f:
            all_questions = json.load(f)
    except FileNotFoundError:
        all_questions = []
        
    print(f"Original count: {len(all_questions)}")
    
    # Find all temp files
    temp_files = glob.glob(os.path.join(base_path, 'temp_questions_*.json'))
    
    for temp_file in temp_files:
        print(f"Processing {temp_file}...")
        try:
            with open(temp_file, 'r') as f:
                questions = json.load(f)
                all_questions.extend(questions)
        except Exception as e:
            print(f"Error reading {temp_file}: {e}")
            
    # Sort by ID to be nice
    all_questions.sort(key=lambda x: x.get('id', 0))
    
    # Write back to main file
    with open(main_file, 'w') as f:
        json.dump(all_questions, f, indent=4)
        
    print(f"Total questions after merge: {len(all_questions)}")
    
    # Cleanup
    for temp_file in temp_files:
        os.remove(temp_file)
        print(f"Removed {temp_file}")

if __name__ == "__main__":
    merge_questions()
