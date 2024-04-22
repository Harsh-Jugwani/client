import React, { useRef, useState } from "react";
import { X } from "lucide-react";//use for cross symbol

interface BoardFormProps {// defining type of data
  onClose: () => void;
  data: any;
  title: string;
  Save: string;
  setAllData: React.Dispatch<React.SetStateAction<any[]>>;
  alldata: any[];
}

interface InputData {
  name: string;
  subTasks: any[];
}

const BoardForm: React.FC<BoardFormProps> = ({
  onClose,
  data,
  title,
  Save,
  setAllData,
  alldata,
}) => {
  const modelRef = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState<string[]>([]);
  const [res, setRes] = useState<InputData[]>([]);
  const [inputs, setInputs] = useState<{ name: string }>({
    name: "",
  });

  const handleAdd = () => {//For handling the add input area
    const value = [...val, ""];
    setVal(value);
  };
  //handling the dynamic input change
  const handleChange = (onChangeVal: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const inputData = [...val];
    inputData[i] = onChangeVal.target.value;
    const data = inputData.map((str) => ({ name: str, subTasks: [] }));
    setRes(data);
    setVal(inputData);
  };
  // handle delete of the text area
  const handleDelete = (i: number) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);
  };

  const closeModel = (e: React.MouseEvent<HTMLDivElement>) => {//Closing the form when someone click other than form area
    if (modelRef.current === e.target) onClose();
  };
  // handle the submitting of form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    const id = alldata[alldata.length - 1].id;
    setAllData([
      ...alldata,
      {
        id: id + 1,
        name: inputs.name,
        columns: res,
      },
    ]);
  };
  // handling the input array of specific column
  const handleRes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-4 text-black w-[480px] ">
        <button onClick={onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="bg-white rounded-xl flex flex-col gap-5 px-6 py-10 mx-4 dark:bg-[#2B2C37]">
          <h1 className="font-bold text-xl dark:text-white">{title}</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-[#828FA3] dark:text-white">Board name</label>{" "}
            <br />
            <input
              className="border border-black w-[396px] rounded-md h-[40px] px-1"
              type="text"
              name="name"
              value={inputs.name || ""}
              onChange={handleRes}
              placeholder="e.g Shopping"
              required
            />
            <br />
            <label className="text-[#828FA3] dark:text-white">
              Board Column
            </label>
            <br />
            {val.map((data, i) => {
              return (
                <div className="mb-3">
                  <input
                    className="border border-black w-[380px] h-[40px] px-1 rounded-md"
                    type="text"
                    onChange={(e) => {
                      handleChange(e, i);
                    }}
                    required
                  />
                  <button onClick={() => handleDelete(i)}>
                    <X size={20} />
                  </button>
                  <br />
                </div>
              );
            })}
            <button
              onClick={() => handleAdd()}
              className="bg-[#E4EBFA] w-full mb-4 text-[#635FC7] p-1 rounded-3xl"
            >
              + Add New Column
            </button>
            <button
              type="submit"
              className="bg-[#635FC7] w-full text-white p-1 rounded-3xl"
            >
              {Save}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardForm;

