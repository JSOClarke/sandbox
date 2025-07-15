import { useEffect, useState } from 'react'
import AppSidebar from './component/AppSidebar'
import AppHeader from './component/AppHeader'
import BoardColumn from './component/BoardColumn'
import ModalBox from './component/ModalBox'
import { nanoid } from 'nanoid'
import ModalBoxSaved from './component/ModalBoxSaved'

interface SubTask {
  text: string
  completed: boolean
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  subtasks: SubTask[]
}

function App() {
  const [taskCollection, setTaskCollection] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string>('')
  const [titleValue, setTitleValue] = useState<string>('')
  const [descriptionValue, setDescriptionValue] = useState<string>('')
  const [statusValue, setStatusValue] = useState<string>('none')
  const [selectedTaskObject, setSelectedTaskObject] = useState<Task>()
  const [isSavedModelOpen, setIsSavedModalOpen] = useState<boolean>(false)
  const [subtask1value, setSubtask1Value] = useState<SubTask>({
    text: '',
    completed: false,
  })
  const [subtask2value, setSubtask2Value] = useState<string>('')
  const [subtask3value, setSubtask3Value] = useState<string>('')
  const [statusCats, setStatusCats] = useState<string[]>([
    'todo',
    'inprogress',
    'completed',
  ])

  const [subtasks, setSubtasks] = useState<SubTask[]>([
    { text: '', completed: false },
    { text: '', completed: false },
    { text: '', completed: false },
  ])

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
    console.log(taskCollection)
    setSubtask1Value(foundTask.subtasks[0])
    setIsSavedModalOpen(true)
    console.log(`Id for the chosen item is ${id}`)
  }

  function handleCreateTask(e) {
    e.preventDefault()
    const newTask = {
      id: nanoid(),
      title: titleValue,
      description: descriptionValue,
      status: statusValue,
      subtasks: subtasks,
    }
    setTaskCollection((prev) => [...prev, newTask])
    console.log(taskCollection)
    setIsModalOpen(false)

    console.log(taskCollection)
  }

  function createEmptyTask() {
    setTitleValue('')
    setDescriptionValue('')
    setStatusValue('none')
    setSubtasks([
      { text: '', completed: false },
      { text: '', completed: false },
      { text: '', completed: false },
    ])
    // setSubtask1Value({text:"",completed:false})
    setIsModalOpen(true)
  }

  return (
    <main className="main-container flex w-full min-h-screen h-screen bg-primary">
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
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="backdrop fixed inset-0 top-0 z-20 modal-container bg-black bg-opacity-50 flex justify-center">
          <div className="modal bg-[#2C2C37] w-full z-30 rounded-xl p-4 mt-40 mx-4 mb-40">
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
