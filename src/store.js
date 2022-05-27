import { defineStore } from "pinia";
import { dummy } from "./dummy";

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        pendings: dummy
    }),
    getters: {
        getAllPendings() {
            return this.pendings
        },
        pendingsEmpty() {
            // console.log(this.pendings.length<=0);
            return this.pendings.length <= 0
        }
    },
    actions: {
        addPending(pending) {
            this.pendings.push(pending);
            // console.log(pending)
        },
        removePending(index) {
            this.pendings.splice(index, 1);
        }
    },
})