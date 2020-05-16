import React from 'react';
//import ReactDOM from 'react-dom';
import Header from './Header'
//import ContestPreview from './ContestPreview'
import Contest from './Contest';
//import data from '../testData.json';
import axios from 'axios';
import * as api from '../api';
import ContestList from "./ContestList";
import PropTypes from 'prop-types';

const pushState = (obj, url) => {
    window.history.pushState(obj, '', url); //The second parameter is empty title
}

const onPopState = handler => {
    window.onPopState = handler;
}

class App extends React.Component {

    static propTypes = {
        initialData: PropTypes.object.isRequired
    };
    state = this.props.initialData;

    componentDidMount(){

        window.onpopstate = (event) => {
            console.log(event);
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        };
    
    }

    componentWillUnmount(){
        onPopState(null);
    }

    fetchContest = (contestId) => {
         pushState(
             {currentContestId: contestId},
             `/contest/${contestId}`
         );
    
        api.fetchContest(contestId).then(contest => {
            console.log(contest);
            this.setState({
                //pageHeader: contest.contestName,
                currentContestId: contest._id,
                contests: {...this.state.contests,
                    [contest._id]: contest
                }
            });
        });

    };

    fetchContestList = () => {
        pushState(
            {currentContestId: null},
            '/'
        );
   
       api.fetchContestList().then((contests) => {
           this.setState({
               //pageHeader: contest.contestName,
               currentContestId: null,
               contests: contests
           });
       });

   };

    pageHeader = () => {
        if(this.state.currentContestId){
            return this.currentContest().contestName;
        }
        return "Naming Contest";

    }
    
    lookupName = (nameId) => {
        if (!this.state.names || !this.state.names[nameId]) {
          return {
            name: '...'
          };
        }
        return this.state.names[nameId];
      };

    currentContest = () => {
        return this.state.contests[this.state.currentContestId];
    }

    fetchNames =  (nameIds) => {
        if (nameIds.length === 0) {
            return;
        }
        api.fetchNames(nameIds)
        .then(names => {
          this.setState(
            {names: names}
          );  
          console.log(`set state names`) 
        });
    }

    addName = (newName, contestId) => {
        api.addName(newName, contestId).then(resp => {
            this.setState({
                contests: {
                    ...this.state.contests,
                    [resp.updatedContest._id]: resp.updatedContest
                },
                names: {
                    ...this.state.names,
                    [resp.newName._id]: resp.newName
                }
            })
        });
    }

    currentContent = () => {
        const currentContestId = this.state.currentContestId;
        if(currentContestId){
            console.log("later");
            return (
                <Contest contestListClick={this.fetchContestList} 
                {...this.currentContest()} 
                fetchNames={this.fetchNames} 
                lookupName = {this.lookupName}
                addName = {this.addName}
                />
            );
        }
        else{
            return (
                <ContestList 
                onContestClick={this.fetchContest}
                contests= {this.state.contests} />
            )
        }
    };

    render(){
        return (
            <div className="App">
                <Header message= {this.pageHeader()} />
                <p>Current contents are below</p>
                {this.currentContent()}
            </div>
        );
    };
};

export default App;