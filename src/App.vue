<template>
	<nav class="nav">
		<RouterLink class="nav__item" :class="{'nav__item--active': $route.path == '/'}" to="/">Posts page</RouterLink>
		<RouterLink class="nav__item" :class="{'nav__item--active': $route.path == '/map'}" to="/map">Map page</RouterLink>
	</nav>
  	<router-view/>
</template>

<style lang="scss">
body{
	margin: 0;
	padding: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	padding: 64px;
}

.nav{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 32px;
	padding: 32px;
	&__item{
		font-size: 36px;
		line-height: 1.5;
		color: black;
		text-decoration: unset;
		&--active{
			text-decoration: underline;
		}
	}
}
</style>
