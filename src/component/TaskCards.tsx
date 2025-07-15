export default function TaskCards({ task }) {

  const completedSubtasks = task.subtasks.filter((st)=>st.completed===true)
  const nonEmptySubtasks = task.subtasks.filter((st)=>st.text !== "")
  return (
    <div className="bg-secondary min-h-24 w-full rounded-xl text-white flex flex-col p-4 justify-center">
      <div className="title font-bold text-l flex flex-1">{task.title}</div>
      <div className="subtask flex-1 text-[#8a8f9e]">
        {!nonEmptySubtasks.length ? "No subtasks created" : `${completedSubtasks.length} of ${nonEmptySubtasks.length} subtasks completed`}
      </div>
    </div>
  );
}
