// Inject the CSS in the page
import "./styles.css";

// THE TUTORIAL STARTS HERE
// When you are ready to start, remove the following lines and put your code here
import { BpmnVisualization } from 'bpmn-visualization';

const bpmnVisualization = new BpmnVisualization({
 container: 'bpmn-container',
 navigation: { enabled: true }
});

bpmnVisualization.load(diagram, {
    fit: { type: FitType.Center }
   }); 

   import { BpmnVisualization, FitType } from 'bpmn-visualization';
   // the '?raw' parameter tells Vite to store the diagram content in a string.
   // for more details, see https://vitejs.dev/guide/assets.html#importing-asset-as-string
   // for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
   import diagram from './diagram.bpmn?raw';

bpmnVisualization.load(diagram, {
    fit: { type: FitType.Center },
    modelFilter: {
      pools: [
        {
          name: 'Process Engine - Invoice Receipt'
        }
      ]
    }
   });

function getActivitiesRunningInstances() {
    return new Map([
      ['assignApprover', { onTime: 5, risky: 0, critical: 0 }],
      ['approveInvoice', { onTime: 2, risky: 3, critical: 0 }],
      ['reviewInvoice', { onTime: 4, risky: 1, critical: 2 }],
      ['prepareBankTransfer', { onTime: 0, risky: 0, critical: 0 }],
      ['archiveInvoice', { onTime: 0, risky: 0, critical: 0 }],
    ]);
  }

function getEdgesWaitingInstances() {
    return new Map([['invoiceApproved', 2]]);
  }

  const activitiesRunningInstances = getActivitiesRunningInstances();
  activitiesRunningInstances.forEach((value, activityId) => {
    // running on time
    if (value.onTime) {
      bpmnVisualization.bpmnElementsRegistry.addOverlays(activityId, {
        position: 'top-center',
        label: `${value.onTime}`,
        style: {
          font: { color: 'white', size: 16 },
          fill: { color: 'green', opacity: 50 },
          stroke: { color: 'green', width: 2 },
        },
      });
    }
    // running late with risky level
    if (value.risky) {
      bpmnVisualization.bpmnElementsRegistry.addOverlays(activityId, {
        position: 'top-left',
        label: `${value.risky}`,
        style: {
          font: { color: 'white', size: 16 },
          fill: { color: '#FF8C00', opacity: 50 },
          stroke: { color: '#FF8C00', width: 2 },
        },
      });
    }
    // running late with critical level
    if (value.critical) {
      bpmnVisualization.bpmnElementsRegistry.addOverlays(activityId, {
        position: 'top-right',
        label: `${value.critical}`,
        style: {
          font: { color: 'white', size: 16 },
          fill: { color: 'red', opacity: 50 },
          stroke: { color: 'red', width: 2 },
        },
      });
    }
  });

  const edgesWaitingInstances = getEdgesWaitingInstances();
  edgesWaitingInstances.forEach((value, edgeId) => {
      bpmnVisualization.bpmnElementsRegistry.addOverlays(edgeId, {
          position: 'middle',
          label: `${value}`,
          style: {
            font: { color: 'white', size: 16 },
            fill: { color: 'red', opacity: 50 },
            stroke: { color: 'red', width: 2 },
          },
      });
  });

  activitiesRunningInstances.forEach((value, activityId) => {
    if (value.critical) {
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(activityId, 'task-running-critical');
    } else if (value.risky) {
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(activityId, 'task-running-risky');
    } else if (value.onTime) {
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(activityId, 'task-running-on-time');
    }
  });