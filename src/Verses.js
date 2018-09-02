import React from 'react';

const Verses = (props) => {

    let mem_verse = props.item;

    return(
        <div className="mt-5 alert alert-success">
            <h3>{mem_verse.book_name} {mem_verse.chapter}:{mem_verse.verse} </h3>
            <p>{mem_verse.text}</p>
        </div>
    )
}

export default Verses;
