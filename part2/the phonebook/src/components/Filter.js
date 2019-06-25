import React from 'react'
const Filter = ({filterString, handleFilterStringChange}) => (
    <form>
        <div>
            filter shown with <input
                value={filterString}
                onChange={handleFilterStringChange} />
        </div>
    </form>
)
export default Filter