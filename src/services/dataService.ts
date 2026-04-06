// Data service for backend API integration
import { apiClient } from './apiClient';

export class DataService {
  // Assures
  static async getAssures() {
    const response = await apiClient.getAssures();
    return response.assures;
  }

  static async createAssure(assureData: any) {
    return await apiClient.createAssure(assureData);
  }

  static async updateAssure(id: string, assureData: any) {
    return await apiClient.updateAssure(id, assureData);
  }

  static async deleteAssure(id: string) {
    return await apiClient.deleteAssure(id);
  }

  // Polices
  static async getPolices() {
    const response = await apiClient.getPolices();
    return response.polices;
  }

  static async createPolice(policeData: any) {
    return await apiClient.createPolice(policeData);
  }

  // Sinistres
  static async getSinistres() {
    const response = await apiClient.getSinistres();
    return response.sinistres;
  }

  static async createSinistre(sinistreData: any) {
    return await apiClient.createSinistre(sinistreData);
  }

  // Prestataires
  static async getPrestataires() {
    const response = await apiClient.getPrestataires();
    return response.prestataires;
  }

  static async createPrestataire(prestataireData: any) {
    return await apiClient.createPrestataire(prestataireData);
  }

  // Consultations
  static async getConsultations() {
    const response = await apiClient.getConsultations();
    return response.consultations;
  }

  static async createConsultation(consultationData: any) {
    return await apiClient.createConsultation(consultationData);
  }

  // Prescriptions
  static async getPrescriptions() {
    const response = await apiClient.getPrescriptions();
    return response.prescriptions;
  }

  static async createPrescription(prescriptionData: any) {
    return await apiClient.createPrescription(prescriptionData);
  }

  // User management (for admin)
  static async getUsers() {
    const response = await apiClient.getUsers();
    return response.users;
  }

  static async updateUser(id: string, userData: any) {
    return await apiClient.updateUser(id, userData);
  }

  static async deleteUser(id: string) {
    return await apiClient.deleteUser(id);
  }
}