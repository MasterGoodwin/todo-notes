<template>
    <div id="wrapper">
        <div class="inner" v-if="note">
            <div class="full-note">
                <font-awesome-icon class="delete-note" icon="trash-alt" @click.stop="noteRemoveConfirmation" />
                <router-link to='/' class="h1">
                    <font-awesome-icon icon="level-up-alt"/> Back to Notes
                </router-link>
                <input type="text" class="inline h1" v-model="note.title" v-on:keyup.enter="$event.target.blur()"
                       placeholder="Type and press Enter">
                <div v-for="(todo, i) in note.todo" :class="{'checked': todo.complete}">
                    <div class="icon-box" @click="check(i)">
                        <font-awesome-icon class="check" icon="check"  />
                    </div>
                    <input type="text" class="inline todo"  v-model="todo.text">
                    <div class="icon-box" @click="todoRemoveConfirmation(i)">
                        <font-awesome-icon icon="trash-alt" class="delete-todo" />
                    </div>
                </div>
                <div class="new-item">
                    <div class="icon-box">
                        <font-awesome-icon class="share" icon="share" />
                    </div>
                    <input type="text" class="inline todo" ref="newItemText"
                           v-on:keyup.enter="$event.target.blur()"
                           v-on:blur="newItem"
                           v-model="newItemText" placeholder="Type and press Enter">

                </div>
                <div class="buttons">
                    <a class="button yes" v-if="changed" @click="save">Save changes</a>
                    <a class="button no" v-if="changed" @click="restore">Restore</a>
                    <a class="button no" v-if="tempNote" @click="undo">Undo restore</a>

                </div>
            </div>
        </div>
        <div class="overlay" v-if="confirmId !== null" @click="confirmId = null">
            <div class="dialog">
                <h4>Confirm {{confirmType}} deletion?</h4>
                <a class="button yes" @click="remove(confirmType, confirmId)">Yes</a>
                <a class="button no" @click="confirm = false">No</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Edit",
        data () {
            return {
                notes: [],
                note: null,
                tempNote: null,
                changed: false,
                newItemText: '',
                confirmId: null,
                confirmType: ''
            }
        },
        mounted() {
            if (localStorage.getItem('notes')) {
                this.notes = JSON.parse(localStorage.getItem('notes'));
                this.note = this.cloneObj(this.notes[this.$route.params.id]);
            } else {
                this.$router.push({name: 'index'});
            }
        },
        watch: {
            note: {
                deep: true,
                handler(newValue) {
                    this.changed = !this.isEqual(this.notes[this.$route.params.id], newValue);
                }
            }
        },
        methods: {
            check(i) {
                this.note.todo[i].complete = !this.note.todo[i].complete;
            },
            newItem() {
                if (!this.newItemText.length)
                    return
                this.note.todo.push({text: this.newItemText, complete: false});
                this.newItemText = '';
                this.$refs.newItemText.focus();
            },
            save() {
                this.notes[this.$route.params.id] = this.cloneObj(this.note);
                localStorage.setItem('notes', JSON.stringify(this.notes));
                this.changed = false;
            },
            restore() {
                this.tempNote = this.cloneObj(this.note);
                this.note = this.cloneObj(this.notes[this.$route.params.id]);
            },
            undo() {
                this.note = this.cloneObj(this.tempNote);
                this.tempNote = null;
            },
            noteRemoveConfirmation() {
                this.confirmId = this.$route.params.id;
                this.confirmType = 'note';
            },
            todoRemoveConfirmation(i) {
                this.confirmId = i;
                this.confirmType = 'todo';
            },
            remove(type, id) {
                switch (type) {
                    case 'todo':
                        this.note.todo.splice(id, 1)
                        break
                    case 'note':
                        this.notes.splice(id, 1);
                        localStorage.setItem('notes', JSON.stringify(this.notes));
                        this.$router.push({name: 'index'});
                }
            },
            cloneObj(obj) {
                return JSON.parse(JSON.stringify(obj))
            },
            isEqual(obj1, obj2) {
                return (JSON.stringify(obj1) === JSON.stringify(obj2))
            }

        }
    }
</script>

<style scoped>

</style>