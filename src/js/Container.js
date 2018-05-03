import React from 'react';
import ReactDOM from 'react-dom';
import GridRows from './GridRows';

class Container extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isStart: false,
			currLiveCells : [10, 40, 70, 225, 255, 285, 620, 621, 622, 739, 740, 769, 770, 797, 798, 826, 827],
			genNum: 0,
			tableStyle: {
				borderSpacing: 0,
				borderCollapse: 'collapse'
			},
			liveCellStyle : {
				backgroundColor: 'black',
				width: 8,
				height: 8,
				border: '1px solid black'
				},
			normCellStyle : {
				width: 8,
				height: 8,
				border: '1px solid black'
				}
		}

		this.findNextGen = this.findNextGen.bind(this);
		this.handleCellChange = this.handleCellChange.bind(this);
		this.startGen = this.startGen.bind(this);
		this.pauseGen = this.pauseGen.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
	}

	handleCellChange(idNum){
		let liveCopy = this.state.currLiveCells;
		if(liveCopy.includes(idNum)){
			liveCopy.splice(liveCopy.indexOf(idNum), 1);
		}
		else{
			liveCopy.push(Number(idNum));
		}

		this.setState({
			currLiveCells: liveCopy
		});
	}

	findNextGen(){
		let nextGen = [];
		let tmpLive = this.state.currLiveCells;
		let genCount = this.state.genNum;
		if(this.state.currLiveCells.length == 0){
			clearInterval(this.startLife);
			this.setState({
				isStart: false,
				genNum: 0
			});
		}

		for(let i=0; i<900; i++){
			let liveCount = 0;
			let testInd;

			if(i == 0){
				testInd = [29, 899, 870, 871, 1, 31, 30, 59];
			}
			else if(i == 29){
				testInd = [28, 898, 899, 870, 0, 30, 59, 58];
			}
			else if(i> 0 && i < 29){
				testInd = [i - 1, 869 + i, 870 + i, 871 + i, i+ 1, i + 31, i + 30, i +29];
			}
			else if(i == 870){
				testInd = [899, 869, 840, 841, 871, 1, 0, 29];
			}
			else if(i == 899){
				testInd = [898, 868, 869, 840, 870, 0, 29, 28];
			}
			else if(i > 870 && i < 899){
				testInd = [i - 1, i -31, i - 30, i - 29, i + 1, i - 869, i - 870, i - 871];
			}
			else if(i % 30 == 0){
				testInd = [i+29, i-1, i-30, i-29, i+1, i+31, i+30, i+59];
			}
			else if(i % 30 == 29){
				testInd = [i-1, i-31, i-30, i-59, i-29, i+1, i+30, i+29];
			}
			else{
				testInd = [i-1, i-31, i-30, i-29, i+1, i+31, i+30, i+29];
			}

			testInd.forEach(function(ind) {if(tmpLive.includes(ind)){liveCount++}});
				
			if((tmpLive.includes(i) &&  liveCount == 2) || liveCount == 3){
				nextGen.push(i);
			}
		}
		genCount++;

		this.setState({
			currLiveCells: nextGen,
			genNum: genCount
		});
	}

	startGen(){
		if(this.state.isStart || this.state.currLiveCells.length == 0){
			return;
		}
		else{
			let tmpFind = this.findNextGen;
			this.startLife = setInterval(tmpFind, 500);
			this.setState({isStart: true});
		}
	}

	pauseGen(){
		clearInterval(this.startLife);
		this.setState({isStart: false});
	}

	clearBoard(){
		this.setState({
			isStart: false,
			currLiveCells: [],
			genNum: 0
		});
		clearInterval(this.startLife);
	}

	render(){
		let rendBod = [];
		let rndLive = this.state.currLiveCells.map(x => Math.floor(x/30));
		for(let i=0; i<30; i++){
			let liveSlice = [];
			let rowInd = 30 * i;
			if(rndLive.includes(i)){
				let startInd = rndLive.indexOf(i);
				let endInd = rndLive.lastIndexOf(i) + 1;
				liveSlice = this.state.currLiveCells.slice(startInd, endInd);
			}
			rendBod.push(<GridRows key={i} onClick={this.handleCellChange} rowInd={rowInd} liveCells={liveSlice} styles={[this.state.liveCellStyle, this.state.normCellStyle]} />);
		}
		return(
			<div>
				<h2>Conway's Game Of Life</h2> 
				<p>
					This is Conway's Game of Life. Each box represents a cell.<br />
					A cell can be alive (filled in) or dead(blank). <br />
					Each generation will determine which cells in the next generation will live<br />
					The rules for cell generations are thus:<br />
				</p>

				<ul>
					<li>Any live cell with fewer than two live neighbors dies, as if caused by under population.</li>
					<li>Any live cell with two or three live neighbors lives on to the next generation.</li>
					<li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
					<li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
				</ul>
				<div>You can click on any cell to toggle life or death, and pause, start, or clear with the buttons.</div>
				<br />
				<div>Generation: {this.state.genNum}</div>
				<table style={this.state.tableStyle}>
					<tbody>
					{rendBod}
					</tbody>
				</table>
				<button onClick={this.startGen}>Start</button>
				<button onClick={this.pauseGen}>Pause</button>
				<button onClick={this.clearBoard}>Clear</button>
			</div>
		);
	}
}

export default Container;

const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
