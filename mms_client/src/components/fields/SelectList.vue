<template>
    <div class="relative">
        <input class="w-full py-2 pl-12 text-sm font-light border rounded select" :placeholder="placeholderString"
            @input="search(searchString)" v-model.trim="searchString" />
        <svg v-on:click="() => { this.showOptions = !this.showOptions }"
            class="cursor-pointer absolute left-4 top-2 text-black/100 border-e" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd" />
        </svg>

        <ul v-show="showOptions" class="bg-white z-10 w-full text-sm font-light border shadow absolute">
            <li v-on:click="createNew" v-if="this.data.length === 0" class="hover:bg-gray-500 p-2 cursor-pointer">
                Create: {{ this.searchString }}
            </li>
            <li class="hover:bg-gray-500 p-2 cursor-pointer"
                :class="[selectedOption === option.index ? 'bg-gray-500' : 'bg-white']" v-for="option in data"
                v-on:click="handleSelectOption(option)" v-bind:key="option.name">{{
                    option.name }}</li>
        </ul>
    </div>
</template>
<style>
input:focus-visible {
    display: block;
}
</style>
<script>
export default {
    props: {
        placeholderString: String,
        options: Array,
        selectedIndex: Number,
    },
    data() {
        return {
            searchString: '',
            selectedOption: this.selectedIndex,
            showOptions: false,
            data: this.options
        }
    },
    methods: {
        handleSelectOption(option) {
            this.searchString = option.name;
            this.selectedOption = option.index;
            this.showOptions = false;
            this.$emit('handleSelectedOption', option);
        },

        search(option) {
            this.searchString = option;
            this.showOptions = true;
            this.data = this.options.filter((item) =>
                item.name.toLowerCase().includes(this.searchString.toLowerCase())
            );
        },

        createNew() {
            this.$emit('handleCreateNew', this.searchString);
        }
    }
}
</script>