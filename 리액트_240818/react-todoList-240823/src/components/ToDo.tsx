import React from "react";
import { IToDo, toDoState, Categories } from "./atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Li = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin: 20px; */
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    span {
        width: 50%;
        display: inline-block;
        padding: 10px;
    }
    span:nth-of-type(2) {
        width: 50%;
        border: 1px solid blue;

        display: flex;
        align-items: center;
    }
`;
const Button = styled.button`
    font-size: 1em;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 5px 10px;
    margin: 5px;
    width: 30%;
`;

function ToDo({ text, category, id }: IToDo) {
    //toDoState에는 모든 toDo 들이 들어있다.
    const setToDos = useSetRecoilState(toDoState);

    // 작동시 카테고리 변경작업 필요

    const onClickT = (event: React.MouseEvent<HTMLButtonElement>) => {
        //1. 현재 버튼의 카테고리 추출   - TO_DO, DOING, DONE, DELETE
        const {
            currentTarget: { name },
        } = event;

        console.log(name);

        // 2. 현재 클릭한 버튼의 index 추출

        if (name === Categories.DELETE) {
            setToDos((oldToDos) => {
                const finalToDos = oldToDos.filter((each) => each.id !== id);
                // 로컬 스토리지 업데이트
                localStorage.setItem("toDos", JSON.stringify(finalToDos));
                return finalToDos; // 최종 ToDo 리스트 반환
            });
        } else {
            setToDos((oldToDos) => {
                const targetIndex = oldToDos.findIndex((each) => each.id === id);
                const oldToDo = oldToDos[targetIndex];

                // 새로운 ToDo 객체 생성  -- category 만 변경
                const newToDo = { text: oldToDo.text, id: oldToDo.id, category: name as any };

                const front = oldToDos.slice(0, targetIndex);
                const back = oldToDos.slice(targetIndex + 1);
                const finalToDos = [...front, newToDo, ...back];

                // 로컬 스토리지 업데이트
                localStorage.setItem("toDos", JSON.stringify(finalToDos));
                return finalToDos; // 최종 ToDo 리스트 반환
            });
        }
    };

    // const resetToDos = () => {
    //     setToDos([]); // toDoState를 빈 배열로 설정
    //     localStorage.setItem("toDos", JSON.stringify([])); // 로컬 스토리지도 빈 배열로 업데이트
    // };

    return (
        <Li>
            <span>{text}</span>
            <span>
                {category !== Categories.DOING && (
                    <Button style={{ backgroundColor: "#f19a39" }} name={Categories.DOING + ""} onClick={onClickT}>
                        Doing
                    </Button>
                )}
                {category !== Categories.TO_DO && (
                    <Button style={{ backgroundColor: "#8d8e8d" }} name={Categories.TO_DO + ""} onClick={onClickT}>
                        To Do
                    </Button>
                )}
                {category !== Categories.DONE && (
                    <Button style={{ backgroundColor: "#67c467" }} name={Categories.DONE + ""} onClick={onClickT}>
                        Done
                    </Button>
                )}
                {category !== Categories.DELETE && (
                    <Button style={{ backgroundColor: "#c2c5c2" }} name={Categories.DELETE + ""} onClick={onClickT}>
                        Delete
                    </Button>
                )}
            </span>
        </Li>
    );
}

export default ToDo;
