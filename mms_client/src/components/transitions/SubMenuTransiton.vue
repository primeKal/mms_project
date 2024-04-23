<template>
    <transition
        enter-from-class="h-0"
        enter-to-class="h-auto"
        enter-active-class="transtion-[height] ease-in-out"
        leave-from-class="h-auto"
        leave-to-class="h-0"
        leave-active-class="transtion-[height] ease-in-out"
    >
        <transition 
            appear
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            enter-active-class="transition-opacity delay-400"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            leave-active-class="transition-opacity"    
        >  
            <slot></slot>
        </transition>
    </transition>
</template>