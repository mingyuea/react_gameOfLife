This is Conway's Game of Life, written in React.

It uses two components, one container that has the logic for cell life/death, and one presentational component that displays cells row by row.

The rules to the game are listed as thus:

	Any live cell with fewer than two live neighbors dies, as if caused by under population.

	Any live cell with two or three live neighbors lives on to the next generation.

	Any live cell with more than three live neighbors dies, as if by overpopulation.

	Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

A cell has 8 neighbors, which are the 8 other cells surronding them. Following these rules, the container component can automatically generate future generations of cells

You can click on any cell within the 30 by 30 grid to toggle alive or dead. Black filled cells are alive, blank white cells are dead.
You can start and pause cell generation, or clear the grid and start fresh

NOTE: This project has no styling or CSS yet.