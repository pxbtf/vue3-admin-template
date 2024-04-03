import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter',()=>{
    const counter = ref(0);
    const double = computed(()=>{
        return counter.value *2;
    })
    function increment(){
        counter.value ++;
    }
    return {counter,double,increment}
});