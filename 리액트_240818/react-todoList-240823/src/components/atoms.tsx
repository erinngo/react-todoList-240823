import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";
//enumarable   - 값을 숫자로 반환한다는 점이 특징   , 뒤에 값을 명시하면 string으로 바꿀 수 있다.
export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
    "DELETE" = "DELETE",
}
export interface IToDo {
    text: string;
    id: number;

    //category : "TO_DO" | "DOING" | "DONE" | "DELETE";
    category: Categories;
}

// atom
export const categoryState = atom<Categories>({
    key: "category",
    // default: "TO_DO",
    default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const resetFormState = atom<boolean>({
    key: "resetForm",
    default: false,
});
//atom은 배열을 만들어줄 뿐이고
//selector는 atom을 받아서 output을 변형시킨다. ----derived state

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        if (category === Categories.TO_DO) return toDos.filter((toDo) => toDo.category === Categories.TO_DO);
        if (category === Categories.DOING) return toDos.filter((toDo) => toDo.category === Categories.DOING);
        if (category === Categories.DONE) return toDos.filter((toDo) => toDo.category === Categories.DONE);

        // return [toDos.filter((toDo) => toDo.category === "TO_DO"), toDos.filter((toDo) => toDo.category === "DOING"), toDos.filter((toDo) => toDo.category === "DONE")];
    },
});
