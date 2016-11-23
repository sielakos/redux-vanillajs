export default `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="1.4.0">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_1qh07yk</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_04xnoiz">
      <bpmn:incoming>SequenceFlow_1qh07yk</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0dlqryx</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1qh07yk" sourceRef="StartEvent_1" targetRef="Task_04xnoiz" />
    <bpmn:exclusiveGateway id="ExclusiveGateway_07mu6ot">
      <bpmn:incoming>SequenceFlow_0dlqryx</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1rgfdxt</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_1q97u3o</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0ofdthk</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_0dlqryx" sourceRef="Task_04xnoiz" targetRef="ExclusiveGateway_07mu6ot" />
    <bpmn:task id="Task_1wjnddq">
      <bpmn:incoming>SequenceFlow_1rgfdxt</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_177grj7</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1rgfdxt" sourceRef="ExclusiveGateway_07mu6ot" targetRef="Task_1wjnddq" />
    <bpmn:task id="Task_1b0sjb2">
      <bpmn:incoming>SequenceFlow_1q97u3o</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0u0ul6z</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1q97u3o" sourceRef="ExclusiveGateway_07mu6ot" targetRef="Task_1b0sjb2" />
    <bpmn:exclusiveGateway id="ExclusiveGateway_1qeh21h">
      <bpmn:incoming>SequenceFlow_0u0ul6z</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_177grj7</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_1r27e6j</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0kdw4tn</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_0u0ul6z" sourceRef="Task_1b0sjb2" targetRef="ExclusiveGateway_1qeh21h" />
    <bpmn:sequenceFlow id="SequenceFlow_177grj7" sourceRef="Task_1wjnddq" targetRef="ExclusiveGateway_1qeh21h" />
    <bpmn:endEvent id="EndEvent_0145qhl">
      <bpmn:incoming>SequenceFlow_0kdw4tn</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_0kdw4tn" sourceRef="ExclusiveGateway_1qeh21h" targetRef="EndEvent_0145qhl" />
    <bpmn:task id="Task_08h32v4">
      <bpmn:incoming>SequenceFlow_0ofdthk</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0ro7ggi</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0ofdthk" sourceRef="ExclusiveGateway_07mu6ot" targetRef="Task_08h32v4" />
    <bpmn:sequenceFlow id="SequenceFlow_0ro7ggi" sourceRef="Task_08h32v4" targetRef="ExclusiveGateway_03ow41f" />
    <bpmn:parallelGateway id="ExclusiveGateway_03ow41f">
      <bpmn:incoming>SequenceFlow_0ro7ggi</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_03105d3</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_1gpne1a</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:task id="Task_18kkx1t">
      <bpmn:incoming>SequenceFlow_03105d3</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1wirxv6</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_03105d3" sourceRef="ExclusiveGateway_03ow41f" targetRef="Task_18kkx1t" />
    <bpmn:task id="Task_01qggni">
      <bpmn:incoming>SequenceFlow_1gpne1a</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_17iigb2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1gpne1a" sourceRef="ExclusiveGateway_03ow41f" targetRef="Task_01qggni" />
    <bpmn:sequenceFlow id="SequenceFlow_17iigb2" sourceRef="Task_01qggni" targetRef="ExclusiveGateway_0swp47g" />
    <bpmn:parallelGateway id="ExclusiveGateway_0swp47g">
      <bpmn:incoming>SequenceFlow_17iigb2</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_1wirxv6</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1r27e6j</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:sequenceFlow id="SequenceFlow_1wirxv6" sourceRef="Task_18kkx1t" targetRef="ExclusiveGateway_0swp47g" />
    <bpmn:sequenceFlow id="SequenceFlow_1r27e6j" sourceRef="ExclusiveGateway_0swp47g" targetRef="ExclusiveGateway_1qeh21h" />
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
      <bpmndi:BPMNShape id="ExclusiveGateway_07mu6ot_di" bpmnElement="ExclusiveGateway_07mu6ot" isMarkerVisible="true">
        <dc:Bounds x="571" y="106" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="596" y="156" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0dlqryx_di" bpmnElement="SequenceFlow_0dlqryx">
        <di:waypoint xsi:type="dc:Point" x="420" y="131" />
        <di:waypoint xsi:type="dc:Point" x="571" y="131" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="496" y="106" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1wjnddq_di" bpmnElement="Task_1wjnddq">
        <dc:Bounds x="700" y="32" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1rgfdxt_di" bpmnElement="SequenceFlow_1rgfdxt">
        <di:waypoint xsi:type="dc:Point" x="596" y="106" />
        <di:waypoint xsi:type="dc:Point" x="596" y="72" />
        <di:waypoint xsi:type="dc:Point" x="700" y="72" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="611" y="79" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1b0sjb2_di" bpmnElement="Task_1b0sjb2">
        <dc:Bounds x="700" y="177" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1q97u3o_di" bpmnElement="SequenceFlow_1q97u3o">
        <di:waypoint xsi:type="dc:Point" x="596" y="156" />
        <di:waypoint xsi:type="dc:Point" x="596" y="217" />
        <di:waypoint xsi:type="dc:Point" x="700" y="217" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="611" y="176.5" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1qeh21h_di" bpmnElement="ExclusiveGateway_1qeh21h" isMarkerVisible="true">
        <dc:Bounds x="1279" y="127" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1304" y="177" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0u0ul6z_di" bpmnElement="SequenceFlow_0u0ul6z">
        <di:waypoint xsi:type="dc:Point" x="800" y="217" />
        <di:waypoint xsi:type="dc:Point" x="1304" y="217" />
        <di:waypoint xsi:type="dc:Point" x="1304" y="177" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1052" y="202" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_177grj7_di" bpmnElement="SequenceFlow_177grj7">
        <di:waypoint xsi:type="dc:Point" x="800" y="72" />
        <di:waypoint xsi:type="dc:Point" x="1304" y="72" />
        <di:waypoint xsi:type="dc:Point" x="1304" y="127" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1052" y="57" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0145qhl_di" bpmnElement="EndEvent_0145qhl">
        <dc:Bounds x="1489" y="134" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1507" y="170" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0kdw4tn_di" bpmnElement="SequenceFlow_0kdw4tn">
        <di:waypoint xsi:type="dc:Point" x="1329" y="152" />
        <di:waypoint xsi:type="dc:Point" x="1489" y="152" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1409" y="137" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_08h32v4_di" bpmnElement="Task_08h32v4">
        <dc:Bounds x="700" y="320" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0ofdthk_di" bpmnElement="SequenceFlow_0ofdthk">
        <di:waypoint xsi:type="dc:Point" x="596" y="156" />
        <di:waypoint xsi:type="dc:Point" x="596" y="360" />
        <di:waypoint xsi:type="dc:Point" x="700" y="360" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="611" y="248" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0ro7ggi_di" bpmnElement="SequenceFlow_0ro7ggi">
        <di:waypoint xsi:type="dc:Point" x="800" y="360" />
        <di:waypoint xsi:type="dc:Point" x="861" y="360" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="831" y="345" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ParallelGateway_1a8mze5_di" bpmnElement="ExclusiveGateway_03ow41f">
        <dc:Bounds x="861" y="335" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="886" y="385" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_18kkx1t_di" bpmnElement="Task_18kkx1t">
        <dc:Bounds x="952" y="251" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_03105d3_di" bpmnElement="SequenceFlow_03105d3">
        <di:waypoint xsi:type="dc:Point" x="886" y="335" />
        <di:waypoint xsi:type="dc:Point" x="886" y="291" />
        <di:waypoint xsi:type="dc:Point" x="952" y="291" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="901" y="303" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_01qggni_di" bpmnElement="Task_01qggni">
        <dc:Bounds x="952" y="383" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1gpne1a_di" bpmnElement="SequenceFlow_1gpne1a">
        <di:waypoint xsi:type="dc:Point" x="886" y="385" />
        <di:waypoint xsi:type="dc:Point" x="886" y="423" />
        <di:waypoint xsi:type="dc:Point" x="952" y="423" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="901" y="404" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_17iigb2_di" bpmnElement="SequenceFlow_17iigb2">
        <di:waypoint xsi:type="dc:Point" x="1052" y="423" />
        <di:waypoint xsi:type="dc:Point" x="1136" y="423" />
        <di:waypoint xsi:type="dc:Point" x="1136" y="375" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1094" y="408" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ParallelGateway_02qwdyp_di" bpmnElement="ExclusiveGateway_0swp47g">
        <dc:Bounds x="1111" y="325" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1136" y="375" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1wirxv6_di" bpmnElement="SequenceFlow_1wirxv6">
        <di:waypoint xsi:type="dc:Point" x="1052" y="291" />
        <di:waypoint xsi:type="dc:Point" x="1136" y="291" />
        <di:waypoint xsi:type="dc:Point" x="1136" y="325" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1094" y="266" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1r27e6j_di" bpmnElement="SequenceFlow_1r27e6j">
        <di:waypoint xsi:type="dc:Point" x="1161" y="350" />
        <di:waypoint xsi:type="dc:Point" x="1304" y="350" />
        <di:waypoint xsi:type="dc:Point" x="1304" y="177" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1233" y="335" width="0" height="0" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
