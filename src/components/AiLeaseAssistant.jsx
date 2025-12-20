import "../styles/aiLeaseAssistant.css";
import { Button, Form, Badge } from "react-bootstrap";
import { FiX, FiSend } from "react-icons/fi";

const AiLeaseAssistant = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="ai-assistant-panel">
      {/* Header */}
      <div className="ai-header">
        <h4>AI Lease Assistant</h4>
        <FiX className="close-icon" onClick={onClose} />
      </div>

      {/* Credits */}
      <div className="ai-credits">
        <Badge bg="success">45 AI credits remaining</Badge>
      </div>

      {/* Chat */}
      <div className="ai-chat">
        <div className="ai-message ai-bot">
          Hello! I'm your AI lease assistant. I can help you answer questions
          about leases, CAM rules, and important dates.
          <br />
          <strong>What would you like to know?</strong>
        </div>
      </div>

      {/* Input */}
      <div className="ai-input">
        <Form.Control
          type="text"
          placeholder="Ask a question about this lease..."
        />
        <Button>
          <FiSend />
        </Button>
      </div>
    </div>
  );
};

export default AiLeaseAssistant;
