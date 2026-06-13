export type ServiceCategory = 'brows' | 'lashes';

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  touchUpPrice: number;
  deposit: number;
}

export interface BookingFormData {
  category: ServiceCategory | null;
  service: Service | null;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}
