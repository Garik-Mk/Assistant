import sys

def perform_search(query):
    result = f"Searching for: {query}"
    with open('test.txt', 'w',  encoding="utf-8") as fd:
        fd.write(query)
    print(query)
    return result

perform_search(sys.argv[1])