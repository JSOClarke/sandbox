import { Plus, EllipsisVertical, Feather } from "lucide-react";
export default function AppHeader({ setIsModalOpen, createEmptyTask }) {
  return (
    <header className="py-8 bg-secondary flex items-center justify-between w-full md:border-b md:border-[#393945]">
      <div className="left-header px-4 text-white text-xl font-bold flex">
        <div className="logo text-blue-500 ">
          <Feather size={30} />
        </div>
        <div className="project-name px-4">Project Name</div>
      </div>
      <div className="add-task-button px-4 flex items-center justify-center">
        <Plus
          onClick={() => createEmptyTask()}
          size={35}
          className="text-white bg-[#645FC6] rounded-3xl w-16 mx-2"
        />
        <div className="edit text-gray-500 ">
          <EllipsisVertical size={30} />
        </div>
      </div>
    </header>
  );
}
