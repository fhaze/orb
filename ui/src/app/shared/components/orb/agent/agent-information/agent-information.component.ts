import { Component, Input, OnInit } from '@angular/core';
import { Agent, AgentStates } from 'app/common/interfaces/orb/agent.interface';
import { AgentsService } from 'app/common/services/agents/agents.service';
import { NotificationsService } from 'app/common/services/notifications/notifications.service';

@Component({
  selector: 'ngx-agent-information',
  templateUrl: './agent-information.component.html',
  styleUrls: ['./agent-information.component.scss'],
})
export class AgentInformationComponent implements OnInit {
  @Input() agent: Agent;

  isResetting: boolean;

  agentStates = AgentStates;

  constructor(
    protected agentsService: AgentsService,
    protected notificationService: NotificationsService,
  ) {
    this.isResetting = false;
  }

  ngOnInit(): void {}

  resetAgent() {
    if (!this.isResetting) {
      this.isResetting = true;
      this.agentsService.resetAgent(this.agent.id).subscribe(() => {
        this.isResetting = false;
        this.notifyResetSuccess();
      });
    }
  }

  getAgentVersion() {
    const agentVersion = this.agent?.agent_metadata?.orb_agent?.version;

    return agentVersion ? agentVersion : '-';
  }

  notifyResetSuccess() {
    this.notificationService.success('Agent Reset Requested', '');
  }
}
