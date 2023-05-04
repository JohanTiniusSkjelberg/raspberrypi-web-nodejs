import json

# Open the input JSON file
with open('recipeItems.json', 'rb') as file, open('output.json', 'w', encoding='utf-8') as output:
    while True:
        line = file.readline().decode('utf-8')
        if len(line)==3 and '}' in line:
            line = line.strip()+','
        if not line:
            break
        output.write(line)

    # data = file.read()
    # print(len(data))

# Insert commas between objects
# data = data.replace('}{', '},{')

# # Parse the updated JSON data
# json_data = json.loads(f'[{data}]')

# # Write the updated JSON data to a new file
# with open('output.json', 'w') as file:
#     json.dump(json_data, file)
