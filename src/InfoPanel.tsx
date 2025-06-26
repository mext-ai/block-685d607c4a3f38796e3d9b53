import React from 'react';

interface InfoPanelProps {
  currentStage: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ currentStage }) => {
  const stageInfo = [
    {
      title: "Initial State",
      content: "The chloroplast is ready to begin photosynthesis. Chlorophyll molecules are arranged in the thylakoid membranes, waiting to capture light energy.",
      keyPoints: [
        "Chloroplasts contain chlorophyll",
        "Thylakoids are stacked in grana",
        "Ready to capture sunlight"
      ]
    },
    {
      title: "Light Absorption",
      content: "Sunlight strikes the chlorophyll molecules. The energy from photons excites electrons in the chlorophyll, beginning the light-dependent reactions.",
      keyPoints: [
        "Photons hit chlorophyll molecules",
        "Electrons become excited",
        "Light energy is captured"
      ]
    },
    {
      title: "Water Splitting",
      content: "Water molecules are split (photolysis) to replace the excited electrons. This produces hydrogen ions (H+), electrons, and oxygen as a byproduct.",
      keyPoints: [
        "H₂O → 2H⁺ + ½O₂ + 2e⁻",
        "Electrons replace excited ones",
        "Oxygen is released as waste"
      ]
    },
    {
      title: "CO₂ Fixation",
      content: "Carbon dioxide from the atmosphere enters the Calvin cycle. The energy from the light reactions is used to fix CO₂ into organic molecules.",
      keyPoints: [
        "CO₂ enters through stomata",
        "Calvin cycle begins",
        "Carbon fixation occurs"
      ]
    },
    {
      title: "Glucose Formation",
      content: "The final products are formed: glucose (C₆H₁₂O₆) and oxygen (O₂). Glucose stores the captured solar energy in chemical bonds.",
      keyPoints: [
        "Glucose is the main product",
        "Oxygen is released",
        "Solar energy is stored chemically"
      ]
    }
  ];

  const currentInfo = stageInfo[currentStage] || stageInfo[0];

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '350px',
      zIndex: 1000
    }}>
      <h2 style={{ margin: '0 0 15px 0', color: '#4CAF50' }}>
        {currentInfo.title}
      </h2>
      
      <p style={{ 
        margin: '0 0 15px 0', 
        fontSize: '14px', 
        lineHeight: '1.4',
        color: '#ddd' 
      }}>
        {currentInfo.content}
      </p>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#4CAF50' }}>
          Key Points:
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
          {currentInfo.keyPoints.map((point, index) => (
            <li key={index} style={{ marginBottom: '4px', color: '#ccc' }}>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        fontSize: '11px',
        color: '#888',
        borderTop: '1px solid #444',
        paddingTop: '10px'
      }}>
        <strong>Did you know?</strong><br />
        Photosynthesis produces virtually all the oxygen in Earth's atmosphere 
        and is the foundation of most food chains on our planet.
      </div>
    </div>
  );
};

export default InfoPanel;