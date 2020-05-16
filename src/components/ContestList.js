import React from 'react';
import ContestPreview from './ContestPreview';

const ContestList = ({ contests, onContestClick }) => (
    <div className="ContestList">
        {Object.keys(contests).map(contestId =>
            <ContestPreview 
                key={contestId} 
                contest={contests[contestId]}
                onClick={onContestClick}
               />
        )} 
    </div>
);

// ContestList.propTypes = { 
//     contests: React.PropTypes.array
// }

export default ContestList;