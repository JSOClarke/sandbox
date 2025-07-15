import { Plus, CircleEllipsis, Feather } from 'lucide-react'
export default function AppHeader({
  setIsModalOpen,
  createEmptyTask,
  selectedProject,
  setSelectedProject,
  projectsCollection,
  setProjectsCollection,
  setisEditProjectModalOpen,
}) {
  console.log(projectsCollection)
  function handleProjectChange(e) {
    const selected = projectsCollection.find(
      (project) => project.id === e.target.value
    )
    if (selected) {
      setSelectedProject(selected)
    }
  }
  return (
    <header className="py-8 bg-secondary flex items-center justify-between w-full md:border-b md:border-[#393945]">
      <div className="left-header px-4 text-white text-xl font-bold flex">
        <div className="logo text-blue-500 ">
          <Feather size={30} />
        </div>
        <div className="project-name px-4">
          <select
            name="project-name"
            id="project-name"
            className="bg-secondary rounded-sm text-white p-2"
            value={selectedProject.id || ''}
            onChange={handleProjectChange}
          >
            {projectsCollection.map((project) => {
              return (
                <option
                  key={project.id}
                  className="border border-red-200"
                  value={project.id}
                >
                  {project.title}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="add-task-button px-4 flex items-center justify-center">
        <Plus
          onClick={() => createEmptyTask()}
          size={35}
          className="text-white bg-[#645FC6] rounded-3xl w-16 mx-2"
        />
        <div className="edit text-gray-500 ">
          <CircleEllipsis
            size={30}
            onClick={() => setisEditProjectModalOpen(true)}
          />
        </div>
      </div>
    </header>
  )
}
