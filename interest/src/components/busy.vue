<template>
	<div class="busy">
		<div class="throbber-loader" style="margin:2rem auto"></div>
    <p>努力加载中...</p>
	</div>
</template>

<script>
	export default {
		name : 'busy'
	}
</script>

<style scoped>
  .busy  {
    width: 100%;
    height: 100%;
    background-color: white;
  }

@-moz-keyframes throbber-loader {
  0% {
    background: #2575fc;
  }
  10% {
    background: #a4c7f3;
  }
  40% {
    background: #2575fc;
  }
}
@-webkit-keyframes throbber-loader {
  0% {
    background: #2575fc;
  }
  10% {
    background: #a4c7f3;
  }
  40% {
    background: #2575fc;
  }
}
@keyframes throbber-loader {
  0% {
    background: #2575fc;
  }
  10% {
    background: #a4c7f3;
  }
  40% {
    background: #2575fc;
  }
}
/* :not(:required) hides these rules from IE9 and below */
.throbber-loader:not(:required) {
  -moz-animation: throbber-loader 2000ms 300ms infinite ease-out;
  -webkit-animation: throbber-loader 2000ms 300ms infinite ease-out;
  animation: throbber-loader 2000ms 300ms infinite ease-out;
  background: #2575fc;
  /*display: inline-block;*/
  position: relative;
  text-indent: -9999px;
  width: 0.9em;
  height: 1.5em;
  margin: 0 1.6em;
}
.throbber-loader:not(:required):before, .throbber-loader:not(:required):after {
  background: #2575fc;
  content: '\x200B';
  /*display: inline-block;*/
  width: 0.9em;
  height: 1.5em;
  position: absolute;
  top: 0;
}
.throbber-loader:not(:required):before {
  -moz-animation: throbber-loader 2000ms 150ms infinite ease-out;
  -webkit-animation: throbber-loader 2000ms 150ms infinite ease-out;
  animation: throbber-loader 2000ms 150ms infinite ease-out;
  left: -1.6em;
}
.throbber-loader:not(:required):after {
  -moz-animation: throbber-loader 2000ms 450ms infinite ease-out;
  -webkit-animation: throbber-loader 2000ms 450ms infinite ease-out;
  animation: throbber-loader 2000ms 450ms infinite ease-out;
  right: -1.6em;
}
  .busy p {
    font-size: 0.8rem;
    text-align: center;
  }
</style>