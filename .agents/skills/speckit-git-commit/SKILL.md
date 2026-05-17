---
name: speckit-git-commit
description: Generate conventional commit messages from git diff and optionally commit changes
---

# Commit Message Generator

Generate a concise and precise git commit message for the current
changes based on `git diff`.

Ask for proceeding with commit at the end.

**Format:** Conventional Commits (https://www.conventionalcommits.org/)

**Structure:**

1. `<type>(<scope>): <short summary>`
2. Leave a blank line.
3. Add a body explaining the changes.

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (white-space, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests

**Instructions:**

1. Summary:
   - Keep the summary under 50 characters.
   - Use `<type>(<scope>): <short summary>` format.

2. Body:
   - Keep body lines under 72 characters.
   - Explain _what_ changed and _why_ it was necessary. For example:
     - **What:** "Refactored authentication logic to use middleware."
     - **Why:** "Improves code reusability and simplifies testing."
   - Avoid implementation details (e.g., "Added a loop to iterate over users.").
   - Use bullet points if multiple files were modified.

3. Exclusions:
   - Do not include the Co-Authored-By line.
