<script>
	let emailInputRef = $state()
	let warningRef = $state()
	let emailValid = $state(false)
	let timeoutID

	const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

	function validateEmail() {
		if (emailInputRef.value && emailRegex.test(emailInputRef.value)) {
			emailInputRef.classList.remove('border-orange-500')
			emailInputRef.classList.add('border-emerald-400')
			emailValid = true
		} else {
			emailInputRef.classList.remove('border-emerald-400')
			emailInputRef.classList.add('border-orange-500')
			emailValid = false
		}
	}

	function submitForm(event) {
		event.preventDefault()
		clearTimeout(timeoutID)

		if (!emailValid) {
			warningRef.textContent = "Enter a valid email."
			warningRef.classList.remove('opacity-0')
			warningRef.classList.remove('-translate-x-[150%]')
			emailInputRef.classList.add('border-orange-500')
			return
		}

		event.target.submit()
	}
</script>

<a href="/" class="font-bold text-xl text-emerald-400 absolute top-4 left-2 z-50">SIRIUS</a>
<div class="relative -translate-y-14 flex flex-col justify-center items-center gap-2 h-[100svh] w-[100vw]">
	<p bind:this={warningRef} class="relative -translate-x-[150%] h-10 flex items-center justify-center rounded-xl w-11/12 max-w-[400px] opacity-0 transition-all duration-300 bg-red-500 text-l py-2 px-3">Nothing</p>
	<form action="?/resetPassword" method="POST" onsubmit={submitForm} class="max-w-[400px] w-11/12 flex flex-col items-center gap-4 py-3 px-3 bg-neutral-900 rounded-xl">
		<h2 class="text-3xl text-zinc-100">Reset Password</h2>
		<div class="flex flex-col w-full">
			<label for="email" class="text-zinc-100 text-2xl">Email</label>
			<input oninput={validateEmail} onchange={validateEmail} bind:this={emailInputRef} formnovalidate type="email" name="email" id="email" class="w-full h-9 rounded-md border-2 transition-all duration-200 px-2 outline-0 text-zinc-900"/>
		</div>
		<button type="submit" class="w-full h-10 bg-emerald-400 rounded-md text-zinc-900 text-xl">Reset</button>
	</form>
</div>