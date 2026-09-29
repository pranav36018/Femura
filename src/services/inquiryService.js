import { apiClient } from '../api/client';

export const inquiryService = {
  /**
   * Submit Doctor Clinical Sample Request
   */
  async submitSampleRequest(formData) {
    // In future: return apiClient.post('/samples/request', formData);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Store in localStorage for persistent mock demo
    const requests = JSON.parse(localStorage.getItem('femura_sample_requests') || '[]');
    const newRequest = {
      ...formData,
      id: `SMP-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Dispatch Scheduled',
      submittedAt: new Date().toISOString()
    };
    requests.push(newRequest);
    localStorage.setItem('femura_sample_requests', JSON.stringify(requests));

    return {
      success: true,
      referenceId: newRequest.id,
      message: "Clinical sample request registered successfully. Our medical liaison will coordinate dispatch within 48 hours.",
      details: newRequest
    };
  },

  /**
   * Submit PCD Pharma Franchise / Dealership Inquiry
   */
  async submitFranchiseInquiry(formData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const inquiries = JSON.parse(localStorage.getItem('femura_franchise_inquiries') || '[]');
    const newInquiry = {
      ...formData,
      id: `PCD-${Date.now().toString(36).toUpperCase()}`,
      status: 'Territory Review in Progress',
      submittedAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    localStorage.setItem('femura_franchise_inquiries', JSON.stringify(inquiries));

    return {
      success: true,
      referenceId: newInquiry.id,
      message: "Franchise inquiry logged. Our Regional Business Manager will contact you with territory exclusivity details.",
      details: newInquiry
    };
  },

  /**
   * General contact / quick callback
   */
  async submitGeneralContact(formData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      referenceId: `CNT-${Date.now().toString(36).toUpperCase()}`,
      message: "Thank you for reaching out to Femura Pharma. Our customer care desk has received your message.",
    };
  },

  /**
   * Submit Sample Basket / B2B RFQ
   */
  async submitQuotationRequest(items, practitionerDetails) {
    await new Promise(resolve => setTimeout(resolve, 450));
    const rfqId = `RFQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      success: true,
      referenceId: rfqId,
      message: "Your institutional quotation request has been generated.",
      itemCount: items.length,
      estimatedDispatch: "2-3 business days"
    };
  }
};
