<a href="/" class="font-bold text-xl text-emerald-400 absolute top-2 left-2">SIRIUS</a>
<div class="flex justify-center items-center h-[100svh] w-[100vw]">
	<form action="/?signup" method="POST" class="max-w-[400px] flex flex-col items-center gap-4 py-3 px-3 w-10/12 bg-neutral-900 rounded-xl">
		<h2 class="text-3xl text-zinc-100">Login</h2>
		<div class="flex flex-col w-full">
			<label for="email" class="text-zinc-100">Email</label>
			<input type="email" name="email" id="email" class="w-full h-9 rounded-md px-2 outline-0"/>
		</div>
		<div class="flex flex-col w-full">
			<label for="password" class="text-zinc-100">Password</label>
			<input type="password" name="password" id="password" class="w-full h-9 rounded-md"/>
		</div>
		<a href="/reset-password" class="ml-auto text-emerald-100">Forgot password?</a>
		<button type="submit" class="w-full h-10 bg-emerald-400 rounded-md text-zinc-900">Login</button>
		<p class="text-zinc-100">Don't have an account? <a href="/signup" class="text-emerald-400">Join now!</a></p>
	</form>
</div>