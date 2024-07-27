<template>
    <div class="relative mt-5">
        <div class="w-full">
            <div class="flex">
                <input class="w-full py-2 pl-12 text-sm font-light border rounded-l select"
                    :placeholder="placeholderString" @input="search(searchString)" v-model.trim="searchString" />
                <svg v-on:click="() => { showOptions = !showOptions }"
                    class="cursor-pointer absolute left-4 top-2 text-black/100 border-e"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                </svg>

                <ul v-show="showOptions"
                    class="bg-white py-2 z-10 w-full text-sm font-light border shadow absolute mt-10">
                    <li v-on:click="createNew" v-if="data.length === 0" class="hover:bg-gray-500 p-2 cursor-pointer">
                        Create: {{ searchString }}
                    </li>
                    <li class="hover:bg-gray-500 p-2 cursor-pointer"
                        :class="[selectedOptionIndex === option.id ? 'bg-gray-500' : 'bg-white']" v-for="option in data"
                        v-on:click="handleSetSelectedValue(option)" v-bind:key="option.name">{{ option.name }}</li>
                </ul>
                <!-- <button class="" type="button">Create</button> -->


                <button v-on:click="handleSelectOption"
                    class="mr-2 py-1 px-3 flex items-center text-white font-medium bg-primary hover:bg-secondary active:scale-95 btn bg-primary rounded-r text-white p-2">
                    <svg v-if="loading" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                            opacity=".5" />
                        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                            <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite"
                                to="360 12 12" type="rotate" />
                        </path>
                    </svg>
                    Create
                </button>

            </div>
        </div>
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
        selectedIndex: Number,
        options: Array,
        handleSelectedOption: Function
    },

    data() {
        return {
            loading: false,
            searchString: '',
            selectedOptionIndex: this.selectedIndex,
            selectedOption: {},
            showOptions: false,
            data: this.options,
        }
    },
    methods: {
        async handleSelectOption() {
            this.loading = true;
            await this.handleSelectedOption(this.selectedOption);
            this.loading = false;
        },

        handleSetSelectedValue(option) {
            this.searchString = option.name;
            this.selectedOptionIndex = option.index;
            this.selectedOption = option;
            this.showOptions = false;
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