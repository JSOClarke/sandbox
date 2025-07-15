import { nanoid } from 'nanoid'
import { useState, useEffect, useRef } from 'react'

export default function EditProjectModal({
  setisEditProjectModalOpen,
  selectedProject,
  setProjectsCollection,
  setSelectedProject,
}) {
  const [renameProjectClicked, setRenameProjectClicked] =
    useState<boolean>(false)

  const pullUpBarRef = useRef(null)

  useEffect(() => {
    function handleClickOustide(e) {
      if (pullUpBarRef.current && !pullUpBarRef.current.contains(e.target)) {
        setisEditProjectModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOustide)

    return () => {
      document.removeEventListener('mousedown', handleClickOustide)
    }
  })

  function handleModalSave() {
    setProjectsCollection((prev) => {
      const updated = prev.map((prevPro) =>
        prevPro.id === selectedProject.id
          ? { ...prevPro, title: selectedProject.title }
          : prevPro
      )
      console.log(`Updated Collection list with name change ${updated}`)
      return updated
    })
    setRenameProjectClicked(false)
  }

  function handleCreateProject() {
    const newProject = { id: nanoid(), title: 'Draft Title' }
    setProjectsCollection((prev) => [...prev, newProject])
    setSelectedProject(newProject)
    setRenameProjectClicked(true)
  }

  return (
    <div
      ref={pullUpBarRef}
      className="edit-project-modal p-4 flex flex-col gap-4 items-center justify-center w-full h-full"
    >
      <div className="rename-project w-full ">
        <button
          onClick={() => setRenameProjectClicked(true)}
          className="w-full bg-primary rounded-3xl text-white p-2"
        >
          Rename Project
        </button>
      </div>
      <div className="create-new-project w-full">
        <button
          onClick={() => handleCreateProject()}
          className="w-full bg-primary rounded-3xl text-white p-2"
        >
          Create New Project
        </button>
      </div>
      {renameProjectClicked && (
        <div className="opended-modal inputs transition-all duration-300 w-full ease-in-out transform animate-fadeIn flex flex-col">
          <label
            htmlFor="project-name-input"
            className="text-white text-sm py-2"
          >
            Project Name:
          </label>
          <input
            className="bg-primary w-full bg-primary rounded-xl text-xl p-3 text-white"
            type="text"
            id="project-name-input"
            value={selectedProject.title}
            onChange={(e) =>
              setSelectedProject((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
      )}
      <div className="close-button w-full">
        <button
          onClick={() => setisEditProjectModalOpen(false)}
          className="w-full bg-primary rounded-3xl text-white p-2"
        >
          Close
        </button>
      </div>

      {renameProjectClicked && (
        <div className="save-button w-full">
          <button
            onClick={() => handleModalSave()}
            className="w-full bg-primary rounded-3xl text-white p-2"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}
