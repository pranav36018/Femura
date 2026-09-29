import { companyInfo } from '../data/company';
import { divisionsData } from '../data/divisions';
import { testimonialsData, partnerHospitals } from '../data/testimonials';
import { faqsData } from '../data/faq';

export const companyService = {
  async getCompanyInfo() {
    return companyInfo;
  },

  async getDivisions() {
    return divisionsData;
  },

  async getTestimonials() {
    return testimonialsData;
  },

  async getPartnerHospitals() {
    return partnerHospitals;
  },

  async getFaqs() {
    return faqsData;
  }
};
