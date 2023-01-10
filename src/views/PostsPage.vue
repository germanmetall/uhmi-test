<template>
	<div class="filter">
		<div class="filter__text">Search by title:</div>
		<input class="filter__input" ref="titleSearchRef" placeholder="Some title" @input="onTitleFilter"/>
	</div>

	<div class="posts-container" v-if="posts">
		<post v-for="post in posts" :key="post.id" :post="post" :comments="getCommentsByPostId(post.id)"></post>
	</div>

	<div class="pagination" v-if="allPosts && filteredPosts.length/10 > 1">
		<div class="pagination__item" :class="{'pagination__item--disabled':currentPaginatePostsCounter==1 }" @click="paginatePosts(currentPaginatePostsCounter-1)">Prev</div>
		<div class="pagination__item" v-for="number in (Math.ceil(filteredPosts.length/10))" :class="{'pagination__item--active': currentPaginatePostsCounter == number}" @click="paginatePosts(number)">
			{{ number }}
		</div>
		<div class="pagination__item" :class="{'pagination__item--disabled' :currentPaginatePostsCounter==(Math.ceil(filteredPosts.length/10)) }" @click="paginatePosts(currentPaginatePostsCounter+1)">Next</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPosts } from "@/composables/API/posts";
import { getComments } from "@/composables/API/comments";
import post from '@/components/post.vue';

let allPosts = ref([]),
	filteredPosts = ref([]),
	allComments = ref([]),
	posts = ref([]),
	titleSearchRef = ref(null),
	currentPaginatePostsCounter = ref(1);

function getCommentsByPostId(postId){
	return allComments.value.filter(el => el.postId == postId);
}

function onTitleFilter(e){
	if(titleSearchRef.value.value.length) {
		filteredPosts.value = allPosts.value.filter(el => el.title.includes(titleSearchRef.value.value));
		posts.value = filteredPosts.value.slice(0,10);
	}
	else {
		filteredPosts.value = allPosts.value;
		posts.value = filteredPosts.value.slice((currentPaginatePostsCounter.value-1) * 10, currentPaginatePostsCounter.value * 10);
	}
	currentPaginatePostsCounter.value = 1;
}

function paginatePosts(pageNumber){
	currentPaginatePostsCounter.value = pageNumber;
	posts.value = filteredPosts.value.slice((currentPaginatePostsCounter.value-1) * 10, currentPaginatePostsCounter.value * 10);
}

onMounted(async () => {
	allPosts.value = await getPosts();
	filteredPosts.value = allPosts.value;
	posts.value = allPosts.value.slice(0,10);

	allComments.value = await getComments();
});
</script>

<style lang="scss" scoped>
.filter{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 36px;
	margin-bottom: 36px;
	&__text{
		font-size: 42px;
		line-height: 1.5;
	}
	&__input{
		width: 50%;
		font-size: 42px;
		line-height: 1.5;
		border-radius: 12px;
		padding: 4px 12px;

	}
}
.posts-container{
	width: 60%;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 16px;
}


.pagination{
	margin: 12px auto;
	min-width: 80%;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 8px;
	&__item{
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 64px;
		height: 64px;
		border-radius: 12px;
		padding: 8px;

		font-size: 36px;
		line-height: 1.5;

		background-color: #f6f6f0;
		transition: .5s;
		cursor: pointer;
		&--disabled{
			cursor: not-allowed;
			background-color: #808080 !important;
		}
		&:hover, &--active{
			background-color: #dedeca;
		}
	}
}

#chart{
	margin: 32px 0;
}
</style>