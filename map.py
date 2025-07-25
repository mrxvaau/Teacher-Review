import os
import datetime
from tqdm import tqdm  # Install: pip install tqdm
os.system("cls")
# ======== DEFAULT CONFIG ========
OUTPUT_FILE = "structure.txt"
IGNORE_LIST = {".git", ".idea", "node_modules"}
# ================================

def should_ignore(path):
    """Check if path should be ignored based on IGNORE_LIST."""
    return any(ignore in path for ignore in IGNORE_LIST)

def gather_files(target_dir):
    """Collect all files and directories for progress tracking."""
    all_paths = []
    for root, dirs, files in os.walk(target_dir):
        dirs[:] = [d for d in dirs if not should_ignore(d)]
        if not should_ignore(root):
            all_paths.append(root)
        for file in files:
            if not should_ignore(file):
                all_paths.append(os.path.join(root, file))
    return all_paths

def write_structure(target_dir, output_file):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    all_paths = gather_files(target_dir)

    with open(output_file, "a", encoding="utf-8") as f:
        f.write("=" * 30 + "\n")
        f.write(f"Run at: {now}\n")
        f.write(f"Directory: {target_dir}\n")
        f.write(f"Ignore: {', '.join(IGNORE_LIST)}\n")
        f.write("=" * 30 + "\n\n")

        # TREE VIEW
        f.write("-------- TREE VIEW --------\n")
        for root, dirs, files in tqdm(os.walk(target_dir), desc="Building tree", unit="dir"):
            dirs[:] = [d for d in dirs if not should_ignore(d)]
            if should_ignore(root):
                continue

            level = root.replace(target_dir, "").count(os.sep)
            indent = " " * 4 * level
            f.write(f"{indent}{os.path.basename(root)}/\n")
            subindent = " " * 4 * (level + 1)
            for file in files:
                if not should_ignore(file):
                    f.write(f"{subindent}{file}\n")
        f.write("\n")

        # FULL PATHS
        f.write("-------- FULL PATHS --------\n")
        for path in tqdm(all_paths, desc="Listing full paths", unit="file"):
            if os.path.isfile(path):
                f.write(path + "\n")
        f.write("\n\n")

def print_header():
    print("=" * 40)
    print("     DIRECTORY STRUCTURE BUILDER")
    print("=" * 40)

if __name__ == "__main__":
    print_header()
    print("\nDefault Ignore List:")
    for item in IGNORE_LIST:
        print(f"  - {item}")
    print(f"\nCurrently ignoring {len(IGNORE_LIST)} items.\n")

    # Add extra ignores interactively
    while True:
        add = input("Add more ignore items? (y/n): ").strip().lower()
        if add == 'y':
            new_item = input("Enter folder/file to ignore: ").strip()
            if new_item:
                IGNORE_LIST.add(new_item)
                print(f"Added '{new_item}'. Total ignore count: {len(IGNORE_LIST)}\n")
        else:
            break

    print("\nWorking... Please wait.\n")
    target = os.getcwd()  # current directory
    write_structure(target, OUTPUT_FILE)
    print(f"\n✅ Done! Output saved to '{OUTPUT_FILE}'.")
