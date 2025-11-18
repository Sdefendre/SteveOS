#!/bin/bash

# Deploy script for updating blog posts

echo "🚀 SteveOS Blog Update Script"
echo "========================================="

# Navigate to project directory
# Using current directory relative path or assuming we are in the root
# cd "/Users/stevesmacmini/Desktop/Code/Active Projects/code/SteveOS"

# Check if there are changes
echo "🔍 Checking for changes..."
git status

# Add all blog post files
echo "📁 Adding blog post files..."
git add blog_posts/
git add constants/

# Commit changes
echo "💾 Committing changes..."
git commit -m "feat: Update blog content"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo "✅ Success! Changes pushed to main."
