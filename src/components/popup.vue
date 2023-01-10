<template>
    <div class="popup" :class="{'popup--active': isOpened}">
        <form class="popup__content" onsubmit="return false">
            <img class="popup__close" src="@/assets/cross.png" @click="isOpened = false"/>

            <label class="input__container">
                Name
                <input class="input" ref="inputName" placeholder="Name of marker"/>
            </label>
            <label class="input__container">
                Latitude
                <input class="input" ref="inputLat" :value="props.lat" placeholder="Latitude"/>
            </label>
            <label class="input__container">
                Longitude
                <input class="input" ref="inputLng" :value="props.lng" placeholder="Longitude"/>
            </label>

            <button class="btn" @click="addMarker">
                Add
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let props = defineProps(['lat', 'lng']);
let emits = defineEmits(['markerAdded']);

let inputName = ref(null),
    inputLat = ref(null),
    inputLng = ref(null),
    isOpened = ref(false);

function addMarker(){
    if(!inputName.value.value || !inputLat.value.value ||!inputLng.value.value)
        return alert("Enter all fields!");

    let prevMarkers = JSON.parse(localStorage.getItem("markers"));
    console.log(prevMarkers);
    if(prevMarkers){
        localStorage.setItem("markers", JSON.stringify([
            ...prevMarkers,
            {
                lat: inputLat.value.value,
                lng: inputLng.value.value,
                name: inputName.value.value
            }
        ]));
    }
    else{
        localStorage.setItem("markers", JSON.stringify([
            {
                lat: inputLat.value.value,
                lng: inputLng.value.value,
                name: inputName.value.value
            }
        ]));
    }
    alert("Marker added!");
    isOpened.value = false;
    inputName.value.value = '';
    return emits('markerAdded');
}

defineExpose({isOpened});
</script>

<style lang="scss" scoped>
.popup{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    z-index: -1;
    transition: .5s;
    background-color: #00000080;
    &__close{
        position: absolute;
        width: 64px;
        height: 64px;
        box-sizing: border-box;
        padding: 4px;
        transition: .2s;
        cursor: pointer;
        background-color: #eaeaea;
        border-radius: 100%;
        right: -32px;
        top: -32px;
        &:hover{
            padding: 8px;
        }
    }
    &__content{
        position: relative;
        min-width: 30vw;
        min-height: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 32px;
        padding: 32px;
        box-sizing: border-box;
        background-color: #eaeaea;
        border-radius: 24px;
    }
    &--active{
        opacity: 1;
        z-index: 9999;
    }
}

.input{
    border: 1px solid #bababa;
    font-size: 24px;
    &__container{
        width: 100%;
        font-size: 26px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }
}

.btn{
    font-size: 36px;
    background-color: #6fde6f;
    border-radius: 12px;
    border: unset;
    padding: 12px 16px;
    cursor: pointer;
    transition: .5s;
    &:hover{
        background-color: darken(#6fde6f, 10%);
    }
}
</style>