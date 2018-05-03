import React from 'react';

class GridRows extends React.Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		let idNum = Number(e.target.id);
		this.props.onClick(idNum);
	}

	render(){
		let cellRend = [];
		for(let i = 0; i < 30; i++){
			let cellInd = this.props.rowInd + i;

			if(this.props.liveCells.includes(cellInd)){
				cellRend.push(<td key={cellInd} id={cellInd} onClick={this.handleClick} style={this.props.styles[0]}> </td>);
			}
			else{
				cellRend.push(<td key={cellInd} id={cellInd} onClick={this.handleClick} style={this.props.styles[1]}> </td>)
			}
		}
		return(
			<tr>
				{cellRend}
			</tr>
		);
	}
}

export default GridRows;