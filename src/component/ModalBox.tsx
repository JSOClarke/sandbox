import { use, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
export default function ModalBox({
  setDescriptionValue,
  setTitleValue,
  setStatusValue,
  handleCreateTask,
  titleValue,
  descriptionValue,
  statusValue,
  setIsModalOpen,
  setSubtask1Value,
  subtask1value,
  subtasks,
  updateSubTask,
  setSubtasks,
  isEditable,
  setIsEditable,
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    function handleClickOutsideModal(e) {
      // Check to see if the clicked place at least has a value and that value
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false)
        console.log('clicked outside of the modal')
      }
    }
    document.addEventListener('mousedown', handleClickOutsideModal)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal)
    }
  }, [setIsModalOpen])

  function handleAddSubTask(e) {
    e.preventDefault()
    const newSubtask = {
      text: '',
      completed: false,
    }
    setSubtasks((prev) => [...prev, newSubtask])
    console.log('pressend addsubtask')
  }

  function handleSubtaskDelete(e, index: number) {
    console.log('index to dlete ', index)
    e.preventDefault()
    setSubtasks((prev) => prev.filter((_, i) => i !== index))
  }
  return (
    <div
      ref={modalRef}
      className="modal-container flex flex-col items-center justify-between"
    >
      <div className="title text-white font-bold">
        {isEditable ? 'Edit Task ' : 'Add New Task'}
      </div>
      <div className="input-container">
        <form className="flex flex-col gap-3" action="">
          <label htmlFor="title" className="text-white text-sm">
            Title
          </label>
          <input
            className="bg-secondary border border-gray-600 rounded-sm text-white p-2"
            id="title"
            type="text"
            value={titleValue}
            placeholder="e.g, Take Coffe Break"
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <label htmlFor="description" className="text-white text-sm">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            className="bg-secondary border border-gray-600 rounded-sm text-white p-2 resize-none"
            rows={4}
            placeholder="e.g, Its always good to take a break every hour for 15 minutes it can increse productivity and alot more."
          ></textarea>
          {subtasks.map((subtask, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between items-center gap-2"
              >
                <label htmlFor="subtasks" className="text-white text-sm">
                  {`Subtask ${idx + 1}`}
                </label>
                <input
                  className="bg-secondary border border-gray-600 rounded-sm text-white p-2"
                  id="subtasks"
                  type="text"
                  value={subtask.text}
                  placeholder="e.g, Take Coffee Break"
                  onChange={(e) =>
                    updateSubTask(idx, { ...subtask, text: e.target.value })
                  }
                />
                <div className="text-gray-500">
                  <button onClick={(e) => handleSubtaskDelete(e, idx)}>
                    <X size={20} />
                  </button>
                </div>
              </div>
            )
          })}
          <button
            onClick={(e) => handleAddSubTask(e)}
            className="text-black w-full rounded-3xl bg-white p-2 hover:bg-gray-500 hover:text-white"
          >
            + Add New Subtask
          </button>

          <label htmlFor="status" className="text-white text-sm">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            className="bg-secondary border border-gray-600 rounded-sm text-gray-400 p-2"
          >
            <option value="none" disabled>
              Select a status below
            </option>
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="submit"
            value={isEditable ? 'Save Changes' : 'Create Task'}
            onClick={(e) => handleCreateTask(e)}
            className="bg-[#645FC7] rounded-xl w-full my-4 text-white font-bold hover:bg-[#181640] transition-colors h-10"
          />
        </form>
      </div>
    </div>
  )
}
