import json

def validate_data():
    path = '/Users/rajpc/Documents/Java/src/data/interview-questions.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
        
        print(f"Total items: {len(data)}")
        
        ids = set()
        for idx, item in enumerate(data):
            # Check ID
            if 'id' not in item:
                print(f"Item at index {idx} missing ID: {item}")
            else:
                if item['id'] in ids:
                    print(f"Duplicate ID found: {item['id']}")
                ids.add(item['id'])
            
            # Check detailedSolution type
            if 'detailedSolution' in item:
                if not isinstance(item['detailedSolution'], str):
                     print(f"Item {item.get('id')} has non-string detailedSolution: {type(item['detailedSolution'])}")

            # Check codeSnippets
            if 'codeSnippets' in item:
                if not isinstance(item['codeSnippets'], list):
                    print(f"Item {item.get('id')} has non-list codeSnippets")
                elif len(item['codeSnippets']) == 0:
                    print(f"Item {item.get('id')} has empty codeSnippets list")
                else:
                    for s in item['codeSnippets']:
                        if 'code' not in s or 'lang' not in s:
                             print(f"Item {item.get('id')} has invalid snippet: {s}")

            # Check diagram
            if 'diagram' in item:
                 if not isinstance(item['diagram'], str):
                     print(f"Item {item.get('id')} has non-string diagram")

        print("Validation complete.")

    except Exception as e:
        print(f"JSON Error: {e}")

if __name__ == "__main__":
    validate_data()
