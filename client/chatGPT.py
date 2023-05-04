import os

# replace with the path to your folder
folder_path = "C:\\Users\\johan\\Documents\\raspberry-web-node\\client\\src"
output_file = "output.txt"  # replace with the name of the output file

with open(output_file, "w") as f:
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isdir(file_path) and (filename == "node_modules" or filename==".git" or filename=="public"):
            print(f"Ignoring folder '{filename}'")
            continue
        elif os.path.isfile(file_path):
            with open(file_path, "r") as infile:
                f.write("\n-----------------"+filename+"--------------------\n")
                f.write(infile.read())