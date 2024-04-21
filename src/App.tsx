import React, { useContext, useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { createContext } from "react";

interface SubTask {
  Title: string;
  Description: string;
  subTask: string[];
  status: string;
}

interface Column {
  name: string;
  subTasks: SubTask[];
}

interface Board {
  id: number;
  name: string;
  columns: Column[];
}

interface AppContextValue {
  updateValue: (newValue: number) => void;
  key: number;
  alldata: Board[];
  updateData: (Value: Board[]) => void;
}

const UserContext = createContext<AppContextValue | undefined>(undefined);
export const useMyContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a UserContext.Provider");
  }
  return context;
};

function App() {
  const [key, setKey] = useState(1);
  const obj: { data: Board[] } = {
    data: [
      {
        id: 1,
        name: "Example Board",
        columns: [
          {
            name: "TODO",
            subTasks: [
              {
                Title: "  Clean your Room",
                Description: "Clean",
                subTask: ["Clean Bed", "Clean Desk", "Clean Floor"],
                status: "",
              },
              {
                Title: "Do your Homework",
                Description: "It's truly and otherly disgusting",
                subTask: ["Maths", "English", "History"],
                status: "",
              },
            ],
          },
          {
            name: "IN PROGRESS",
            subTasks: [
              {
                Title:
                  "Research pricing points of various competitors and trial different business models",
                Description:
                  "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                subTask: ["Math", "English", "History"],
                status: "",
              },
            ],
          },
          {
            name: "DONE",
            subTasks: [],
          },
        ],
      },
      {
        id: 2,
        name: "Example Board 2",
        columns: [
          {
            name: "TODO",
            subTasks: [],
          },
          {
            name: "IN PROGRESS",
            subTasks: [],
          },
          {
            name: "DONE",
            subTasks: [],
          },
        ],
      },
    ],
  };
  let [alldata, setAllData] = useState(obj.data);
  const updateValue = (newValue: number) => {
    setKey(newValue);
  };
  const updateData = (Value: Board[]) => {
    setAllData(Value);
  };
  return (
    <UserContext.Provider value={{ updateValue, key, alldata, updateData }}>
      <div className="font-Jakarta">
        <Header />
        <div className="flex">
          <SideBar />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;

