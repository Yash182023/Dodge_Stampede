// src/components/VenueMap.js
'use client';

import { useEffect, useState, useRef } from 'react';

export default function VenueMap({ mapUrl, incidents }) {
  const [svgContent, setSvgContent] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    if (mapUrl) {
      fetch(mapUrl)
        .then(res => res.text())
        .then(text => setSvgContent(text));
    }
  }, [mapUrl]);

  useEffect(() => {
    if (!svgContent || !svgRef.current) return;

    // Clear previous incident dots
    svgRef.current.querySelectorAll('.incident-dot').forEach(dot => dot.remove());

    // Add new incident dots
    incidents.forEach(incident => {
      if (incident.map_zone_id && incident.status !== 'Resolved') {
        const zoneElement = svgRef.current.querySelector(`#${incident.map_zone_id}`);
        if (zoneElement) {
          const bbox = zoneElement.getBBox();
          const cx = bbox.x + bbox.width / 2;
          const cy = bbox.y + bbox.height / 2;
          
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', cx);
          dot.setAttribute('cy', cy);
          dot.setAttribute('r', 8);
          dot.setAttribute('class', 'incident-dot');
          svgRef.current.appendChild(dot);
        }
      }
    });

  }, [incidents, svgContent]);


  if (!mapUrl) {
    return <div className="p-6 bg-gray-100 rounded-lg text-center">No map available for this venue.</div>;
  }

  return (
    <div ref={svgRef} dangerouslySetInnerHTML={{ __html: svgContent }} className="w-full h-auto bg-white rounded-lg shadow-lg border" />
  );
}