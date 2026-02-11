import os
from PIL import Image # pip install Pillow

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                file_name, _ = os.path.splitext(file_path)
                
                # Check if WebP already exists to avoid re-doing it
                if not os.path.exists(f"{file_name}.webp"):
                    print(f"Converting: {file}")
                    image = Image.open(file_path)
                    # Convert to WebP (Quality 80 is the sweet spot)
                    image.save(f"{file_name}.webp", "WEBP", quality=80)

# Run in current folder
convert_to_webp(".")