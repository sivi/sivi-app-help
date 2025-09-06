#!/bin/bash

# Base directory
IMG_DIR="/home/janakg/cosmos/hub/sivi-help/static/img"

# Find all category directories
for category_dir in "$IMG_DIR"/*; do
  if [ -d "$category_dir" ]; then
    category_name=$(basename "$category_dir")
    echo "Processing category: $category_name"
    
    # Process each subfolder in the category
    for subfolder in "$category_dir"/*; do
      if [ -d "$subfolder" ]; then
        subfolder_name=$(basename "$subfolder")
        duplicate_folder="$subfolder/$subfolder_name"
        
        # Check if the duplicate folder exists
        if [ -d "$duplicate_folder" ]; then
          echo "  Removing duplicate folder: $duplicate_folder"
          rmdir "$duplicate_folder"
        fi
      fi
    done
  fi
done

echo "Duplicate folders removal complete!"
