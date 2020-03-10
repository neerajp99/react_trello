import React, {Component, useState, useEffect, useMemo} from 'react'

// Initial position
const POSITION = {x: 0, y: 0}

// Draggable field fucntion starts here
const Draggable = ({children}) => {
    const [draggableState, draggableSetState] = useState({
        isDragging: false,
        origin: POSITION,
        translation: POSITION
    })
    // Adding inline styles to the component
    const styles = useMemo({

    })
    return (
        <div className="">
        {children}
        </div >
    )
}

export default Draggable
