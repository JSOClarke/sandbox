import { EllipsisVertical } from 'lucide-react'
import { useEffect, useRef } from 'react'
export default function ModalBoxSaved({
  titleValue,
  descriptionValue,
  statusValue,
  handleTaskEdit,
  setIsSavedModalOpen,
  subtask1value,
  setSubtask1Value,
  handleCheckboxEdit,
  subtasks,
  setIsEditable,
  handleEditButton,
}) {
  const modalSavedRef = useRef(null)

  useEffect(() => {
    function handleClickOutsideModalSaved(e) {
      if (modalSavedRef && !modalSavedRef.current.contains(e.target)) {
        console.log('clicked outside saved modal')
        setIsSavedModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideModalSaved)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModalSaved)
    }
  })

  const totalNonEmptySubtasks = subtasks.filter((st) => st.title !== '')
  const completedSubtasks = subtasks.filter((st) => st.completed === true)
  return (
    <div ref={modalSavedRef} className="modal-container flex flex-col h-full">
      <div className="title flex justify-between items-center">
        <div className="title text-xl text-white font-bold py-4">
          {' '}
          {titleValue}
        </div>
        <div className="edit text-gray-200 font-bold ">
          <button>
            <EllipsisVertical onClick={() => handleEditButton()} />
          </button>
        </div>
      </div>
      <div className="description text-md text-gray-500 full">
        {descriptionValue}
      </div>

      <div className="subtask-content-container  ">
        <div className="text-white text-sm py-2">{`Subtasks (${completedSubtasks.length} of ${totalNonEmptySubtasks.length}`}</div>
        {subtasks.map((subtask, idx) => {
          if (!subtask.text) return null

          return (
            <div
              key={`subtask-${idx}`}
              className={`subtask bg-primary text-white flex gap-2 p-2 mb-4 ${
                subtask.completed ? 'line-through' : ''
              }`}
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={(e) =>
                    handleCheckboxEdit(idx, {
                      ...subtask,
                      completed: e.target.checked,
                    })
                  }
                />
                <span>{subtask.text}</span>
              </label>
            </div>
          )
        })}
      </div>
      <div className="current-status mt-auto flex flex-col py-4">
        <label htmlFor="current-staus" className="text-white text-sm py-4">
          Current Status
        </label>
        <select
          name="status"
          id="status"
          value={statusValue}
          onChange={(e) => handleTaskEdit(e.target.value)}
          className="bg-secondary border border-[#8a8f9e] rounded-sm text-white p-2"
        >
          <option value="none" disabled>
            Select a status below
          </option>
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  )
}
