export default `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.4.0">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_1qh07yk</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_04xnoiz">
      <bpmn:incoming>SequenceFlow_1qh07yk</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0v5rnhy</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1qh07yk" sourceRef="StartEvent_1" targetRef="Task_04xnoiz" />
    <bpmn:endEvent id="EndEvent_0z37r99">
      <bpmn:incoming>SequenceFlow_0v5rnhy</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_0v5rnhy" sourceRef="Task_04xnoiz" targetRef="EndEvent_0z37r99" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_04xnoiz_di" bpmnElement="Task_04xnoiz">
        <dc:Bounds x="320" y="91" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1qh07yk_di" bpmnElement="SequenceFlow_1qh07yk">
        <di:waypoint xsi:type="dc:Point" x="209" y="120" />
        <di:waypoint xsi:type="dc:Point" x="265" y="120" />
        <di:waypoint xsi:type="dc:Point" x="265" y="131" />
        <di:waypoint xsi:type="dc:Point" x="320" y="131" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="280" y="115.5" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0z37r99_di" bpmnElement="EndEvent_0z37r99">
        <dc:Bounds x="603" y="168" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="621" y="204" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0v5rnhy_di" bpmnElement="SequenceFlow_0v5rnhy">
        <di:waypoint xsi:type="dc:Point" x="420" y="131" />
        <di:waypoint xsi:type="dc:Point" x="512" y="131" />
        <di:waypoint xsi:type="dc:Point" x="512" y="186" />
        <di:waypoint xsi:type="dc:Point" x="603" y="186" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="527" y="148.5" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
