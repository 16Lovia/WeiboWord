<template>
    <div>
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorFront, color: colorTextFront}" v-show="!isToggle" class="animated flipInX flashcard">
            <div class="card-header" style="padding-bottom: 15px;font-size: 2em;"> {{headerFront}} </div>
            <div class="card-content center">
                <p v-bind:style="{fontSize: textSizeFront,fontWeight: 'bold'}">{{front}}</p>
                <div class="tips">
                 
                </div>
                <!-- <img v-if="imgFront!=''" :src="imgFront" width="500px" height="500px"> -->
            </div>
            <div class="card-footer" style="font-size: 1.5em;">{{footerFront}}</div>
        </div>
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorBack, color: colorTextBack}" v-show="isToggle" class="animated flipInX flashcard">
            <div class="card-header" style="padding-bottom: 15px;font-size: 2em;"> {{headerBack}}</div>
            <div class="card-content center">
                <p v-bind:style="{fontSize: textSizeBack, fontWeight: 'bold'}">{{back}}</p>
                <div class="tips">
                </div>
                <!-- <img v-if="imgBack!=''" :src="imgBack" width="500px" height="500px"> -->
            </div>
            <div class="card-footer" style="font-size: 1.5em;">{{footerBack}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isToggle: false,
        }
    }, props: {
        imgFront: {
            type: String,
            default: ''
        },
        imgBack: {
            type: String,
            default: ''
        },
        front: {
            type: String,
            default: '意象:[雁]字回时，月满西楼---李清照'
        },
        back: {
            type: String,
            default: '鸿雁代表思乡'
        },
        textSizeFront: {
            type: String,
            default: '2em'
        },
        textSizeBack: {
            type: String,
            default: '2em'
        },
        colorTextFront: {
            type: String,
            default: '#bf9e94'
        },
        colorTextBack: {
            type: String,
            default: 'white'
        },
        colorFront: {
            type: String,
            default: 'white'
        },
        colorBack: {
            type: String,
            default: '#da9b5d'
        },
        headerFront: {
            type: String,
            default: 'Do you know?'
        },
        headerBack: {
            type: String,
            default: 'Answer'
        },
        footerFront: {
            type: String,
            default: 'Click to show Back'
        },
        footerBack: {
            type: String,
            default: 'Click to show Front'
        }


    }
}
</script>
<style scoped>
.center {
    text-align: center;
}

.flashcard {
    cursor: pointer;
    border-radius: 10px;
    margin: 20px;
    padding: 25px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4);
    text-align: center;
    position: relative;
}

.flashcard:hover {
    box-shadow: 0 0px 25px rgba(0, 0, 0, 0.8);
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

@keyframes flipInX {
    from {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }
    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }
    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }
    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    to {
        transform: perspective(400px);
    }
}

.flipInX {
    backface-visibility: visible !important;
    animation-name: flipInX;
}
</style>
