import React, { Component } from 'react';
import Tick from '../Tick/index.jsx';
import { _helper } from '../api/_helper';

export default class Tickbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: new Array(props.selections.length).fill(false),
            // selected: _helper.fetchGET(props.reqUrl).then((response) => {
            //     const {status, data} = response;
            //     if (status == 200) {
            //         return data;
            //     }
            //     else {
            //         console.log(data);
            //     }
            // })
        }
    }
    render() {
        const { label, selections, reqUrl } = this.props;
        const { selected } = this.state;
        const listSelections = selections.map((selection, index) => 
            <Tick
                key = { selection } 
                label = { selection }
                index = { index }
                selected = { selected[index] }
                onSelect = {(index) => {
                    let newArr = this.state.selected.map((value) => value);
                    newArr[index] = !newArr[index];
                    this.setState({
                        selected: newArr
                    }, () =>{
                        _helper.fetchAPI(reqUrl, newArr, [], "PUT")
                    })
                }}
            />
        )
        return (
            <div>
                <span>{ label }</span>
                {listSelections}
            </div>
        );
    }
}