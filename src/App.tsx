import React, { useState } from 'react';
   import * as math from 'mathjs';
   import './App.css';

   const App: React.FC = () => {
     const [equation, setEquation] = useState('');
     const [result, setResult] = useState<string[]>([]);
     const [error, setError] = useState('');

     const solveEquation = () => {
       try {
         setError('');
         setResult([]);
         if (!equation) throw new Error('Please enter an equation');

         if (equation.includes(',')) {
           // System of equations (e.g., "2*x + y = 5, x - y = 1")
           const equations = equation.split(',').map(eq => eq.trim());
           if (equations.length !== 2) throw new Error('Enter exactly two equations separated by a comma');

           // Rewrite equations to form Ax = b
           const coeffs = equations.map(eq => {
             const sides = eq.split('=').map(s => s.trim());
             if (sides.length !== 2) throw new Error('Each equation must contain an equals sign');
             // Move RHS to LHS: LHS - RHS = 0
             const expr = `(${sides[0]}) - (${sides[1]})`;
             const parsed = math.parse(expr);
             const xCoeff = math.evaluate(parsed.toString(), { x: 1, y: 0 }) - math.evaluate(parsed.toString(), { x: 0, y: 0 });
             const yCoeff = math.evaluate(parsed.toString(), { x: 0, y: 1 }) - math.evaluate(parsed.toString(), { x: 0, y: 0 });
             const constant = -math.evaluate(parsed.toString(), { x: 0, y: 0 });
             return [xCoeff, yCoeff, constant];
           });

           // Form matrix A and vector b
           const A = math.matrix([
             [coeffs[0][0], coeffs[0][1]],
             [coeffs[1][0], coeffs[1][1]],
           ]);
           const b = math.matrix([coeffs[0][2], coeffs[1][2]]);
           const solution = math.lusolve(A, b);

           const steps = [
             `System: ${equations.join(', ')}`,
             `Matrix form: [${coeffs[0][0]}x + ${coeffs[0][1]}y = ${coeffs[0][2]}, ${coeffs[1][0]}x + ${coeffs[1][1]}y = ${coeffs[1][2]}]`,
             `Solution: x = ${solution.get([0, 0]).toFixed(2)}, y = ${solution.get([1, 0]).toFixed(2)}`,
           ];
           setResult(steps);
         } else {
           // Single linear equation (e.g., "2*x + 3 = 7")
           const sides = equation.split('=').map(s => s.trim());
           if (sides.length !== 2) throw new Error('Equation must contain an equals sign');
           // Move RHS to LHS: LHS - RHS = 0
           const expr = `(${sides[0]}) - (${sides[1]})`;
           const parsed = math.parse(expr);
           const simplified = math.simplify(parsed.toString());
           const xCoeff = math.evaluate(simplified.toString(), { x: 1 }) - math.evaluate(simplified.toString(), { x: 0 });
           const constant = -math.evaluate(simplified.toString(), { x: 0 });
           const solution = constant / xCoeff;

           const steps = [
             `Equation: ${equation}`,
             `Move terms: ${sides[0]} - ${sides[1]} = 0`,
             `Simplify: ${simplified}`,
             `Solution: x = ${solution.toFixed(2)}`,
           ];
           setResult(steps);
         }
       } catch (err: any) {
         setError('Invalid equation. Try 2*x + 3 = 7 or 2*x + y = 5, x - y = 1');
       }
     };

     return (
       <div className="container">
         <div className="sidebar">
           <h2>Solution History</h2>
           {result.length > 0 && (
             <ul>
               {result.map((step, index) => (
                 <li key={index}>{step}</li>
               ))}
             </ul>
           )}
         </div>
         <div className="main">
           <h1>AI Algebra Solver</h1>
           <div className="card">
             <input
               type="text"
               value={equation}
               onChange={(e) => setEquation(e.target.value)}
               placeholder="Enter equation (e.g., 2*x + 3 = 7)"
             />
             <button onClick={solveEquation}>Solve</button>
             {error && <p>{error}</p>}
             {result.length > 0 && (
               <div>
                 <h2>Solution Steps:</h2>
                 <ul>
                   {result.map((step, index) => (
                     <li key={index}>{step}</li>
                   ))}
                 </ul>
               </div>
             )}
           </div>
         </div>
       </div>
     );
   };

   export default App;