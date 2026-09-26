export function KafkaDiagram() {
  const partitions = [0, 1, 2, 3]
  return <svg className="kafka-diagram" viewBox="0 0 820 390" role="img" aria-labelledby="kafka-title kafka-desc">
    <title id="kafka-title">Kafka partition and consumer group architecture</title>
    <desc id="kafka-desc">Three producers send records to a Kafka topic with four ordered partitions. Two consumer groups read the records and forward them to a database.</desc>
    <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e8e5df" strokeWidth="1"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0l10 5-10 5z"/></marker></defs>
    <rect width="820" height="390" rx="8" fill="#fbfaf7"/><rect width="820" height="390" rx="8" fill="url(#grid)" opacity=".7"/>
    {[74,150,226].map((y,i)=><g key={y}><rect x="20" y={y} width="115" height="56" rx="6" fill="#fffdfa" stroke="#111827"/><text x="77" y={y+34} textAnchor="middle">Producer {String.fromCharCode(65+i)}</text><path d={`M135 ${y+28} C170 ${y+28},168 ${153+i*17},200 ${153+i*17}`} fill="none" stroke="#111827" strokeWidth="1.8" markerEnd="url(#arrow)"/></g>)}
    <rect x="210" y="54" width="182" height="262" rx="6" fill="#fffdfa" stroke="#111827"/><text x="301" y="83" textAnchor="middle" fontWeight="700">Kafka Topic</text><text x="301" y="102" textAnchor="middle" fontSize="12">orders</text>
    {partitions.map((n,i)=><g key={n}><rect x="224" y={119+i*45} width="154" height="36" rx="6" fill="#dceeff" stroke="#69aaf6"/><text x="236" y={142+i*45} fill="#0869dd">Partition {n}</text>{[0,1,2,3].map(j=><rect key={j} x={307+j*15} y={128+i*45} width="11" height="18" fill="#fff" stroke="#6d8299"/>)}</g>)}
    {[37,202].map((y,g)=><g key={y}><rect x="468" y={y} width="176" height="132" rx="9" fill="#fffdfa" stroke="#111827" strokeDasharray="8 5"/><text x="556" y={y+25} textAnchor="middle" fontWeight="700">Consumer Group {g?'B':'A'}</text>{[0,1].map(i=><g key={i}><rect x="488" y={y+38+i*48} width="136" height="36" rx="7" fill="#dceeff" stroke="#69aaf6"/><text x="556" y={y+61+i*48} textAnchor="middle">Consumer {i+1}</text></g>)}</g>)}
    <path d="M392 158c38 0 36-50 68-50M392 245c38 0 36 43 68 43M644 103c36 0 20 75 58 75M644 267c36 0 20-70 58-70" fill="none" stroke="#111827" strokeWidth="1.8" markerEnd="url(#arrow)"/>
    <g><ellipse cx="750" cy="162" rx="35" ry="13" fill="#edf5fa" stroke="#111827"/><path d="M715 162v68c0 18 70 18 70 0v-68M715 196c0 18 70 18 70 0M715 229c0 18 70 18 70 0" fill="#edf5fa" stroke="#111827"/><text x="750" y="267" textAnchor="middle" fontWeight="700">Database</text><text x="750" y="285" textAnchor="middle" fontSize="12">(or other systems)</text></g>
    <text x="410" y="363" textAnchor="middle" fontFamily="monospace" fontSize="13">Each partition is an ordered, immutable log.</text>
  </svg>
}
