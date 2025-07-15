import { use, useEffect, useRef } from 'react'

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

  return (
    <div ref={modalRef} className="modal-container">
      <div className="title text-white font-bold py-4">Add New Task</div>
      <div className="input-container ">
        <form className="flex flex-col gap-2" action="">
          <label htmlFor="title" className="text-white text-sm">
            Title
          </label>
          <input
            className="bg-secondary border border-[#8a8f9e] rounded-sm text-white p-2"
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
            className="bg-secondary border border-[#8a8f9e] rounded-sm text-white p-2 resize-none"
            rows={4}
            placeholder="e.g, Its always good to take a break every hour for 15 minutes it can increse productivity and alot more."
          ></textarea>
          {subtasks.map((subtask, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between items-center px-2 gap-2"
              >
                {' '}
                <label htmlFor="subtasks" className="text-white text-sm">
                  {`Subtask ${idx + 1}`}
                </label>
                <input
                  className="bg-secondary border border-[#8a8f9e] rounded-sm text-white p-2"
                  id="subtasks"
                  type="text"
                  value={subtask.text}
                  placeholder="e.g, Take Coffee Break"
                  onChange={(e) =>
                    updateSubTask(idx, { ...subtask, text: e.target.value })
                  }
                />{' '}
              </div>
            )
          })}

          <label htmlFor="status" className="text-white text-sm">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            className="bg-secondary border border-[#8a8f9e] rounded-sm text-white p-2"
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
            value="Create Task"
            onClick={(e) => handleCreateTask(e)}
            className="bg-[#645FC7] rounded-xl w-full text-white font-bold hover:bg-[#181640] transition-colors h-10"
          />
        </form>
      </div>
    </div>
  )
}
