<script setup>
import { onMounted } from "vue";
import FloatingFlowers from "../FloatingFlowers.vue";

const emit = defineEmits(["loaded"]);

onMounted(() => {
	// Wait for 3.5 seconds to allow the loading animations to play fully,
	// then emit loaded event to transition to the lock screen.
	setTimeout(() => {
		emit("loaded");
	}, 3500);
});
</script>

<template>
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wine-gradient text-[#FBF3EE] font-accent select-none overflow-hidden"
	>
		<!-- Floating background flowers -->
		<FloatingFlowers :count="8" />

		<!-- Center Content Wrapper -->
		<div class="flex flex-col items-center justify-center relative">
			<!-- Swaying Tulip Bud above the flower (mimicking attachment) -->
			<div class="absolute -top-20 left-[-16px] animate-sway pointer-events-none">
				<svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<!-- Green Stem and Leaves -->
					<path d="M12 2C12 2 12 7 10 9" stroke="#7E9F70" stroke-width="1.8" stroke-linecap="round" />
					<path d="M12 4.5C13.5 5 15 4.5 15 4.5" stroke="#7E9F70" stroke-width="1.4" stroke-linecap="round" />
					<!-- Tulip Bud Head -->
					<path
						d="M10 9C8.5 10 8 12.5 9.5 14C10.5 15.2 12 15.5 12 15.5C12 15.5 13.5 15.2 14.5 14C16 12.5 15.5 10 14 9Z"
						fill="#DC7FA3"
					/>
					<path
						d="M9.5 12.5C10.5 13.2 11.5 13.5 12 13.5C12.5 13.5 13.5 13.2 14.5 12.5"
						stroke="#9E3A5E"
						stroke-width="0.8"
						stroke-linecap="round"
					/>
				</svg>
			</div>

			<!-- Main Flower SVG (with staggered bloom animations) -->
			<svg viewBox="0 0 100 100" class="w-32 h-32 relative">
				<g class="flower-group">
					<!-- 5 Petals rotated around 50 50 -->
					<ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" class="petal-1" />
					<ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" class="petal-2" />
					<ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" class="petal-3" />
					<ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" class="petal-4" />
					<ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" class="petal-5" />
					<!-- Center white/cream core -->
					<circle cx="50" cy="50" r="10" fill="#FBF3EE" class="flower-center" />
				</g>
			</svg>

			<!-- Elegant preparing message -->
			<p class="mt-8 text-rose-200/80 font-accent text-lg tracking-wider animate-pulse-slow">
				Preparing something special for you...
			</p>
		</div>
	</div>
</template>

<style scoped>
/* Sway animation for the tulip bud at the top */
@keyframes sway {
	0%,
	100% {
		transform: rotate(-10deg) translateY(0);
	}
	50% {
		transform: rotate(15deg) translateY(-2px);
	}
}
.animate-sway {
	animation: sway 3s ease-in-out infinite;
	transform-origin: top center;
}

/* Staggered bloom and rotation for flower */
.flower-group {
	transform-origin: 50px 50px;
	animation: rotate-flower 12s linear infinite;
	animation-delay: 2.2s; /* Starts after blooming finishes */
}

@keyframes rotate-flower {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.petal-1,
.petal-2,
.petal-3,
.petal-4,
.petal-5,
.flower-center {
	transform-origin: 50px 50px;
	animation-fill-mode: forwards;
}

/* Individual bloom animation with starting delay */
@keyframes bloom-1 {
	0% {
		transform: rotate(0deg) scale(0);
		opacity: 0;
	}
	100% {
		transform: rotate(0deg) scale(1);
		opacity: 1;
	}
}
.petal-1 {
	animation: bloom-1 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	animation-delay: 0.1s;
	transform: scale(0);
}

@keyframes bloom-2 {
	0% {
		transform: rotate(72deg) scale(0);
		opacity: 0;
	}
	100% {
		transform: rotate(72deg) scale(1);
		opacity: 1;
	}
}
.petal-2 {
	animation: bloom-2 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	animation-delay: 0.25s;
	transform: scale(0);
}

@keyframes bloom-3 {
	0% {
		transform: rotate(144deg) scale(0);
		opacity: 0;
	}
	100% {
		transform: rotate(144deg) scale(1);
		opacity: 1;
	}
}
.petal-3 {
	animation: bloom-3 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	animation-delay: 0.4s;
	transform: scale(0);
}

@keyframes bloom-4 {
	0% {
		transform: rotate(216deg) scale(0);
		opacity: 0;
	}
	100% {
		transform: rotate(216deg) scale(1);
		opacity: 1;
	}
}
.petal-4 {
	animation: bloom-4 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	animation-delay: 0.55s;
	transform: scale(0);
}

@keyframes bloom-5 {
	0% {
		transform: rotate(288deg) scale(0);
		opacity: 0;
	}
	100% {
		transform: rotate(288deg) scale(1);
		opacity: 1;
	}
}
.petal-5 {
	animation: bloom-5 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	animation-delay: 0.7s;
	transform: scale(0);
}

/* Center core appearance */
@keyframes bloom-center {
	0% {
		transform: scale(0);
		opacity: 0;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
.flower-center {
	animation: bloom-center 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	animation-delay: 1s;
	transform: scale(0);
}

/* Smooth pulse animation for the text */
@keyframes pulse-slow {
	0%,
	100% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
}
.animate-pulse-slow {
	animation: pulse-slow 2.5s ease-in-out infinite;
}
</style>
