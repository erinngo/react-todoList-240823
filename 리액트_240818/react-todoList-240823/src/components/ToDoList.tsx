import React from "react";

import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState, toDoSelector, categoryState, Categories } from "./atoms";
import ToDo from "./ToDo";

import styled from "styled-components";

const H1 = styled.h1`
    font-size: 30px;
`;
const Select = styled.select`
    font-size: 20px;
    margin: 10px 0;
`;
function ToDoList() {
    //1. get the data from Atom, 2. modify the data of Atom

    // const toDos = useRecoilValue(toDoState);
    // const selectorOutput = useRecoilValue(toDoSelector);

    //여전히 atom -- toDoState에 모든 값이 들어있지만, 최종 selector에서 값을 가져온다.

    const toDos = useRecoilValue(toDoSelector);
    //리셋을 위한 장치로 새롭게 추가
    const setToDos = useSetRecoilState(toDoState);
    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const {
            currentTarget: { value },
        } = event;

        //value는 select의 속성값
        setCategory(value as any);
    };
    // console.log(toDos);

    const resetData = () => {
        // Recoil 상태를 빈 배열로 리셋
        setToDos([]);
        localStorage.removeItem("toDos");
        // setFormState((prev) => !prev);
    };
    return (
        <div>
            <H1>Todo List</H1>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>To Do</option>
                    <option value={Categories.DOING}>Doing</option>
                    <option value={Categories.DONE}>Done</option>
                </Select>
                <button onClick={resetData}>reset</button>
            </div>
            <hr />
            <CreateToDo />

            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
            {/* {category === "TO_DO" && toDo.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
            {category === "DOING" && doing.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
            {category === "DONE" && done.map((toDo) => <ToDo key={toDo.id} {...toDo} />)} */}
        </div>
    );
}

//React.ChangeEventHandler<HTMLInputElement>

export default ToDoList;
