import React from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import MainContainer from './components/MainContainer';




function App() {
  const obj = {
    "data":[{
    "id":1,
    "name":"Todo",
    "columns": [
        {
          "name": "ToDo",
          "subTasks": [
            { "name": "Task 1" },
            { "name": "Task 2" }
          ]
        },
        {
          "name": "In Progress",
          "subTasks": [
            { "name": "Task 3" }
          ]
        }
      ]
    },
    {
        "id":2,
        "name":"Todo2",
        "columns": [
            {
              "name": "To Do2",
              "subTasks": [
                { "name": "Task 1" },
                { "name": "Task 2" }
              ]
            },
            {
              "name": "In Progress",
              "subTasks": [
                { "name": "Task 3" }
              ]
            }
          ]
        }
    ]

}
  return (
    <div className='font-Jakarta'>
      <Header/>
      <div className='flex'>
      <SideBar/>
      <MainContainer obj = {obj.data}/>
      </div>
      
    </div>
  );
}

export default App;
