<script lang="ts">
    let { data } = $props();
    let isLoading = $state(true);    
    let error = null;

    const today = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    const entries = data.props?.entries || [];
    entries.forEach(e => {
      today.calories += e.calories || 0;
      today.protein += e.protein || 0;
      today.carbs += e.carbs || 0;
      today.fat += e.fat || 0;
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