<script>
	let emailInputRef;

	const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

	function validateEmail() {
		if (emailInputRef.value && regex.test(emailInputRef.value)) {
			console.log("its working")
			emailInputRef.classList.remove('border-orange-500')
			emailInputRef.classList.add('border-emerald-400')
		} else {
			emailInputRef.classList.remove('border-emerald-400')
			emailInputRef.classList.add('border-orange-500')
		}
	}
</script>

<a href="/" class="font-bold text-xl text-emerald-400 absolute top-2 left-2">SIRIUS</a>
<div class="flex justify-center items-center h-[100svh] w-[100vw]">
	<form action="/?signup" method="POST" class="relative -translate-y-8 max-w-[400px] flex flex-col items-center gap-4 py-3 px-3 w-11/12 bg-neutral-900 rounded-xl">
		<h2 class="text-3xl text-zinc-100">Login</h2>
		<div class="flex flex-col w-full">
			<label for="email" class="text-zinc-100 text-2xl">Email</label>
			<input oninput={validateEmail} onchange={validateEmail} bind:this={emailInputRef} type="email" name="email" id="email" class="w-full h-9 rounded-md border-2 transition-all duration-200 px-2 outline-0 text-zinc-900"/>
		</div>
		<div class="flex flex-col w-full">
			<label for="password" class="text-zinc-100 text-2xl">Password</label>
			<input type="password" name="password" id="password" class="w-full h-9 rounded-md border-2 transition-all duration-200 px-2 outline-0 text-zinc-900"/>
		</div>
		<a href="/reset-password" class="ml-auto text-emerald-100">Forgot password?</a>
		<button type="submit" class="w-full h-10 bg-emerald-400 rounded-md text-zinc-900 text-xl">Login</button>
		<p class="text-zinc-100">Don't have an account? <a href="/signup" class="text-emerald-400">Join now!</a></p>
	</form>
</div>