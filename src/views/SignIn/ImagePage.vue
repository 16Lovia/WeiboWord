<template>
    <div id="main">
        <image-wall class="imgwall"></image-wall>
    </div>
</template>

<script>
    import ImageWall from "./ImageWall";
    export default {
        components: {ImageWall}
    };

</script>

<style scoped>
/* #main {
width: 100%;
height: 100vh;
position: absolute;
top: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
z-index: 1
} */
.imgwall{
width: 100%;
height: 100vh;
position: absolute;
top: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
z-index: 1
}
</style>
