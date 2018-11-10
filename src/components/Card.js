import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import './Card.css'

const cardSource = {
	beginDrag: (props) => {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const cardTarget = {
	hover: (props, monitor, component) => {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}


		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getSourceClientOffset()

		// Get pixels to the top
		const hoverClientY = (clientOffset).top - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	}
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectTarget(connect, monitor) {
	return { connectDropTarget: connect.dropTarget() }
}

const Card = ({
	isDragging,
	connectDragSource,
	connectDropTarget,
	character,
	id,
	index,
	showToggle,
	visible,
	toggleCard
}) => {
	if (!showToggle && !visible) return false;
  return connectDragSource(connectDropTarget(
    <div className={`card ${visible ? '' : 'card--hidden'} ${isDragging ? 'card--dragged' : ''}`}>
			{ showToggle &&
				<label className={`cardToggle ${visible ? 'cardToggleChecked' : ''}`}>
					<input
						type="checkbox"
						checked={visible ? true : false}
						onClick={() => toggleCard(index)}
						/>
				</label>
			}
      <img src={`cards/${character}-${id}.jpg`} alt="" />
    </div>
  ));
}
export default DropTarget("card", cardTarget, collectTarget)(DragSource("card", cardSource, collect)(Card));
