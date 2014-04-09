# JSS Plans
============================


## What is this project trying to do?

1. Expose the internal compiler information to the outers(maybe programmers, IDEs, test coverages and other optmization tools).
2. Build a basic toolset to analysis/optimize javascript code.



## APIs

1. Syntax Tree API: there are already a lot of libs here, exprima, uglifyjs, etc.
   * Formatter
   * Coloriser
   * Outlining
   
2. Symbol API:
   * Navigate To
   * Object Browser
   
3. Semantic Tree:
   * Implicit Type System, need to analysis reference types and what's type it's
   * 
   
4. Flow Analysis:
   * Go To Definition
   * Extract Method
   * Rename
   * Find All References
   * Completion List
   
   - Control Flow Analysis
   - Data Flow Analysis: Def-Use Chain
   
5. Emit API: escodegen
   * Code Mangling
   * Run Multiple Platform

