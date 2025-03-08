<script lang="ts">
    import { enhance } from '$app/forms';
    //import type { NutritionEntry } from '$lib/types';
    //import type { ActionData } from './$types';

    //export let form: ActionData;

    // Set the default date to today's date in yyyy-mm-dd format
    const today = new Date().toISOString().split('T')[0];
    const defaultNumericVal = 0;
</script>

<form class="flex gap-4" method="POST" action="?/add" use:enhance>
  <div class="form-control w-1/7">
    <label for="date" class="label">
      <span class="label-text">Date</span>
    </label>
    <input type="date" id="date" name="date" value={today} class="input input-bordered w-full" />
  </div>

  <div class="form-control w-1/7">
    <label for="description" class="label">
      <span class="label-text">Description</span>
    </label>
    <input type="text" id="description" name="description" class="input input-bordered w-full" />
  </div>

  <div class="form-control w-1/7">
    <label for="calories" class="label">
      <span class="label-text">Calories</span>
    </label>
    <label class="input">
      <input type="number" id="calories" name="calories" value={defaultNumericVal} placeholder="" />
      <span class="label">cal</span>
    </label>
  </div>

  <div class="form-control w-1/7">
      <label for="protein" class="label">
        <span class="label-text">Protein</span>
      </label>
      <label class="input">
        <input type="number" id="protein" name="protein" value={defaultNumericVal} placeholder="" />
        <span class="label">g</span>
      </label>
  </div>

  <div class="form-control w-1/7">
      <label for="carbs" class="label">
        <span class="label-text">Carbohydrates</span>
      </label>
      <label class="input">
        <input type="number" id="carbs" name="carbs" value={defaultNumericVal} placeholder="" />
        <span class="label">g</span>
      </label>
  </div>

  <div class="form-control w-1/7">
      <label for="fat" class="label">
        <span class="label-text">Fat</span>
      </label>
      <label class="input">
        <input type="number" id="fat" name="fat" value={defaultNumericVal} placeholder="" />
        <span class="label">g</span>
      </label>
  </div>

  <button class="btn btn-success" type="submit">+</button>
</form>

<!-- {#if form?.error}
  <p style="color: red;">Error: {form.error}</p>
{/if}

{#if form?.id}
  <p>Entry created successfully! ID: {form.id}</p>
{/if} -->