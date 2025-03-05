<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/old_auth';
  import api from '$lib/api';
  
  // This would normally be fetched from the API
  let stats = {
    totalVisits: 0,
    activeUsers: 0,
    completedTasks: 0
  };
  
  let isLoading = true;
  let error = null;
  
  onMount(async () => {
    try {
      // This would be a real API call in a full application
      // const response = await api.get('/user/stats');
      // stats = response.data;
      
      // Mock data for demonstration
      stats = {
        totalVisits: 1245,
        activeUsers: 42,
        completedTasks: 128
      };
      
      isLoading = false;
    } catch (err: any) {
      error = err.message || 'Failed to load dashboard data';
      isLoading = false;
    }
  });
</script>

<div class="dashboard">
  <h1>Dashboard</h1>
  
  {#if isLoading}
    <div class="loading">Loading dashboard data...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else}
    <div class="welcome-card">
      <h2>Welcome back, {$auth.user?.name}!</h2>
      <p>Here's your activity summary</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Visits</h3>
        <p class="stat-value">{stats.totalVisits}</p>
      </div>
      
      <div class="stat-card">
        <h3>Active Users</h3>
        <p class="stat-value">{stats.activeUsers}</p>
      </div>
      
      <div class="stat-card">
        <h3>Completed Tasks</h3>
        <p class="stat-value">{stats.completedTasks}</p>
      </div>
    </div>
    
    <div class="actions">
      <h3>Quick Actions</h3>
      <div class="button-group">
        <button class="action-button">Create New Task</button>
        <button class="action-button">Generate Report</button>
        <button class="action-button">View Profile</button>
      </div>
    </div>
  {/if}
</div>
