import React from 'react';

interface ControlPanelProps {
  currentStage: number;
  onStageChange: (stage: number) => void;
  showLightRays: boolean;
  onToggleLightRays: () => void;
  showMolecules: boolean;
  onToggleMolecules: () => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentStage,
  onStageChange,
  showLightRays,
  onToggleLightRays,
  showMolecules,
  onToggleMolecules,
  autoPlay,
  onToggleAutoPlay
}) => {
  const stages = [
    { id: 0, name: 'Initial State', description: 'Chloroplast at rest' },
    { id: 1, name: 'Light Absorption', description: 'Sunlight hits chloroplasts' },
    { id: 2, name: 'Water Splitting', description: 'H2O splits into H+ and OH-' },
    { id: 3, name: 'CO2 Fixation', description: 'CO2 enters the reaction' },
    { id: 4, name: 'Glucose Formation', description: 'C6H12O6 and O2 produced' }
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '300px',
      zIndex: 1000
    }}>
      <h2 style={{ margin: '0 0 15px 0', color: '#4CAF50' }}>
        Photosynthesis Explorer
      </h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          Current Stage: {stages[currentStage]?.name}
        </h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#ccc' }}>
          {stages[currentStage]?.description}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Controls:</h4>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => onStageChange(stage.id)}
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: currentStage === stage.id ? '#4CAF50' : '#333',
                color: 'white',
                transition: 'background-color 0.3s'
              }}
            >
              {stage.id + 1}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
            <input
              type="checkbox"
              checked={showLightRays}
              onChange={onToggleLightRays}
              style={{ marginRight: '8px' }}
            />
            Show Light Rays
          </label>

          <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
            <input
              type="checkbox"
              checked={showMolecules}
              onChange={onToggleMolecules}
              style={{ marginRight: '8px' }}
            />
            Show Molecules
          </label>

          <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={onToggleAutoPlay}
              style={{ marginRight: '8px' }}
            />
            Auto Play
          </label>
        </div>
      </div>

      <div style={{ 
        fontSize: '11px', 
        color: '#888', 
        borderTop: '1px solid #444', 
        paddingTop: '10px' 
      }}>
        <strong>Equation:</strong><br />
        6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
      </div>
    </div>
  );
};

export default ControlPanel;