<template>

    <section class="add__form">

        <h2 class="page__title">Add Task</h2>

        <form>

            <div class="form__group">
                <label for="name" class="form__label">Task name</label>
                <input type="text" id="name" name="name" class="form__input">
            </div>

            <div class="form__group">
                <label for="detail" class="form__label">Task detail</label>
                <textarea type="text" id="detail" name="detail" class="form__textarea"></textarea>
            </div>

            <div class="form__group">
                <label for="deadline" class="form__label">Deadline</label>
                <input type="date" id="deadline" name="deadline" class="form__input">
            </div>

            <button type="submit" class="form__button">Add</button>

        </form>

    </section>

</template>

<script>

</script>

<style scoped>

.add__form {
    width: 90%;
    height: auto;
    margin: 0 auto;
}

.page__title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
}

.form__group {
    width: 100%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
}

.form__label {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4px;
}

.form__input {
    font-size: 16px;
    width: 320px;
    margin: 0 auto;
    outline: none;
    text-align: center;
}

.form__textarea{
    font-size: 16px;
    width: 320px;
    height: 120px;
    margin: 0 auto;
    outline: none;
}

.form__button {
    display: block;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    font-weight: 500;
    color: black;
    background-color: lightsteelblue;
    width: 160px;
    display: block;
    margin: 40px auto;
    padding: 4px;
    border: 1px solid grey;
    border-radius: 3px;
}



@media (min-width: 600px) {
    .form__button:hover {
        color: #fff;
        background: lightslategray;
    }
}

@media (min-width: 768px) {
}

</style>