interface ComplaintConfirmationProps {
  complainantName: string
  complaintType: string
  referenceNumber: string
  description: string
}

export function ComplaintConfirmationEmail({
  complainantName,
  complaintType,
  referenceNumber,
  description,
}: ComplaintConfirmationProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#dd2a1b", color: "white", padding: "20px", textAlign: "center" }}>
        <h1>Ghana Labour Department</h1>
        <p>Complaint Confirmation</p>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
        <h2>Dear {complainantName},</h2>

        <p>
          Thank you for submitting your complaint to the Ghana Labour Department. We have received your submission and
          want to assure you that we take all complaints seriously.
        </p>

        <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "5px", margin: "20px 0" }}>
          <h3>Complaint Details:</h3>
          <p>
            <strong>Reference Number:</strong> {referenceNumber}
          </p>
          <p>
            <strong>Type:</strong> {complaintType}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Date Submitted:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        <h3>What Happens Next?</h3>
        <ol>
          <li>
            <strong>Initial Review (1-2 business days):</strong> Our team will review your complaint and determine the
            appropriate course of action.
          </li>
          <li>
            <strong>Investigation (5-15 business days):</strong> We will conduct a thorough investigation of the matter.
          </li>
          <li>
            <strong>Resolution:</strong> We will work to resolve the issue and provide you with updates throughout the
            process.
          </li>
        </ol>

        <div style={{ backgroundColor: "#e3f2fd", padding: "15px", borderRadius: "5px", margin: "20px 0" }}>
          <h4>Important Information:</h4>
          <ul>
            <li>Keep your reference number for future correspondence</li>
            <li>You will receive updates via email as your case progresses</li>
            <li>For urgent matters, call our hotline: 0800 600 400</li>
            <li>All information is kept confidential</li>
          </ul>
        </div>

        <p>
          If you have any questions or need to provide additional information, please contact us at
          complaints@labour.gov.gh and include your reference number.
        </p>

        <p>Thank you for helping us maintain fair and safe working conditions in Ghana.</p>

        <p>
          Best regards,
          <br />
          Ghana Labour Department
          <br />
          Ministry of Employment and Labour Relations
        </p>
      </div>

      <div
        style={{ backgroundColor: "#2b3990", color: "white", padding: "15px", textAlign: "center", fontSize: "12px" }}
      >
        <p>Ghana Labour Department | Phone: 0800 600 300 | Email: info@labour.gov.gh</p>
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  )
}
