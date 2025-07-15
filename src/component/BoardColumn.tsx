import TaskCards from './TaskCards'
export default function BoardColumn({
  statusCatsTitle,
  taskCollection,
  handleTaskSelection,
}) {
  const filteredCollection = taskCollection.filter(
    (task) => task.status === statusCatsTitle
  )
  return (
    <div className="container">
      <div className="board-title flex items-center gap-2 p-2">
        <div className="color bg-blue-500 rounded-full w-2 h-2"></div>
        <div className="title text-[#8a8f9e]">{`${statusCatsTitle} ( ${filteredCollection.length} ) `}</div>
      </div>
      <div className="board-tasks-container">
        {filteredCollection.map((task) => {
          return (
            <div
              key={task.id}
              className="py-2"
              onClick={() => handleTaskSelection(task.id)}
            >
              <TaskCards task={task} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
