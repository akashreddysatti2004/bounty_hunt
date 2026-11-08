import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Bounty {
  id: number;
  title: string;
  category: string;
  reward: number;
  description: string;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  bounties: Bounty[] = [];
  selected?: Bounty;
  search = '';
  agentRequest = 'Create an implementation plan for a new bounty marketplace feature.';
  agentResult = '';
  loading = true;

  async ngOnInit() {
    try {
      const response = await fetch('http://localhost:5080/api/bounties');
      this.bounties = await response.json();
      this.selected = this.bounties[0];
    } finally {
      this.loading = false;
    }
  }

  get filteredBounties() {
    const term = this.search.toLowerCase();
    return this.bounties.filter((bounty) =>
      `${bounty.title} ${bounty.category} ${bounty.description}`.toLowerCase().includes(term)
    );
  }

  selectBounty(bounty: Bounty) {
    this.selected = bounty;
  }

  async runAgent() {
    this.agentResult = 'Agents are working...';
    const response = await fetch('http://localhost:8000/agents/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: this.agentRequest })
    });
    const result = await response.json();
    this.agentResult = `${result.plan}\n\n${result.review}`;
  }

  formatReward(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  }
}
