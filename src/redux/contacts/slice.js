import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
    isConfirmModal: "",
    isEditModal: {},
  },
  reducers: {
    showConfirmModal: (state, action) => {
      state.isConfirmModal = action.payload;
    },
    hideConfirmModal: (state) => {
      state.isConfirmModal = "";
    },
    showEditModal: (state, action) => {
      state.isEditModal = action.payload;
    },
    hideEditModal: (state) => {
      state.isEditModal = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items[index].name = action.payload.name;
        state.items[index].number = action.payload.number;
        state.isEditModal = "";
      })
      .addCase(editContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state, action) => {
        state.items = [];
      });
  },
});

export const {
  showConfirmModal,
  hideConfirmModal,
  showEditModal,
  hideEditModal,
} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
