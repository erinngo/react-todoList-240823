import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState, Categories, resetFormState } from "./atoms";
import styled from "styled-components";

const Button = styled.button`
    font-size: 20px;
    margin: 10px 0;
    padding: 5px;
    border: 1px solid #999;
    border-radius: 20px;
`;

const Input = styled.input`
    border: none;
    background: #f1f1f1;
    padding: 10px;
    font-size: 20px;
`;

interface IForm {
    toDo: string;
    id?: number;
}

function CreateToDo() {
    const formState = useRecoilValue(resetFormState);
    const setToDos = useSetRecoilState(toDoState); // modi 함수
    const myCategory = useRecoilValue(categoryState); // value
    const { handleSubmit, register, setValue, reset } = useForm<IForm>();

    useEffect(() => {
        const savedToDos = JSON.parse(localStorage.getItem("toDos") || "[]");
        setToDos(savedToDos); // 초기값 설정
    }, [setToDos]);

    // formState가 변경될 때마다 폼 리셋
    useEffect(() => {
        if (formState) {
            reset(); // 폼 값을 초기화
        }
        console.log("reset", formState);
    }, [formState, reset]);

    const handleValid = ({ toDo, id }: IForm) => {
        if (myCategory === Categories.DELETE) {
            setToDos((prevToDos) => {
                const updatedToDos = prevToDos.filter((todo) => todo.id !== id);
                localStorage.setItem("toDos", JSON.stringify(updatedToDos));
                return updatedToDos;
            });
        } else {
            setToDos((prevToDos) => {
                const newToDo = { text: toDo, id: Date.now(), category: myCategory };
                const updatedToDos = [newToDo, ...prevToDos];

                localStorage.setItem("toDos", JSON.stringify(updatedToDos));

                // 상태 업데이트 후 localStorage 저장
                return updatedToDos;
            });
        }

        // set the value of a registered field
        setValue("toDo", ""); // clear input field
    };

    return (
        <form onSubmit={handleSubmit(handleValid)} style={{ display: "flex", flexDirection: "column" }}>
            <Input
                {...register("toDo", {
                    required: "Please write a thing to do",
                })}
                placeholder="Please write a thing to do."
                autoFocus
            />

            <Button>Add</Button>
        </form>
    );
}

export default CreateToDo;
