import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
  const signatureRef = useRef(null);
  const [penColor, setPenColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const saveSignature = () => {
    const dataURL = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
  };

  const handleColorChange = (color) => {
    setPenColor(color);
  };

  const handleLineWidthChange = (event) => {
    setLineWidth(parseInt(event.target.value, 10));
  };

  const handleDrawingStart = () => {
    setIsDrawing(true);
  };

  const handleDrawingEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Signature Pad</h1>

      {/* Color Palette */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {['black', 'blue', 'red', 'green'].map((color) => (
          <button
            key={color}
            className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${
              penColor === color ? 'border-2 border-gray-300' : ''
            }`}
            onClick={() => handleColorChange(color)}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>

      {/* Line Width Control */}
      <div className="mb-4 w-full max-w-md">
        <label htmlFor="lineWidth" className="block text-gray-700 font-bold mb-2">
          Line Width:
        </label>
        <input
          type="range"
          id="lineWidth"
          min="1"
          max="10"
          value={lineWidth}
          onChange={handleLineWidthChange}
          className="w-full appearance-none bg-gray-200 h-2 rounded-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Signature Canvas */}
      <div className="max-w-md w-full mb-4">
        <SignatureCanvas
          ref={signatureRef}
          penColor={penColor}
          lineWidth={lineWidth}
          canvasProps={{
            className: "border-2 border-gray-300 rounded-md",
            width: window.innerWidth > 768 ? 600 : window.innerWidth - 40, 
            height: window.innerWidth > 768 ? 400 : 250, 
          }}
          onBeginStroke={handleDrawingStart}
          onEndStroke={handleDrawingEnd}
        />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${
            isDrawing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={clearSignature}
          disabled={isDrawing}
        >
          Clear
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={saveSignature}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;