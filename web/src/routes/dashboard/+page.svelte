<script lang="ts">
    import { auth } from '$lib/stores/auth';
    let { data } = $props();
    let isLoading = $state(true);    
    let error = null;

    const today = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    data.props?.entries.forEach(e => {
      today.calories += e.calories;
      today.protein += e.protein;
      today.carbs += e.carbs;
      today.fat += e.fat;
    });
</script>
<div class="flex items-center justify-center">
    <div class="stats bg-base-100 border border-base-300">
        <div class="stat">
          <div class="stat-title">Calories</div>
          <div class="stat-value">{today.calories}</div>
        </div>

        <div class="stat">
            <div class="stat-title">Protein</div>
            <div class="stat-value">{today.protein}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Carbs</div>
          <div class="stat-value">{today.carbs}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Fat</div>
          <div class="stat-value">{today.fat}</div>
        </div>
      </div>
</div>