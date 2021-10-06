# Usage

**needs [modal](https://github.com/ZiF1R/plugins/tree/main/modal) plugin*

```HTML
<form>
    <fieldset>
        <legend>Settings</legend>
        <label for="length">
            <span>Password length: </span>
            <input type="number" id="num" min="6" max="50" value="6">
        </label>
        <label for="bigChar">
            <input type="checkbox" id="bigChar" name="settings">
            <span>Use big letters</span>
        </label>
        <label for="nums">
            <input type="checkbox" id="nums" name="settings">
            <span>Use numbers</span>
        </label>
    </fieldset>
</form>

<button class="generate" onclick="generatePass()">Generate</button>
```