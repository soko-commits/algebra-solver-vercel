# AI Algebra Solver User Manual

This guide explains how to use the AI Algebra Solver web app, built with React and mathjs, to solve linear and systems of equations with step-by-step solutions.

## Using the Web App
1. Visit https://algebra-solver-vercel.vercel.app in a web browser (e.g., Firefox).
2. In the input field, enter an equation:
   - For a single equation, use syntax like `2*x + 3 = 7` (use * for multiplication).
   - For systems of equations, enter equations separated by commas, e.g., `2*x + y = 5, x - y = 1`.
3. Click the "Solve" button.
4. View the step-by-step solution and final answer displayed below the input.
5. Use the collapsible green sidebar for navigation (mobile-friendly) and note the purple math text for clarity.

## Examples
- Input: `2*x + 3 = 7` → Answer: x = 2
- Input: `x^2 - 4 = 0` → Answer: x = 2, x = -2
- Input: `2*x + y = 5, x - y = 1` → Answer: x = 2, y = 1

## Troubleshooting
- **Error messages**: Ensure correct syntax (e.g., use `2*x` not `2x`). Check for typos or unsupported equation types.
- **Browser issues**: Clear cache or try another browser if the app doesn’t load.
- **Development**: To run locally, clone https://github.com/soko-commits/algebra-solver-vercel, run `npm install`, then `npm start` to view at http://localhost:3000.

## Notes
- The app is mobile-responsive with a collapsible green sidebar and purple math text.
- Grok (xAI) guided the development, ensuring a user-friendly interface and robust error handling.