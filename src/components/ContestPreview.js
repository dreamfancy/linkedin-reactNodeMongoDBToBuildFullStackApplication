import React, {Component} from 'react'


class ContestPreview extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleClick = this.handleClick.bind(this);
    // }

    handleClick = () => {
        return this.props.onClick(this.props.contest._id);
    };
    render(){
        //console.log("Start rendering ContestPreview");
        let contest = this.props.contest;
        return(
            <div className="link ContestPreview" onClick={this.handleClick}>
                <div className="category-name">{contest.categoryName}</div>
                <div className="contest-name">{contest.contestName}</div>
                <div className="contest-name">{contest.description}</div>

            </div>
        );
    }
}


export default ContestPreview;