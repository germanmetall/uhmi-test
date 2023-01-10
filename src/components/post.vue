<template>
    <div class="post">
        <div class="post__title" :title="props.post.title">{{ props.post.title }}</div>
        <div class="post__comments">{{ props.comments?.length }}</div>
        <div class="post__text">{{ props.post.body }}</div>
        <img class="post__chart-icon" src="@/assets/chart.png" @click="toggleExpand">
        
        <div ref="chartContainerRef" class="post__chart-container">
            <canvas ref="chartRef" class="post__chart"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Chart from 'chart.js/auto'

let props = defineProps(['post', 'comments']);

let chartRef = ref(null),
    chartContainerRef = ref(null),
    isInited = false;

function toggleExpand(){
    chartContainerRef.value.style.maxHeight = chartContainerRef.value.style.maxHeight!='350px' ? '350px': 0;
}

function initChart(){
    new Chart(chartRef.value, {
        type: 'bar',
        data: {
            labels: [...props.comments.map(el => el.email)],
            datasets: [
                {
                    data: props.comments.map(el => el.email.length),
                    label: 'Number of symbols in email'
                }
            ]
        },
        options: {responsive: false},
    });
    isInited = true;
}

onUnmounted(() => {

})

watch(() => props.comments, () => {
    if(!isInited) initChart();
})

onMounted(() => {
    if(props.comments.length && !isInited) initChart();
})
</script>

<style lang="scss" scoped>
.post{
	display: grid;
	grid-template-columns: 48px auto 48px;
	gap: 12px;
	border-radius: 12px;
	background-color: #f6f6f0;
	transition: .5s;
	padding: 24px;
	&:hover{
		background-color: #dedeca;
	}
	&__title{
		grid-column: 1 / span 3;

		font-size: 28px;
		line-height: 1.5;
		max-height: calc(32px * 1.5);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-weight: 800;
	}
	&__text{
		font-size: 16px;
		line-height: 1.5;
	}
	&__comments{
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 20px;
		line-height: 1.5;

		background-image: url('@/assets/comment-icon.png');
		background-repeat: no-repeat;
		background-size: contain;
	}
    &__chart{
        width: 100%;
        height: 100%;
        &-icon{
            width: 48px;
            height: 48px;
            box-sizing: border-box;
            padding: 8px;
            border-radius: 12px;
            transition: .5s;
            cursor: pointer;
            &:hover{
                background-color: #b5b5ad;
            }
        }
        &-container{
            grid-column: 1 / span 3;
            max-height: 0px;
            height: 350px;
            transition: .5s max-height;
            overflow: hidden;
        }
    }
}
</style>