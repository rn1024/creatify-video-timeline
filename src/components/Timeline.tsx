import React, { useState, useCallback, MouseEvent } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './Timeline.css';

interface Item {
  id: string;
  content: string;
  width: number;
}

type List = Item[];

const initialLists: List[] = [
  [
    { id: '1', content: 'Item 1', width: 150 },
    { id: '2', content: 'Item 2', width: 150 },
    { id: '3', content: 'Item 3', width: 150 },
  ],
  [
    { id: '4', content: 'Item 4', width: 150 },
    { id: '5', content: 'Item 5', width: 150 },
    { id: '6', content: 'Item 6', width: 150 },
  ]
];

const ResizeHandle: React.FC<{ onMouseDown: (e: MouseEvent<HTMLDivElement>) => void; side: 'left' | 'right' }> = ({ onMouseDown, side }) => (
  <div
    className={`resize-handle ${side}`}
    onMouseDown={onMouseDown}
  />
);

interface DraggableItemProps {
  item: Item;
  index: number;
  listIndex: number;
  handleResize: (e: MouseEvent<HTMLDivElement>, index: number, listIndex: number, side: 'left' | 'right') => void;
  isResizing: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index, listIndex, handleResize, isResizing }) => (
  <Draggable
    key={item.id}
    draggableId={item.id}
    index={index}
    isDragDisabled={isResizing}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`draggable-item ${snapshot.isDragging ? 'dragging' : ''}`}
        style={{ width: item.width, ...provided.draggableProps.style }}
      >
        {item.content}
        <ResizeHandle onMouseDown={(e) => handleResize(e, index, listIndex, 'left')} side="left" />
        <ResizeHandle onMouseDown={(e) => handleResize(e, index, listIndex, 'right')} side="right" />
      </div>
    )}
  </Draggable>
);

const TimeLine: React.FC = () => {
  const [lists, setLists] = useState<List[]>(initialLists);
  const [isResizing, setIsResizing] = useState(false);

  const onDragEnd = useCallback((result: DropResult) => {
    if (isResizing) return;

    const { source, destination } = result;

    if (!destination) return;

    const sourceListIndex = parseInt(source.droppableId.split('-')[1], 10);
    const destinationListIndex = parseInt(destination.droppableId.split('-')[1], 10);

    setLists(prevLists => {
      const newLists = [...prevLists];
      const [movedItem] = newLists[sourceListIndex].splice(source.index, 1);
      newLists[destinationListIndex].splice(destination.index, 0, movedItem);
      return newLists;
    });
  }, [isResizing]);

  const handleResize = useCallback((e: MouseEvent<HTMLDivElement>, index: number, listIndex: number, side: 'left' | 'right') => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = lists[listIndex][index].width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = side === 'left' ? startWidth - deltaX : startWidth + deltaX;
      setLists(prevLists => {
        const newLists = [...prevLists];
        newLists[listIndex] = [...newLists[listIndex]];
        newLists[listIndex][index] = { ...newLists[listIndex][index], width: newWidth > 50 ? newWidth : 50 };
        return newLists;
      });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [lists]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {lists.map((list, listIndex) => (
          <Droppable key={listIndex} droppableId={`droppable-${listIndex}`} direction="horizontal" isDropDisabled={isResizing}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="droppable-list"
              >
                {list.map((item, index) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    index={index}
                    listIndex={listIndex}
                    handleResize={handleResize}
                    isResizing={isResizing}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TimeLine;