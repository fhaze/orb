import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { AgentGroup } from 'app/common/interfaces/orb/agent.group.interface';
import { Agent } from 'app/common/interfaces/orb/agent.interface';
import { AgentMatchComponent } from 'app/pages/fleet/agents/match/agent.match.component';

@Component({
  selector: 'ngx-agent-groups',
  templateUrl: './agent-groups.component.html',
  styleUrls: ['./agent-groups.component.scss'],
})
export class AgentGroupsComponent implements OnInit, OnChanges {
  @Input() agent: Agent;

  @Input()
  groups: AgentGroup[];

  errors;

  constructor(
    protected dialogService: NbDialogService,
    protected router: Router,
    protected route: ActivatedRoute,
  ) {
    this.groups = [];
    this.errors = {};
  }

  ngOnInit(): void {}

  ngOnChanges(changes) {
    if (changes.groups) {
      this.groups = changes.groups.currentValue;
    }
    if (!this.groups || this.groups.length === 0) {
      this.errors['nogroup'] = 'This agent does not belong to any group.';
    } else {
      delete this.errors['nogroup'];
    }
  }

  showAgentGroupMatches(agentGroup) {
    this.dialogService.open(AgentMatchComponent, {
      context: { agentGroup },
      autoFocus: true,
      closeOnEsc: true,
    });
  }

  onOpenEditAgentGroup(agentGroup: any) {
    this.router.navigate([`/pages/fleet/groups/edit/${agentGroup.id}`], {
      state: { agentGroup: agentGroup, edit: true },
      relativeTo: this.route,
    });
  }
}
