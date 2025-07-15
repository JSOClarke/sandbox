import { useEffect, useState } from 'react'
import AppSidebar from './component/AppSidebar'
import AppHeader from './component/AppHeader'
import BoardColumn from './component/BoardColumn'
import ModalBox from './component/ModalBox'
import { nanoid } from 'nanoid'
import ModalBoxSaved from './component/ModalBoxSaved'
import EditProjectModal from './component/EditProjectModal'

interface SubTask {
  text: string
  completed: boolean
}

interface Project {
  id: string
  title: string
}

interface Task {
  id: string
  project: Project
  title: string
  description: string
  status: string
  subtasks: SubTask[]
}
const initialProjects: Project[] = [
  { id: nanoid(), title: 'Project 1' },
  { id: nanoid(), title: 'Project 2' },
]

const cgptProjects: Task[] = Array.from({ length: 15 }, (_, i) => ({
  id: nanoid(),
  project: initialProjects[0], // assuming initialProjects[0] is Project type
  title: `Project ${i + 1}`,
  description: 'butter nutter rutter',
  status: 'todo',
  subtasks: [
    { id: nanoid(), text: 'best man', completed: false },
    { id: nanoid(), text: 'best man1', completed: false },
    { id: nanoid(), text: 'best man', completed: false },
  ],
}))

const initialTasks: Task[] = cgptProjects

function App() {
  const [taskCollection, setTaskCollection] = useState<Task[]>(initialTasks)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string>('')
  const [titleValue, setTitleValue] = useState<string>('')
  const [descriptionValue, setDescriptionValue] = useState<string>('')
  const [statusValue, setStatusValue] = useState<string>('none')
  const [selectedTaskObject, setSelectedTaskObject] = useState<Task>()
  const [isEditable, setIsEditable] = useState<boolean>(false)

  const [isSavedModelOpen, setIsSavedModalOpen] = useState<boolean>(false)
  const [subtask1value, setSubtask1Value] = useState<SubTask>({
    text: '',
    completed: false,
  })
  const [isEditProjectModalOpen, setisEditProjectModalOpen] =
    useState<boolean>(false)

  const [statusCats, setStatusCats] = useState<string[]>([
    'todo',
    'inprogress',
    'completed',
  ])
  const [projectsCollection, setProjectsCollection] =
    useState<Project[]>(initialProjects)
  const [selectedProject, setSelectedProject] = useState<Project>(
    initialProjects[0]
  )

  useEffect(() => {
    if (projectsCollection.length > 0 && !selectedProject) {
      setSelectedProject(projectsCollection[0])
    }
  }, [projectsCollection])

  const [subtasks, setSubtasks] = useState<SubTask[]>([
    { text: '', completed: false },
    { text: '', completed: false },
  ])

  function handleEditButton() {
    console.log('pressed edit')
    setIsSavedModalOpen(false)
    setIsEditable(true)
    setIsModalOpen(true)
  }

  function updateSubTask(index: number, updatedSubTask: SubTask) {
    setSubtasks((prev) => {
      const newSubtask = [...prev]
      newSubtask[index] = updatedSubTask
      return newSubtask
    })
  }

  function handleCheckboxEdit(index: number, updatedSubTask: SubTask) {
    setSubtasks((prev) => {
      const newSubtask = [...prev]
      newSubtask[index] = updatedSubTask
      console.log(
        `Checkbox for index ${index} selected with ${updatedSubTask.text} and ${updatedSubTask.completed}`
      )

      setTaskCollection((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTaskId
            ? {
                ...task,
                subtasks: newSubtask,
              }
            : task
        )
      )
      return newSubtask
    })
  }

  function handleTaskEdit(statusValue: string) {
    console.log(
      `status value to be changed to ${statusValue} for the id ${selectedTaskId} `
    )
    setStatusValue(statusValue)
    setTaskCollection((prev) =>
      prev.map((task) =>
        task.id === selectedTaskId ? { ...task, status: statusValue } : task
      )
    )
  }

  useEffect(() => {
    if (selectedTaskObject) {
      setTitleValue(selectedTaskObject.title)
      setDescriptionValue(selectedTaskObject.description)
      setStatusValue(selectedTaskObject.status)
    }
  }, [selectedTaskObject])

  function handleTaskSelection(id: string) {
    const foundTask = taskCollection.find((task) => task.id === id)
    if (!foundTask) return null
    setSelectedTaskId(id)
    setTitleValue(foundTask.title)
    setDescriptionValue(foundTask.description)
    setStatusValue(foundTask.status)
    setSubtasks(foundTask.subtasks)
    setIsSavedModalOpen(true)
    console.log(`Id for the chosen item is ${id}`)
  }

  function handleCreateTask(e) {
    e.preventDefault()
    const foundTask = taskCollection.find((i) => i.id === selectedTaskId)
    if (taskCollection) {
      const updatedTask = {
        id: selectedTaskId,
        title: titleValue,
        description: descriptionValue,
        status: statusValue,
        subtasks: subtasks,
        project: selectedProject,
      }
      setTaskCollection((prev) =>
        prev.map((i) =>
          i.id === selectedTaskId ? { ...i, ...updatedTask } : i
        )
      )

      setIsModalOpen(false)
    } else {
      const newTask = {
        id: nanoid(),
        title: titleValue,
        description: descriptionValue,
        status: statusValue,
        subtasks: subtasks,
        project: selectedProject,
      }
      setTaskCollection((prev) => [...prev, newTask])
      console.log(taskCollection)
      setIsModalOpen(false)

      console.log(taskCollection)
    }
  }

  function createEmptyTask() {
    setTitleValue('')
    setDescriptionValue('')
    setStatusValue('none')
    setSubtasks([
      { text: '', completed: false },
      { text: '', completed: false },
    ])
    // setSubtask1Value({text:"",completed:false})
    setIsModalOpen(true)
  }

  return (
    <main className="main-container flex w-full min-h-screen h-screen bg-primary relative">
      {isEditProjectModalOpen && (
        <div className="absolute bottom-0 right-0 bg-secondary rounded-tl-3xl rounded-tr-3xl w-full min-h-20 z-50">
          <EditProjectModal
            setisEditProjectModalOpen={setisEditProjectModalOpen}
            selectedProject={selectedProject}
            setProjectsCollection={setProjectsCollection}
            setSelectedProject={setSelectedProject}
          />
        </div>
      )}
      {isSavedModelOpen && (
        <div className="backdrop fixed inset-0 top-0 z-20 modal-container bg-black bg-opacity-50 flex justify-center">
          <div className="modal bg-[#2C2C37] w-full z-30 rounded-xl p-4 mt-40 mx-4 mb-40">
            <ModalBoxSaved
              titleValue={titleValue}
              descriptionValue={descriptionValue}
              statusValue={statusValue}
              handleTaskEdit={handleTaskEdit}
              setIsSavedModalOpen={setIsSavedModalOpen}
              subtask1value={subtask1value}
              setSubtask1Value={setSubtask1Value}
              handleCheckboxEdit={handleCheckboxEdit}
              subtasks={subtasks}
              setIsEditable={setIsEditable}
              handleEditButton={handleEditButton}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="backdrop fixed inset-0 top-0 z-20 modal-container bg-black bg-opacity-50 flex justify-center items-start overflow-auto">
          <div className="modal bg-[#2C2C37] w-full rounded-xl max-w-md p-6 mt-20 mx-auto mx-10">
            <ModalBox
              setTitleValue={setTitleValue}
              setDescriptionValue={setDescriptionValue}
              setStatusValue={setStatusValue}
              handleCreateTask={handleCreateTask}
              titleValue={titleValue}
              descriptionValue={descriptionValue}
              statusValue={statusValue}
              setSubtask1Value={setSubtask1Value}
              subtask1value={subtask1value}
              setIsModalOpen={setIsModalOpen}
              subtasks={subtasks}
              updateSubTask={updateSubTask}
              setSubtasks={setSubtasks}
              isEditable={isEditable}
              setIsEditable={setIsEditable}
            />
          </div>
        </div>
      )}
      <div className=" app-sidebar hidden md:block w-1/3 h-screen bg-secondary border-r border-[#393945]">
        <AppSidebar />
      </div>
      <div className="right-container flex-1 flex flex-col overflow-hidden ">
        <div className="app-header sticky shrink-0 top-0 z-10 bg-primary md:border-b border-[#393945] ">
          <AppHeader
            setIsModalOpen={setIsModalOpen}
            createEmptyTask={createEmptyTask}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            projectsCollection={projectsCollection}
            setProjectsCollection={setProjectsCollection}
            setisEditProjectModalOpen={setisEditProjectModalOpen}
          />
        </div>
        <div className="board-column container flex-1 p-4 overflow-y-auto">
          <div className="flex gap-4 min-w-max">
            {statusCats.map((cat) => {
              return (
                <div key={cat} className="board h-full w-[275px] ml-4 my-4">
                  <BoardColumn
                    statusCatsTitle={cat}
                    taskCollection={taskCollection}
                    handleTaskSelection={handleTaskSelection}
                    selectedProject={selectedProject}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
