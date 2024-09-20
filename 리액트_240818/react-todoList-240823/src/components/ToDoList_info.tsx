import React from "react";

import { useForm } from "react-hook-form";
import { atom, useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

// function ToDoList() {

//     const [toDo, setToDo] = useState("");
//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

//         const {
//             currentTarget: { value },
//         } = e;

//         setToDo(value);
//     };

//     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log(toDo);
//     };

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input value={toDo} onChange={onChange} type="text" placeholder="todo" />
//                 <button>Add</button>
//             </form>
//         </div>
//     );
// }

interface IFormData2 {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    passWord: string;
}
interface IFormData {
    [key: string]: string;
}

interface IToDo {
    text: string;
    category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

function ToDoList() {
    //1. get the data from Atom, 2. modify the data of Atom

    const [toDos, setToDos] = useRecoilState(toDoState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData2>({
        defaultValues: {
            email: "@naver.com",
        },
    });
    const onValid = (data: any) => {};
    console.log(errors);

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(onValid)} style={{ display: "flex", flexDirection: "column" }}>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                    placeholder="Email"
                />
                <span style={{ color: "#fff", background: "black" }}>{errors?.email?.message}</span>
                <input {...register("firstName", { required: "write here" })} type="text" placeholder="first name" />
                <span style={{ color: "#fff", background: "black" }}>{errors?.firstName?.message}</span>
                <input {...register("lastName", { required: "write here" })} type="text" placeholder="last name" />
                <span style={{ color: "#fff", background: "black" }}>{errors?.lastName?.message}</span>
                <input {...register("userName", { required: "write here", minLength: 5 })} type="text" placeholder="userName" />
                <span style={{ color: "#fff", background: "black" }}>{errors?.userName?.message}</span>
                <input
                    {...register("passWord", {
                        required: "password is required",
                        minLength: { value: 5, message: "password is too short" },
                    })}
                    type="text"
                    placeholder="passWord"
                />
                <span style={{ color: "#fff", background: "black" }}>{errors?.passWord?.message}</span>
                <button>Add</button>
            </form>
            <ul>{<li>toDo</li>}</ul>
        </div>
    );
}

//React.ChangeEventHandler<HTMLInputElement>

export default ToDoList;
