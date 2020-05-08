<template>
    <div id="wrapper">
        <div class="inner">
            <h1>Todo notes</h1>
            <div class="notes">
                <div class="note" v-for="(note, i) in notes" @click="edit(i)">
                    <h3>{{note.title}}</h3>
                    <ul>
                        <li v-for="todo in todos(i)" :class="{'complete': todo.complete}"><span>{{todo.text}}</span></li>
                        <li v-if="note.todo.length > 4">...</li>
                    </ul>
                    <font-awesome-icon class="delete-note" icon="trash-alt" @click.stop="removeConfirmation(i)" />

                </div>
                <div class="note adder" @click="addNote">
                    +
                </div>
            </div>
        </div>
        <div class="overlay" v-if="confirm !== false" @click="confirm = false">
            <div class="dialog">
                <h4>Confirm note deletion?</h4>
                <a class="button yes" @click="remove(confirm)">Yes</a>
                <a class="button no" @click="confirm = false">No</a>
            </div>
        </div>
    </div>
</template>

<script>
    import seeder from "../seeder";

    export default {
        name: 'index',
        data () {
            return {
                notes: [],
                confirm: false
            }
        },
        mounted() {
            if (localStorage.getItem('notes')) {
                try {
                    this.notes = JSON.parse(localStorage.getItem('notes'));
                } catch(e) {
                    localStorage.removeItem('notes');
                    this.notes = seeder;
                }
            } else {
                this.notes = seeder;
            }
            this.save();
        },
        methods: {
            todos(i) {
                return this.notes[i].todo.slice(0, 5);
            },
            save() {
                localStorage.setItem('notes', JSON.stringify(this.notes));
            },
            removeConfirmation(i) {
                this.confirm = i;
            },
            remove(i) {
                this.notes.splice(i, 1);
                this.save();
            },
            edit(i) {
                this.$router.push({ name: 'edit', params: { id: i} });
            },
            addNote() {
                this.notes.push({title: "", todo: []});
                this.save();
                this.$router.push({ name: 'edit', params: { id: this.notes.length - 1 } });
            }
        }
    }
</script>
<style lang="scss">
</style>