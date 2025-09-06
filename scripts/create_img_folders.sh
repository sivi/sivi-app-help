#!/bin/bash

# Base directories
DOCS_DIR="/home/janakg/cosmos/hub/sivi-help/docs/category"
IMG_DIR="/home/janakg/cosmos/hub/sivi-help/static/img"

# Create the base structure
for category_dir in "$DOCS_DIR"/*; do
  if [ -d "$category_dir" ]; then
    category_name=$(basename "$category_dir")
    echo "Processing category: $category_name"
    
    # Create the category directory in img folder
    mkdir -p "$IMG_DIR/$category_name"
    
    # Process each markdown file in the category
    for md_file in "$category_dir"/*.md; do
      file_name=$(basename "$md_file" .md)
      
      # Skip index.md and _category_.json files
      if [ "$file_name" != "index" ]; then
        echo "  Creating folder for: $file_name"
        
        # Create a folder for each markdown file
        mkdir -p "$IMG_DIR/$category_name/$file_name/$file_name"
      fi
    done
  fi
done

echo "Folder structure creation complete!"
