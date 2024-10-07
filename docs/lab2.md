1. go to path of git repo project.
2. run command:
```sh
# Create the pre-push hook
cat > .git/hooks/pre-push << EOL
```
3. Paste the following code in the file and save
```sh
# Check if tests passed
if [ $? -ne 0 ]; then
  echo "Tests failed. Push aborted."
  exit 1
else
  echo "All tests passed. Proceeding with push."
  exit 0
fi
```
4. type `EOL` to save the file and
```sh
# Make the hook executable
chmod +x .git/hooks/pre-push
```