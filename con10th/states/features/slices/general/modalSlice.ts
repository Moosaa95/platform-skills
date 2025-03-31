import { RootState } from "@/states/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface ModalState {
    isOpen: boolean;
}

const initialState: ModalState = {
    isOpen: false 
}

const modalSlice = createSlice({
    name: "generalModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
})


export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer;

// export const selectIsModalOpen = (state: RootState) => state.generalModal.isOpen;